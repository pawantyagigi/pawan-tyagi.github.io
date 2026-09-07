"use client";

import { useEffect, useState } from "react";
import Burger from "./Burger";

import type { FC } from "react";
import Link from "next/link";

export interface NavigationProps {
  className?: string;
  isFooter?: boolean;
}

const Navigation: FC<NavigationProps> = ({ className, isFooter }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const SCREEN_SM = 768;

    const updateScrollLock = () => {
      if (window.innerWidth > SCREEN_SM) {
        document.body.classList.remove("scroll-lock");
      } else if (active) {
        document.body.classList.add("scroll-lock");
      } else {
        document.body.classList.remove("scroll-lock");
      }
    };

    updateScrollLock();
    window.addEventListener("resize", updateScrollLock);

    return () => {
      document.body.classList.remove("scroll-lock");
      window.removeEventListener("resize", updateScrollLock);
    };
  }, [active]);

  return (
    <div className={isFooter ? undefined : "header-nav-wrap"}>
      {!isFooter && (
        <Burger active={active} onClick={() => setActive(!active)} />
      )}
      <nav className={className + " " + (active ? "active" : "")}>
        <div className="site-search site-search-mobile">
          {/* Mobile: link to full search page to keep burger menu simple */}
          <Link href="/search" className="site-search-mobile-link" onClick={() => setActive(false)}>
            Search blogs…
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link href="/blogs" aria-label="Blogs" onClick={() => setActive(false)}>
              Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              aria-label="Categories"
              onClick={() => setActive(false)}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              aria-label="Search"
              onClick={() => setActive(false)}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              aria-label="Portfolio"
              onClick={() => setActive(false)}
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/about" aria-label="About" onClick={() => setActive(false)}>
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              aria-label="Contact"
              onClick={() => setActive(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/privacy"
              aria-label="Privacy Policy"
              onClick={() => setActive(false)}
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
