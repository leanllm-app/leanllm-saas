'use client';

import { Scatter, ScatterChart, XAxis, YAxis, ZAxis } from 'recharts';

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
  latency: {
    label: 'Latency (ms)',
    color: monoPrimaryScale[0],
  },
  cost: {
    label: 'Cost (USD)',
    color: monoPrimaryScale[2],
  },
} satisfies ChartConfig;

export function LatencyVsCostChart(props: {
  data: Array<{ model: string; cost: number; latency: number; tokens: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChartCard title="Latency vs Cost" />;
  }

  return (
    <Card className={chartCardClassName}>
      <CardHeader className={chartCardHeaderClassName}>
        <CardTitle>Latency vs Cost</CardTitle>
        <CardDescription>Outliers: expensive and slow requests</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContentClassName}>
        <ChartContainer config={config} className={chartAreaClassName}>
          <ScatterChart>
            <XAxis
              type="number"
              dataKey="latency"
              name="Latency"
              unit="ms"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="number"
              dataKey="cost"
              name="Cost"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `$${value.toFixed(3)}`}
            />
            <ZAxis type="number" dataKey="tokens" range={[50, 300]} />
            <ChartTooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => {
                    if (name === 'cost') {
                      return `$${Number(value).toFixed(4)}`;
                    }

                    if (name === 'latency') {
                      return `${Number(value)}ms`;
                    }

                    if (name === 'tokens') {
                      return `${Number(value).toLocaleString()} tokens`;
                    }

                    return `${item.payload.model}: ${value}`;
                  }}
                />
              }
            />
            <Scatter
              data={props.data}
              fill={monoPrimaryScale[0]}
              fillOpacity={0.75}
              stroke={monoPrimaryScale[1]}
              strokeWidth={1.5}
            />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
