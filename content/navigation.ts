export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
] satisfies NavigationItem[];
