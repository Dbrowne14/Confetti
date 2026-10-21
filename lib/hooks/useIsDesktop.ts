"use client";

import { useSyncExternalStore } from "react";

// Tailwind's `lg` breakpoint (--breakpoint-lg). Below it the app uses its
// mobile presentation: floating nav and bottom sheets.
const desktopQuery = "(min-width: 64rem)";

// The server snapshot is `false`, so the first (hydration) render assumes the
// narrow layout and corrects on mount.
export const useIsDesktop = () =>
  useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(desktopQuery);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
