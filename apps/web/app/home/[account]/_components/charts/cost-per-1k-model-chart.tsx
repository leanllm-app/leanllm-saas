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

const config = {
  costPer1kTokens: {
    label: 'USD / 1K tokens',
    color: monoPrimaryScale[1],
  },
} satisfies ChartConfig;

export function CostPer1kModelChart(props: {
  data: Array<{ model: string; costPer1kTokens: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChartCard title="Cost per 1K Tokens" />;
  }

  return (
    <Card className={chartCardClassName}>
      <CardHeader className={chartCardHeaderClassName}>
        <CardTitle>Cost per 1K Tokens</CardTitle>
        <CardDescription>Efficiency by model</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContentClassName}>
        <ChartContainer config={config} className={chartAreaClassName}>
          <BarChart data={props.data} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <YAxis
              type="category"
              dataKey="model"
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toFixed(4)} / 1K`}
                />
              }
            />
            <Bar dataKey="costPer1kTokens" fill={monoPrimaryScale[1]} radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
