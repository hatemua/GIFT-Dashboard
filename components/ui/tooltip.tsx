"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = "top",
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (placement) {
        case "top":
          top = rect.top - 8;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + 8;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - 8;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + 8;
          break;
      }

      setCoords({ top, left });
      setVisible(true);
    }
  };

  const hideTooltip = () => setVisible(false);

  // Adjust for scrolling
  useEffect(() => {
    const handleScroll = () => visible && showTooltip();
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [visible]);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            style={{
              top: coords.top,
              left: coords.left,
              transform:
                placement === "top"
                  ? "translate(-50%, -100%)"
                  : placement === "bottom"
                  ? "translate(-50%, 0)"
                  : placement === "left"
                  ? "translate(-100%, -50%)"
                  : "translate(0, -50%)",
            }}
            className="fixed z-50 max-w-xs px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md shadow-lg pointer-events-none transition-opacity duration-200"
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};
