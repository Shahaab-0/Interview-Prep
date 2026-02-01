import React, { useRef, useEffect } from "react";

export default function MouseTracker() {
  const containerRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const dot = dotRef.current;
    if (!container || !dot) return;

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();

      // Calculate relative position inside container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Store in ref (no re-render)
    //   positionRef.current = { x, y };

      // Move the dot directly (DOM update)
      dot.style.transform = `translate(${x}px, ${y}px)`;
    }

    function handleEnter() {
      container.addEventListener("mousemove", handleMouseMove);
    }

    function handleLeave() {
      container.removeEventListener("mousemove", handleMouseMove);
    }

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: 400,
        height: 300,
        border: "2px solid black",
        position: "relative",
        margin: 40
      }}
    >
      <div
        ref={dotRef}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "red",
          position: "absolute",
          transform: "translate(0px, 0px)",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}