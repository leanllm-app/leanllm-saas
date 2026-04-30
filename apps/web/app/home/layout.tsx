import type { ReactNode } from 'react';

/**
 * Envolve toda a área da plataforma (/home). Degradê de fundo aplicado aqui
 * (ver `.platform-app-background`), não na landing nem no body global.
 */
export default function HomeSegmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="platform-app-background min-h-svh w-full">{children}</div>
  );
}
