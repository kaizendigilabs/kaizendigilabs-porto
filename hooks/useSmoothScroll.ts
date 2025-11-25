"use client";

import { useCallback } from "react";

export function useSmoothScroll(offset = 80) {
  return useCallback(
    (targetId: string) => {
      if (typeof window === "undefined") return;
      const target = document.getElementById(targetId);
      if (!target) return;

      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [offset]
  );
}
