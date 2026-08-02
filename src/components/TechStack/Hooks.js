import { useState, useEffect } from "react";

/**
 * Hook to observe container visibility in the viewport.
 * When hidden, sets isActive to false so physics and animations pause to preserve GPU/CPU.
 */
export function useIntersectionObserver(ref, options = { threshold: 0.1 }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options.threshold]);

  return isActive;
}
