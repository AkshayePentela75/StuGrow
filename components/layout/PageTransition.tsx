import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps each page's content so route changes crossfade/lift via the browser
 * View Transitions API. Lives in each page (not the layout) because layouts
 * persist across navigations and never enter/exit. Unsupported browsers just
 * swap instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="main">{children}</main>
    </ViewTransition>
  );
}
