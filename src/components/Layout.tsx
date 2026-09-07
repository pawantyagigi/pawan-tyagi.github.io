import Head from "next/head";
import Navigation from "@/components/Navigation";
import { useEffect, useRef, useState, type FC } from "react";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@next/third-parties/google";
import SiteFooter from "@/components/SiteFooter";
import ThemeToggle from "@/components/ThemeToggle";
import SiteSearch from "@/components/SiteSearch";

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  metaDescription?: string;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  return (
    <div className="">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <meta name="theme-color" content="#fff" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Pawan Tyagi Blog RSS"
          href="/rss.xml"
        />
      </Head>

      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}

      <header className={`site-header ${isVisible ? "visible" : "hidden"}`}>
        <div className="container">
          <div className="header-title">
            <Link
              href="/"
              className="brand-link"
              aria-label="Pawan Tyagi - Home"
            >
              <span className="brand-text">
                <span className="header-title-name">pawan</span>
                <span className="brand-surname">tyagi</span>
              </span>
              <span className="brand-underline" aria-hidden="true" />
            </Link>
          </div>

          <div className="header-end">
            <SiteSearch />
            <Navigation className="header-nav" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="">{children}</main>

      <SiteFooter />

      <ScrollToTop />
    </div>
  );
};

export default Layout;
