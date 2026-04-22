'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@kit/ui/utils';

type CodeTerminalProps = {
  code: string;
  fileName?: string;
  language?: string;
  className?: string;
  lightTheme?: string;
  darkTheme?: string;
};

export function CodeTerminal({
  code,
  fileName = 'code.py',
  language = 'python',
  className,
  lightTheme = 'one-light',
  darkTheme = 'dracula',
}: CodeTerminalProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    let mounted = true;

    async function highlight() {
      const result = await codeToHtml(code, {
        lang: language,
        themes: {
          light: lightTheme,
          dark: darkTheme,
        },
      });

      if (mounted) {
        setHtml(result);
      }
    }

    highlight();

    return () => {
      mounted = false;
    };
  }, [code, language, lightTheme, darkTheme]);

  return (
    <div
      className={cn(
        'overflow-hidden text-left rounded-xl border border-gray-200 bg-white shadow-xs sm:rounded-2xl dark:border-white/10 dark:bg-[#0b1020]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 dark:border-white/10 dark:bg-white/5">
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400 sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 sm:h-3 sm:w-3" />
        </div>

        <span className="ml-auto text-[11px] font-medium text-gray-500 sm:text-xs dark:text-white/60">
          {fileName}
        </span>
      </div>

      <div className="overflow-x-auto px-3 py-4 sm:p-6 md:p-8">
        {html ? (
          <div
            className={cn(
              'min-w-0 text-xs sm:text-sm md:text-[15px]',
              '[&_pre]:m-0 [&_pre]:!bg-transparent [&_pre]:p-0',
              '[&_pre]:whitespace-pre-wrap [&_pre]:break-words',
              '[&_code]:font-mono [&_code]:leading-relaxed',
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="min-w-0 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-gray-900 sm:text-sm md:text-[15px] dark:text-white/90">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}