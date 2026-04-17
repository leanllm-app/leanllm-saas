'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@kit/ui/chart';

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

const costOverTimeConfig = {
  cost: {
    label: 'Cost (USD)',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

const featureConfig = {
  cost: {
    label: 'Cost (USD)',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const modelConfig = {
  cost: {
    label: 'Cost (USD)',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export function CostOverTimeChart(props: {
  data: Array<{ date: string; cost: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChart title="Cost Over Time" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Over Time</CardTitle>
        <CardDescription>Daily spend in USD</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={costOverTimeConfig}
          className={'h-[300px] w-full'}
        >
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
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TopFeaturesChart(props: {
  data: Array<{ feature: string; cost: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChart title="Top Features" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Features</CardTitle>
        <CardDescription>Cost by feature</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={featureConfig} className={'h-[300px] w-full'}>
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
              width={100}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="cost" fill="var(--chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TopModelsChart(props: {
  data: Array<{ model: string; cost: number }>;
}) {
  if (props.data.length === 0) {
    return <EmptyChart title="Top Models" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Models</CardTitle>
        <CardDescription>Cost by model</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={modelConfig} className={'h-[300px] w-full'}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={props.data}
              dataKey="cost"
              nameKey="model"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ model }: { model: string }) => model}
            >
              {props.data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function EmptyChart(props: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            'text-muted-foreground flex h-[300px] items-center justify-center text-sm'
          }
        >
          No data available yet. Start sending events with the LeanLLM SDK.
        </div>
      </CardContent>
    </Card>
  );
}
