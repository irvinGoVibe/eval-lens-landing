"use client";

import { useEffect } from "react";

/* The standalone /bento route has no Hero and no ScrollOrchestrator, so the
   global `body:not(.hero-ready){overflow:hidden}` lock is never lifted and
   the page can't scroll. The homepage manages this class via the
   orchestrator; here we lift it directly. */
export function ScrollUnlock() {
  useEffect(() => {
    document.body.classList.add("hero-ready");
    return () => document.body.classList.remove("hero-ready");
  }, []);
  return null;
}
