import { useEffect, useState } from "react";
import "./index.css";

function LensMouse() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div
      className="cursor"
      style={{
        top: mousePosition.y - 50, // center lens
        left: mousePosition.x - 50,
        backgroundPosition: `-${mousePosition.x * 2}px -${mousePosition.y * 2}px`, // zoom effect
      }}
    />
  );
}

export default LensMouse;
