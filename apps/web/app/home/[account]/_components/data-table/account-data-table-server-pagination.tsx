'use client';

import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@kit/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

export function AccountDataTableServerPagination(props: {
  pageIndex: number;
  pageCount: number;
  total: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  pageParam?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = props.pageParam ?? 'page';

  const navigateToPage = useCallback(
    (nextPageIndex: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(pageParam, String(nextPageIndex + 1));
      router.push(`${pathname}?${params.toString()}`);
    },
    [pageParam, pathname, router, searchParams],
  );

  if (props.pageCount <= 0) {
    return null;
  }

  const hasPreviousPage = props.pageIndex > 0;
  const hasNextPage = props.pageIndex + 1 < props.pageCount;
  const from = props.total === 0 ? 0 : props.pageIndex * props.pageSize + 1;
  const to = Math.min((props.pageIndex + 1) * props.pageSize, props.total);
  const pageSizeOptions =
    props.pageSizeOptions && props.pageSizeOptions.length > 0
      ? props.pageSizeOptions
      : [props.pageSize];

  return (
    <div className="text-muted-foreground mt-1 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="tabular-nums">
        Showing <span className="text-foreground font-semibold">{from}</span>-
        <span className="text-foreground font-semibold">{to}</span> of{' '}
        <span className="text-foreground font-semibold">{props.total}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-xs font-medium tracking-wide">
            Rows
          </span>
          <Select
            value={String(props.pageSize)}
            onValueChange={(v) => props.onPageSizeChange?.(Number(v))}
            disabled={!props.onPageSizeChange}
          >
            <SelectTrigger className="bg-background h-8 w-18 rounded-md shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => navigateToPage(props.pageIndex - 1)}
            disabled={!hasPreviousPage}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-foreground min-w-22 text-center text-xs font-medium tabular-nums">
            Page {props.pageIndex + 1} / {props.pageCount}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => navigateToPage(props.pageIndex + 1)}
            disabled={!hasNextPage}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
