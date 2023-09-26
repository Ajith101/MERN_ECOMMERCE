import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [currentSize, setCurrentSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleScreenSize = () => {
    setCurrentSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);
  return currentSize;
};
