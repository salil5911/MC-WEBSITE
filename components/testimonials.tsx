"use client";

import { useEffect } from "react";

export function Testimonials({ className = "" }) {
  useEffect(() => {
    // Load Elfsight script dynamically
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={className}>
      {/* Elfsight Google Reviews Widget */}
      <div
        className="elfsight-app-d3c7508c-be91-4856-8b11-894c2c0e7d75"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
}
