"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "sticky top-0 z-50 border-b bg-paper/85 backdrop-blur-md backdrop-saturate-150 transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-line shadow-raised" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-ink px-4 py-2 text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link
          href="/"
          className="group -ml-1 flex items-center gap-2.5 rounded-md px-1 py-1 transition-transform duration-150 ease-out active:scale-[0.97]"
          aria-label={`${site.name} home`}
        >
          <Image
            src="/brand/stugro-mark.png"
            alt=""
            width={600}
            height={358}
            priority
            className="h-8 w-auto transition-transform duration-500 ease-out group-hover:-translate-y-0.5 md:h-9"
          />
          <span className="font-body text-[1.35rem] font-extrabold tracking-[-0.02em] text-grow">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-paper-sunk/70 p-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={spring.snappy}
                      className="absolute inset-0 rounded-full bg-ink shadow-raised"
                      aria-hidden
                    />
                  )}
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-small font-semibold transition-[color,transform] duration-200 ease-out active:scale-[0.96]",
                      active ? "text-paper" : "text-ink/75 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Link href="/teaching#schedule" className="btn btn-primary !min-h-10 !px-5">
            Join a class
          </Link>
        </div>

        <MobileNav pathname={pathname} />
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-grow"
      />
    </header>
  );
}
