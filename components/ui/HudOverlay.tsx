"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function HudOverlay() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    // Initial set
    setTime(new Date().toLocaleTimeString());

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Scanlines Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-[101] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
      
      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

      {/* Floating Data Readouts */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1 items-start group">
            <div className="w-1 h-8 bg-primary/20 group-hover:bg-primary/50 transition-colors" />
            <span className="text-[10px] font-mono text-primary/40 tracking-tighter">
              CH_{i+1} : {Math.random().toFixed(4)}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-4 items-end text-right">
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-mono text-primary/60 animate-pulse">SYSTEM: ACTIVE</span>
          <span className="text-[10px] font-mono text-accent/60">SIGNAL: STABLE</span>
          <span className="text-[10px] font-mono text-muted-foreground/40 mt-2">TIMESTAMP: {time}</span>
        </div>
      </div>

      {/* Mouse Reticle (Targeting) */}
      <div 
        className="absolute w-8 h-8 border border-primary/60 rounded-full flex items-center justify-center transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)`,
        }}
      >
        <div className="w-1 h-1 bg-primary rounded-full" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-primary/60" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-primary/60" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-primary/60" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-primary/60" />
      </div>

      {/* Coordinate Readout */}
      <div 
        className="absolute text-[9px] font-mono text-primary/40 pointer-events-none transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${mousePos.x + 20}px, ${mousePos.y + 20}px)`,
        }}
      >
        X_{mousePos.x} Y_{mousePos.y}
      </div>
    </div>
  );
}
