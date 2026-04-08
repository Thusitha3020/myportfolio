"use client";

import { useWebGL } from "@/hooks/useWebGL";

interface WebGLGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Guards React Three Fiber scenes behind a WebGL availability check.
 * Renders fallback (gradient) if WebGL is not supported.
 */
export function WebGLGuard({ children, fallback }: WebGLGuardProps) {
  const supported = useWebGL();

  if (!supported) {
    return (
      <>
        {fallback ?? (
          <div
            className="absolute inset-0 mesh-bg"
            aria-hidden="true"
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}
