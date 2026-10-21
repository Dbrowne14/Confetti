"use client";

import {
  Fragment,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

// Drives both the CSS transitions and when children unmount after closing.
const TRANSITION_MS = 250;
const transitionStyle = { transitionDuration: `${TRANSITION_MS}ms` };

const sizeStyles = {
  // Hugs its content. The 70dvh cap is a judgement call that keeps the top of
  // the page in view; taller content scrolls inside the sheet.
  content: "max-h-[70dvh]",
  // Near full height, leaving a sliver of the page visible above the sheet.
  full: "h-[calc(100dvh-0.75rem)]",
};

// Overlays are root-level siblings, so equal z-indexes fall back to DOM order.
// "belowDialogs" (z-40) paints over the header and floating nav (also z-40 but
// earlier in the DOM) and under the z-50 dialogs, Add birthday and Profile,
// which can be opened from inside it.
const layerStyles = {
  belowDialogs: "z-40",
  dialog: "z-50",
};

const backgroundStyles = {
  bg: "bg-confetti-bg",
  surface: "bg-confetti-surface",
};

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  layer: keyof typeof layerStyles;
  children: ReactNode;
  size?: keyof typeof sizeStyles;
  background?: keyof typeof backgroundStyles;
  showHandle?: boolean;
};

export const BottomSheet = ({
  isOpen,
  onClose,
  labelledBy,
  layer,
  children,
  size = "content",
  background = "bg",
  showHandle = false,
}: BottomSheetProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Children stay rendered while the sheet slides out, then unmount. The key
  // changes on every open so the content always starts from fresh state, even
  // when the sheet reopens before the previous close finished.
  const [isRendered, setIsRendered] = useState(isOpen);
  const [contentKey, setContentKey] = useState(0);
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setIsRendered(true);
      setContentKey((key) => key + 1);
    }
  }

  useEffect(() => {
    if (isOpen || !isRendered) return;
    const timer = window.setTimeout(() => setIsRendered(false), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen, isRendered]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement;
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isOpen]);

  // Handled on the panel rather than the window: focus is kept inside the open
  // sheet, so when sheets stack only the top one responds.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    // aria-modal doesn't stop Tab reaching the page behind, so wrap it here.
    const focusable =
      panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    if (!focusable || focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || active === panelRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const layerClass = layerStyles[layer];

  // Same mounted-and-hidden approach as the Profile drawer: `invisible` +
  // `inert` keep the closed sheet out of the tab order and accessibility tree,
  // and visibility only transitions on close so the slide-out stays visible.
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        style={transitionStyle}
        className={`fixed inset-0 ${layerClass} bg-confetti-ink/30 transition-opacity ease-out motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        inert={!isOpen}
        onKeyDown={handleKeyDown}
        style={transitionStyle}
        className={`fixed inset-x-0 bottom-0 ${layerClass} flex ${sizeStyles[size]} flex-col overflow-hidden rounded-t-3xl ${backgroundStyles[background]} pb-[env(safe-area-inset-bottom)] outline-none ease-out motion-reduce:transition-none ${
          isOpen
            ? "visible translate-y-0 transition-[translate]"
            : "invisible translate-y-full transition-[translate,visibility]"
        }`}
      >
        {showHandle && (
          <div
            aria-hidden
            className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-confetti-border"
          />
        )}
        {isRendered && <Fragment key={contentKey}>{children}</Fragment>}
      </div>
    </>
  );
};
