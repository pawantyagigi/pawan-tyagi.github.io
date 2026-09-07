"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { searchItems, type SearchItem } from "@/lib/search";
import { withBasePath } from "@/lib/withBasePath";

let cachedIndex: SearchItem[] | null = null;

async function loadIndex(): Promise<SearchItem[]> {
  if (cachedIndex) return cachedIndex;
  const res = await fetch(withBasePath("/search-index.json"));
  if (!res.ok) throw new Error("Search index unavailable");
  const data = (await res.json()) as { items: SearchItem[] };
  cachedIndex = data.items || [];
  return cachedIndex;
}

const SiteSearch = () => {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadIndex()
      .then((list) => {
        if (!cancelled) {
          setItems(list);
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const results = query.trim().length >= 2 ? searchItems(items, query, 8) : [];

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const goSearchPage = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [router]
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      setOpen(false);
      router.push(results[activeIndex].url);
      return;
    }
    goSearchPage(query);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    }
  }

  return (
    <div className="site-search" ref={rootRef}>
      <form className="site-search-form" role="search" onSubmit={onSubmit}>
        <label className="visually-hidden" htmlFor="site-search-input">
          Search blogs and pages
        </label>
        <span className="site-search-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          ref={inputRef}
          id="site-search-input"
          type="search"
          className="site-search-input"
          placeholder="Search blogs…"
          value={query}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open && results.length > 0}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <kbd className="site-search-kbd" aria-hidden="true">
          ⌘K
        </kbd>
      </form>

      {open && query.trim().length >= 2 ? (
        <div
          className="site-search-dropdown"
          id={listId}
          role="listbox"
          aria-label="Search results"
        >
          {!ready ? (
            <p className="site-search-empty">Loading search…</p>
          ) : results.length === 0 ? (
            <p className="site-search-empty">No results for “{query.trim()}”</p>
          ) : (
            <ul className="site-search-list">
              {results.map((hit, index) => (
                <li key={hit.url} role="option" aria-selected={index === activeIndex}>
                  <Link
                    href={hit.url}
                    className={`site-search-hit${
                      index === activeIndex ? " is-active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className="site-search-hit-type">
                      {hit.type === "post" ? "Blog" : "Page"}
                    </span>
                    <span className="site-search-hit-title">{hit.title}</span>
                    {hit.excerpt ? (
                      <span className="site-search-hit-excerpt">{hit.excerpt}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="site-search-all"
            onClick={() => goSearchPage(query)}
          >
            View all results for “{query.trim()}”
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SiteSearch;
