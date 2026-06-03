"use client";

import { useEffect } from "react";

const VISITOR_KEY = "lumi_visitor_id";

function getVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function AnalyticsTracker() {
  useEffect(() => {
    const visitorId = getVisitorId();
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
    }).catch(() => {});
  }, []);

  return null;
}
