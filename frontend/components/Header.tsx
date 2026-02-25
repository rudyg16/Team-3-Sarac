"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  //searchQuery holds text entered in search input
  const [searchQuery, setSearchQuery] = useState("");

  //sidebar menu
  function toggleDrawer() {
    window.dispatchEvent(new CustomEvent("toggle-drawer"));
  }

  return (
    <header className="header">


      <div className="header-left">

        {/* hamburger menu buttom */}
        <button
          className="hamburger"
          id="hamburger-btn"
          onClick={toggleDrawer}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="header-divider" />

        {/* logo + homepage link */}
        <Link href="/" className="header-logo">
          <div className="header-logo-icon">
            <Image
              src="/logo.png"
              alt="Soccer Intelligence logo"
              width={22}
              height={22}
              style={{ objectFit: "contain" }}
            />
          </div>

          <span className="header-logo-text">
            Soccer <span><em>Intelligence</em></span>
          </span>
        </Link>

      </div>


      <div className="header-right">

        {/* search input box */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
        </div>

        {/* settings button - change to image later */}
        <button className="header-icon-btn" title="Settings" aria-label="Settings">
          ⚙️
        </button>
      </div>

    </header>
  );
}