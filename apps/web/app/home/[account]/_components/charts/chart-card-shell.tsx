'use client';

import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

export const chartCardClassName =
  'border-slate-200/90 bg-linear-to-r from-white via-white to-[#faf9ff]';
export const chartCardHeaderClassName = 'space-y-0.5 p-4 sm:space-y-1.5 sm:p-6';
export const chartCardContentClassName = 'p-4 pt-0 sm:p-6 sm:pt-0';
export const chartAreaClassName = 'h-[200px] w-full sm:h-[260px] md:h-[300px]';

export function EmptyChartCard(props: { title: string; description?: ReactNode }) {
  return (
    <Card className={chartCardClassName}>
      <CardHeader className={chartCardHeaderClassName}>
        <CardTitle>{props.title}</CardTitle>
        {props.description}
      </CardHeader>

      <CardContent className={chartCardContentClassName}>
        <div
          className={
            'text-muted-foreground flex h-[200px] items-center justify-center text-sm sm:h-[260px] md:h-[300px]'
          }
        >
          No data available yet. Start sending events with the LeanLLM SDK.
        </div>
      </CardContent>
    </Card>
  );
}
