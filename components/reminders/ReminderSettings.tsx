import { ReactNode, useId } from "react";
import { Switch } from "@/components/ui/Switch";

// Shape of one on/off row on this page. UI-only: this is not the future
// reminder model, just what the settings list needs to render.
export type ReminderSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export const ReminderSection = ({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: ReactNode;
}) => {
  const labelId = useId();
  return (
    <section aria-labelledby={labelId} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <h2
          id={labelId}
          className="text-[11px] font-semibold tracking-[0.16em] text-confetti-muted uppercase"
        >
          {label}
        </h2>
        {description && (
          <p className="text-[15px] text-confetti-muted">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
};

export const ReminderSettingList = ({
  settings,
  onToggle,
}: {
  settings: ReminderSetting[];
  onToggle: (id: string, enabled: boolean) => void;
}) => {
  return (
    <ul className="divide-y divide-confetti-border border-b border-confetti-border">
      {settings.map((setting) => (
        <ReminderSettingRow
          key={setting.id}
          setting={setting}
          onToggle={(enabled) => onToggle(setting.id, enabled)}
        />
      ))}
    </ul>
  );
};

const ReminderSettingRow = ({
  setting,
  onToggle,
}: {
  setting: ReminderSetting;
  onToggle: (enabled: boolean) => void;
}) => {
  const switchId = useId();
  const titleId = useId();
  const descriptionId = useId();
  return (
    <li>
      {/* The whole row is the switch's label, so it's one large touch target. */}
      <label
        htmlFor={switchId}
        className="flex cursor-pointer items-center gap-4 py-4"
      >
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            id={titleId}
            className="text-base leading-snug font-semibold text-confetti-ink"
          >
            {setting.title}
          </span>
          <span
            id={descriptionId}
            className="text-sm leading-snug text-confetti-muted"
          >
            {setting.description}
          </span>
        </span>
        <Switch
          id={switchId}
          checked={setting.enabled}
          onCheckedChange={onToggle}
          labelledBy={titleId}
          describedBy={descriptionId}
        />
      </label>
    </li>
  );
};
