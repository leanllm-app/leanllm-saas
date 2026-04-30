import Link from 'next/link';

export function DocsCard({
  title,
  subtitle,
  children,
  link,
}: React.PropsWithChildren<{
  title: string;
  subtitle?: string | null;
  link: { url: string; label?: string };
}>) {
  return (
    <Link href={link.url} className="group flex h-full flex-col">
      <div
        className={
          'hover:bg-muted/60 hover:border-primary/30 hover:shadow-sm flex h-full grow flex-col gap-y-1 rounded-xl border p-4 transition-all'
        }
      >
        <h3 className="group-hover:text-primary mt-0 text-lg font-medium transition-colors dark:text-white">
          {title}
        </h3>

        {subtitle && (
          <div className="text-muted-foreground text-sm">
            <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
          </div>
        )}

        {children && <div className="text-sm">{children}</div>}
      </div>
    </Link>
  );
}
