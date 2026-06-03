"use client";

import { useEffect } from "react";
import {
  getLocalDayString,
  VISIT_TRACKED_COOKIE,
} from "@/lib/analytics/visit-day";

function readTrackedDay(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${VISIT_TRACKED_COOKIE}=([^;]+)`)
  );
  return match?.[1] ?? null;
}

export function AnalyticsTracker() {
  useEffect(() => {
    const day = getLocalDayString();
    if (readTrackedDay() === day) return;

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day }),
    })
      .then((res) => {
        if (res.ok) {
          document.cookie = `${VISIT_TRACKED_COOKIE}=${day};path=/;max-age=86400;samesite=lax`;
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
