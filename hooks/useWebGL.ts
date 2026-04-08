"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebGL support in the browser.
 * Returns true if WebGL is available, false otherwise.
 * Used to conditionally render React Three Fiber scenes.
 */
export function useWebGL(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
