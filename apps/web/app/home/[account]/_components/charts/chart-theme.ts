export const monoPrimaryScale = [
  'color-mix(in oklab, var(--primary) 96%, black 4%)',
  'color-mix(in oklab, var(--primary) 84%, white 16%)',
  'color-mix(in oklab, var(--primary) 72%, white 28%)',
  'color-mix(in oklab, var(--primary) 58%, white 42%)',
  'color-mix(in oklab, var(--primary) 46%, white 54%)',
  'color-mix(in oklab, var(--primary) 34%, white 66%)',
] as const;

export function getMonochromaticColor(index: number) {
  if (index < monoPrimaryScale.length) {
    return monoPrimaryScale[index];
  }

  const cycle = index % monoPrimaryScale.length;
  const opacity = Math.max(
    0.35,
    0.9 - Math.floor(index / monoPrimaryScale.length) * 0.12,
  );

  return `color-mix(in oklab, ${monoPrimaryScale[cycle]} ${Math.round(opacity * 100)}%, white ${Math.round((1 - opacity) * 100)}%)`;
}
