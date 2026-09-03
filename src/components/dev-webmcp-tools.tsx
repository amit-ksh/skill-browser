"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    WebMcpDevTools?: {
      createWebMcpDevTools: (options: {
        enabled: boolean;
        allowedHosts: string[];
      }) => Promise<void>;
    };
  }
}

const DEVTOOLS_SCRIPT_URL =
  "https://cdn.jsdelivr.net/gh/amit-ksh/dev-webmcp@v0.2.0/dist/webmcp-devtools.min.js";

export function DevWebMcpTools() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = DEVTOOLS_SCRIPT_URL;
    script.onload = () => {
      void window.WebMcpDevTools?.createWebMcpDevTools({
        enabled: true,
        allowedHosts: [window.location.hostname],
      });
    };
    document.head.append(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
