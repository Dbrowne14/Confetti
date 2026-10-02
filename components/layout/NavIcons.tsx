import type { MainNav } from "@/types/System";

type IconProps = { isActive: boolean };

/* Inactive outlines sit a shade lighter than their label, as in the reference. */
const Svg = ({
  isActive,
  children,
}: IconProps & { children: React.ReactNode }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.3}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={isActive ? undefined : "opacity-75"}
    aria-hidden
  >
    {children}
  </svg>
);

const CalendarIcon = ({ isActive }: IconProps) => (
  <Svg isActive={isActive}>
    <rect
      x="0.95"
      y="0.95"
      width="14.1"
      height="14.1"
      rx="4.6"
      fill={isActive ? "currentColor" : "none"}
    />
  </Svg>
);

const UpcomingIcon = ({ isActive }: IconProps) => (
  <Svg isActive={isActive}>
    <path d="M0.8 2.9h14.4M0.8 13.1h14.4" />
  </Svg>
);

const CirclesIcon = ({ isActive }: IconProps) => (
  <Svg isActive={isActive}>
    <circle cx="8" cy="8" r="7.05" fill={isActive ? "currentColor" : "none"} />
  </Svg>
);

const RemindersIcon = ({ isActive }: IconProps) => (
  <Svg isActive={isActive}>
    <path
      d="M1.7 15.05V8a6.3 6.3 0 0 1 12.6 0v7.05z"
      fill={isActive ? "currentColor" : "none"}
    />
  </Svg>
);

const icons: Record<MainNav, (props: IconProps) => React.ReactElement> = {
  Calendar: CalendarIcon,
  Upcoming: UpcomingIcon,
  Circles: CirclesIcon,
  Reminders: RemindersIcon,
};

export const NavIcon = ({ name, isActive }: { name: MainNav } & IconProps) => {
  const Icon = icons[name];
  return <Icon isActive={isActive} />;
};

export const PlusIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M5 1v8M1 5h8" />
  </svg>
);
