export type MainNav = "Calendar" | "Upcoming" | "Circles" | "Reminders";
export type FullNav = MainNav | "Add Button";

export type NavItem = {
  name: MainNav;
  href: string;
};

export type FullNavItem = {
  mand: FullNav;
  href: string;
};
