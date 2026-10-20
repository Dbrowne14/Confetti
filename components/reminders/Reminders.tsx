"use client";

import { useState } from "react";
import {
  ReminderSection,
  ReminderSettingList,
  type ReminderSetting,
} from "./ReminderSettings";
import { ReminderPreview } from "./ReminderPreview";

// Presentational only: these settings live in local state and reset on
// refresh. Nothing is saved, scheduled or sent yet.
const defaultSchedule: ReminderSetting[] = [
  {
    id: "week-before",
    title: "1 week before",
    description: "Time to sort a gift",
    enabled: true,
  },
  {
    id: "day-before",
    title: "1 day before",
    description: "A nudge to plan the message",
    enabled: true,
  },
  {
    id: "on-the-day",
    title: "On the day",
    description: "So you never miss it",
    enabled: true,
  },
];

const defaultChannels: ReminderSetting[] = [
  {
    id: "push",
    title: "Push notification",
    description: "On this device",
    enabled: true,
  },
  {
    id: "email",
    title: "Email",
    description: "A morning summary",
    enabled: false,
  },
];

// How the preview phrases each schedule option.
const previewTiming: Record<string, string> = {
  "week-before": "is in 1 week",
  "day-before": "is tomorrow",
  "on-the-day": "is today",
};

const PREVIEW_NAME = "Shreya Kemper";

const toggleSetting =
  (id: string, enabled: boolean) => (settings: ReminderSetting[]) =>
    settings.map((setting) =>
      setting.id === id ? { ...setting, enabled } : setting,
    );

export const Reminders = () => {
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [channels, setChannels] = useState(defaultChannels);
  const [deliveryTime, setDeliveryTime] = useState("09:00");

  // Preview the earliest reminder that's switched on.
  const firstEnabled = schedule.find((setting) => setting.enabled);
  const previewMessage =
    firstEnabled &&
    `${PREVIEW_NAME}'s birthday ${previewTiming[firstEnabled.id]}. ${firstEnabled.description}.`;
  const isPushEnabled = channels.some(
    (channel) => channel.id === "push" && channel.enabled,
  );

  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-confetti-ink sm:text-[2.75rem]">
        Reminders
      </h1>
      <div className="grid grid-cols-1 gap-9 lg:grid-cols-[minmax(0,1fr)_25.75rem] lg:items-start lg:gap-12">
        <div className="flex w-full max-w-2xl flex-col gap-9 lg:max-w-none">
          <ReminderSection
            label="Default schedule"
            description="Applied to everyone you add. You can change it per person."
          >
            <ReminderSettingList
              settings={schedule}
              onToggle={(id, enabled) =>
                setSchedule(toggleSetting(id, enabled))
              }
            />
          </ReminderSection>

          <ReminderSection label="Delivery time">
            <input
              type="time"
              name="deliveryTime"
              aria-label="Delivery time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="h-14 w-full min-w-0 cursor-text rounded-2xl border border-confetti-border bg-confetti-surface px-4 text-base font-medium text-confetti-ink tabular-nums transition-colors hover:border-confetti-ink/20 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-confetti-ink"
            />
          </ReminderSection>

          <ReminderSection label="Channels">
            <ReminderSettingList
              settings={channels}
              onToggle={(id, enabled) =>
                setChannels(toggleSetting(id, enabled))
              }
            />
          </ReminderSection>
        </div>

        <div className="w-full max-w-2xl lg:sticky lg:top-24 lg:max-w-none">
          <ReminderPreview
            time={deliveryTime}
            message={previewMessage}
            isPushEnabled={isPushEnabled}
          />
        </div>
      </div>
    </div>
  );
};
