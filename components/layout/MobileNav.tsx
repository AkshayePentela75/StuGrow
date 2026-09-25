"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { nav, site, socials } from "@/content/site";
import { hasLink } from "@/lib/placeholder";
import { ease } from "@/lib/motion";
import { BrandIcon, platformName } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/cn";

const links = [{ href: "/", label: "Home" }, ...nav];
const noopSubscribe = () => () => {};

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on navigation (state derived during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      // Minimal focus trap.
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href],button");
        const a = f[0];
        const z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) {
          e.preventDefault();
          z?.focus();
        } else if (!e.shiftKey && document.activeElement === z) {
          e.preventDefault();
          a?.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const liveSocials = socials.filter((s) => hasLink(s.url));

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="relative -mr-2 grid size-11 place-items-center rounded-full transition-transform duration-150 ease-out active:scale-95 md:hidden"
      >
        <span className="sr-only">Open menu</span>
        <span aria-hidden className="flex w-6 flex-col gap-[6px]">
          <span className="h-[2px] w-full rounded-full bg-ink" />
          <span className="h-[2px] w-2/3 self-end rounded-full bg-ink" />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className="surface-ink-deep fixed inset-0 z-[70] flex flex-col md:hidden"
                initial={reduce ? { opacity: 0 } : { transform: "translateY(-100%)" }}
                animate={
                  reduce
                    ? { opacity: 1, transition: { duration: 0.2 } }
                    : { transform: "translateY(0%)", transition: { duration: 0.5, ease: ease.drawer } }
                }
                exit={
                  reduce
                    ? { opacity: 0, transition: { duration: 0.15 } }
                    : { transform: "translateY(-100%)", transition: { duration: 0.3, ease: ease.inOut } }
                }
              >
                <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
                <div className="container-x relative flex h-16 items-center justify-between">
                  <span className="font-body text-[1.35rem] font-extrabold tracking-[-0.02em] text-mint">{site.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      buttonRef.current?.focus();
                    }}
                    className="-mr-2 grid size-11 place-items-center rounded-full transition-transform duration-150 ease-out active:scale-95"
                  >
                    <span className="sr-only">Close menu</span>
                    <span aria-hidden className="relative block size-6">
                      <span className="absolute left-0 top-1/2 h-[2px] w-full rotate-45 rounded-full bg-paper" />
                      <span className="absolute left-0 top-1/2 h-[2px] w-full -rotate-45 rounded-full bg-paper" />
                    </span>
                  </button>
                </div>

                <nav aria-label="Mobile" className="container-x relative mt-6 flex-1">
                  <ul className="flex flex-col">
                    {links.map((item, i) => {
                      const active = pathname === item.href;
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.12 + i * 0.05, duration: 0.6, ease: ease.out } }}
                          exit={{ opacity: 0, transition: { duration: 0.12 } }}
                          className="border-b border-line-dark"
                        >
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "wdth-condensed flex items-baseline justify-between py-4 font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.03em] transition-[color,transform] duration-200 active:scale-[0.98] active:text-mint",
                              active ? "text-mint" : "text-paper",
                            )}
                          >
                            {item.label}
                            {active && <span className="text-caption font-body font-semibold tracking-normal text-mint">You&rsquo;re here</span>}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <motion.div
                  className="container-x relative flex flex-col gap-5 pb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.4 } }}
                >
                  <Link href="/teaching#schedule" className="btn btn-primary w-full">
                    Join a class
                  </Link>
                  {liveSocials.length > 0 && (
                    <ul className="flex gap-3">
                      {liveSocials.map((s) => (
                        <li key={s.platform}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grid size-11 place-items-center rounded-full bg-ink-soft transition-transform duration-150 active:scale-95"
                          >
                            <BrandIcon platform={s.platform} className="size-5" />
                            <span className="sr-only">{platformName[s.platform]}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
