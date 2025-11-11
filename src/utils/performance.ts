// Mobile performance optimization utilities

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

export const getParticleCount = (): number => {
  return isMobile() ? 20 : 50;
};

export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getAnimationConfig = () => {
  const mobile = isMobile();
  return {
    particleCount: mobile ? 20 : 50,
    enableBlur: !mobile,
    enableHeavyEffects: !mobile,
    animationDuration: mobile ? 0.3 : 0.5,
  };
};
