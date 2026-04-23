import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@kit/ui/utils';

function LogoImage({
  className,
  width = 300,
}: {
  className?: string;
  width?: number;
}) {
  const height = Math.round((width * 90) / 300);

  return (
    <Image
      src="/images/logo-lean.png"
      alt="LeanLLM"
      width={width}
      height={height}
      className={cn(`w-[110px] lg:w-[130px]`, className)}
      priority
    />
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string | null;
  className?: string;
  label?: string;
}) {
  if (href === null) {
    return <LogoImage className={className} />;
  }

  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'} prefetch={true}>
      <LogoImage className={className} />
    </Link>
  );
}
