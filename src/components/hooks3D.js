import { useEffect, useRef, useCallback } from 'react';

/**
 * 3D Tilt effect hook — makes an element rotate in 3D following the mouse
 */
export function useTilt3D({ maxTilt = 15, scale = 1.02, speed = 400, glare = false } = {}) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

    if (glare) {
      const glareEl = el.querySelector('.tilt-glare');
      if (glareEl) {
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
        const intensity = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / Math.max(centerX, centerY);
        glareEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${intensity * 0.15}), transparent 80%)`;
        glareEl.style.opacity = '1';
      }
    }
  }, [maxTilt, scale, glare]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare) {
      const glareEl = el.querySelector('.tilt-glare');
      if (glareEl) glareEl.style.opacity = '0';
    }
  }, [glare]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    el.style.willChange = 'transform';
    el.style.transformStyle = 'preserve-3d';

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, speed]);

  return ref;
}

/**
 * Mouse parallax hook for hero section
 */
export function useMouseParallax(intensity = 20) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll('[data-depth]');

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) || 1;
        const moveX = x * intensity * depth;
        const moveY = y * intensity * depth;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0)';
        layer.style.transition = 'transform 0.6s ease-out';
      });
    };

    const handleMouseEnter = () => {
      layers.forEach(layer => {
        layer.style.transition = 'transform 0.1s ease-out';
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [intensity]);

  return containerRef;
}
