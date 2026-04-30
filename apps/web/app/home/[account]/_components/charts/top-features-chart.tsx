'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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

const MONO_PRIMARY_MEDIUM = monoPrimaryScale[2];

const featureConfig = {
  cost: {
    label: 'Cost (USD)',
    color: MONO_PRIMARY_MEDIUM,
  },
} satisfies ChartConfig;

export function TopFeaturesChart(props: {
  data: Array<{ feature: string; cost: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChartCard title="Top Features" />;
  }

  return (
    <Card className={chartCardClassName}>
      <CardHeader className={chartCardHeaderClassName}>
        <CardTitle>Top Features</CardTitle>
        <CardDescription>Cost by feature</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContentClassName}>
        <ChartContainer config={featureConfig} className={chartAreaClassName}>
          <BarChart data={props.data} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `$${value}`}
            />
            <YAxis
              type="category"
              dataKey="feature"
              tickLine={false}
              axisLine={false}
              width={110}
            />
            <ChartTooltip
              content={<ChartTooltipContent formatter={(value) => `$${Number(value).toFixed(4)}`} />}
            />
            <Bar dataKey="cost" fill={MONO_PRIMARY_MEDIUM} radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
