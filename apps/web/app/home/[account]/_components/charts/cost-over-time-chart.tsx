'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@kit/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@kit/ui/chart';

import {
  chartAreaClassName,
  chartCardClassName,
  chartCardContentClassName,
  chartCardHeaderClassName,
  EmptyChartCard,
} from './chart-card-shell';
import { monoPrimaryScale } from './chart-theme';

const MONO_PRIMARY_STRONG = monoPrimaryScale[0];

const costOverTimeConfig = {
  cost: {
    label: 'Cost (USD)',
    color: MONO_PRIMARY_STRONG,
  },
} satisfies ChartConfig;

export function CostOverTimeChart(props: {
  data: Array<{ date: string; cost: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChartCard title="Cost Over Time" />;
  }

  return (
    <Card className={chartCardClassName}>
      <CardHeader className={chartCardHeaderClassName}>
        <CardTitle>Cost Over Time</CardTitle>
        <CardDescription>Daily spend in USD</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContentClassName}>
        <ChartContainer config={costOverTimeConfig} className={chartAreaClassName}>
          <LineChart data={props.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `$${value}`}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => `$${Number(value).toFixed(4)}`} />}
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke={MONO_PRIMARY_STRONG}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
