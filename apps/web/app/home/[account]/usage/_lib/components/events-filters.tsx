'use client';

import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@kit/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@kit/ui/select';

export function EventsFilters(props: { models: string[]; features: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className={'flex flex-wrap items-center gap-3'}>
      <Select
        value={searchParams.get('model') ?? 'all'}
        onValueChange={(v) => updateFilter('model', v)}
      >
        <SelectTrigger className={'w-[180px]'} data-test={'filter-model'}>
          <SelectValue placeholder="All Models" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Models</SelectItem>
          {props.models.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('feature') ?? 'all'}
        onValueChange={(v) => updateFilter('feature', v)}
      >
        <SelectTrigger className={'w-[180px]'} data-test={'filter-feature'}>
          <SelectValue placeholder="All Features" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Features</SelectItem>
          {props.features.map((f) => (
            <SelectItem key={f} value={f}>
              {f}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="User ID"
        className={'w-[180px]'}
        defaultValue={searchParams.get('userId') ?? ''}
        onBlur={(e) => updateFilter('userId', e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateFilter('userId', e.currentTarget.value);
          }
        }}
        data-test={'filter-user-id'}
      />
    </div>
  );
}
