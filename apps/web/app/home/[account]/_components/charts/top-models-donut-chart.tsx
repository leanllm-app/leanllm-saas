'use client';

import * as React from 'react';

import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@kit/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@kit/ui/chart';

import {
  chartAreaClassName,
  chartCardClassName,
  chartCardContentClassName,
  chartCardHeaderClassName,
  EmptyChartCard,
} from './chart-card-shell';
import { getMonochromaticColor } from './chart-theme';

function formatUsd(value: number) {
  if (value < 1) {
    return `$${value.toFixed(4)}`;
  }

  return `$${value.toFixed(2)}`;
}

function formatTooltipCost(value: number) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

function TopModelsTooltip(props: {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
    payload?: { model?: string; fill?: string };
  }>;
}) {
  if (!props.active || !props.payload?.length) {
    return null;
  }

  const item = props.payload[0];
  const model = item?.payload?.model ?? item?.name ?? '-';
  const color = item?.payload?.fill ?? item?.color ?? 'var(--chart-1)';
  const value = Number(item?.value ?? 0);

  return (
    <div className="border-border/50 bg-background min-w-[145px] rounded-lg border px-2.5 py-2 text-xs shadow-xl">
      <div className="text-foreground text-[13px] font-semibold">Cost (USD)</div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="text-muted-foreground flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: color }}
          />
          <span className="text-[13px]">{model}</span>
        </div>
        <span className="text-foreground text-[13px] font-medium">
          {formatTooltipCost(value)}
        </span>
      </div>
    </div>
  );
}

export function TopModelsChart(props: {
  data: Array<{ model: string; cost: number }>;
}) {
  const [hiddenModels, setHiddenModels] = React.useState<Set<string>>(new Set());

  const chartData = React.useMemo(
    () =>
      props.data.map((item, index) => ({
        ...item,
        fill: getMonochromaticColor(index),
      })),
    [props.data],
  );

  const visibleChartData = React.useMemo(
    () => chartData.filter((item) => !hiddenModels.has(item.model)),
    [chartData, hiddenModels],
  );

  const totalCost = React.useMemo(
    () => visibleChartData.reduce((acc, curr) => acc + curr.cost, 0),
    [visibleChartData],
  );

  const chartConfig = React.useMemo(
    () =>
      ({
        cost: {
          label: 'Cost (USD)',
        },
      }) satisfies ChartConfig,
    [],
  );

  const toggleModel = React.useCallback((model: string) => {
    setHiddenModels((prev) => {
      const next = new Set(prev);
      if (next.has(model)) {
        next.delete(model);
      } else {
        next.add(model);
      }
      return next;
    });
  }, []);

  if (chartData.length === 0) {
    return <EmptyChartCard title="Top Models" />;
  }

  return (
    <Card className={chartCardClassName}>
      <CardHeader className={chartCardHeaderClassName}>
        <CardTitle>Top Models</CardTitle>
        <CardDescription>Cost by model</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContentClassName}>
        <ChartContainer config={chartConfig} className={`mx-auto aspect-square max-h-[320px] ${chartAreaClassName}`}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<TopModelsTooltip />}
            />

            <Pie
              data={visibleChartData}
              dataKey="cost"
              nameKey="model"
              innerRadius={70}
              outerRadius={108}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                    return null;
                  }

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-xl font-bold"
                      >
                        {formatUsd(totalCost)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        Total cost
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {chartData.map((item) => {
            const hidden = hiddenModels.has(item.model);
            return (
              <button
                key={item.model}
                type="button"
                onClick={() => toggleModel(item.model)}
                className="text-foreground inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
                aria-pressed={!hidden}
                title={hidden ? `Mostrar ${item.model}` : `Ocultar ${item.model}`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: item.fill }}
                />
                <span className={hidden ? 'text-muted-foreground line-through' : ''}>
                  {item.model}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
