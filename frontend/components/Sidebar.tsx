"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trends", label: "Trends" },
  { href: "/channels", label: "Channels" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // state: open/close sidebar

  useEffect(() => {
    function handleToggle() {
      setIsOpen((prev) => !prev); // toggle sidebar open/close
    }

    window.addEventListener("toggle-drawer", handleToggle); //custom event
    return () => window.removeEventListener("toggle-drawer", handleToggle);
  }, );

  // "sidebar" and "drawer" used interchangeably

  // close drawer when navigating to new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  
  return (
    <>
      {/* dim background behind drawer */}
      <div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* drawer panel */}
      <nav className={`drawer ${isOpen ? "open" : ""}`} aria-label="Site navigation">

        <div className="drawer-body">

          {/* navigation links */}
          <ul className="drawer-nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? "active" : ""} // highlight if on page
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </nav>
    </>
  );
}