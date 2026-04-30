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

const chartCardHeader = 'space-y-0.5 p-4 sm:space-y-1.5 sm:p-6';
const chartCardContent = 'p-4 pt-0 sm:p-6 sm:pt-0';
const chartAreaH = 'h-[200px] w-full sm:h-[260px] md:h-[300px]';

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
    <Card className="shadow-sm">
      <CardHeader className={chartCardHeader}>
        <CardTitle>Cost Over Time</CardTitle>
        <CardDescription>Daily spend in USD</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContent}>
        <ChartContainer
          config={costOverTimeConfig}
          className={chartAreaH}
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
    <Card className="shadow-sm">
      <CardHeader className={chartCardHeader}>
        <CardTitle>Top Features</CardTitle>
        <CardDescription>Cost by feature</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContent}>
        <ChartContainer config={featureConfig} className={chartAreaH}>
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
    <Card className="shadow-sm">
      <CardHeader className={chartCardHeader}>
        <CardTitle>Top Models</CardTitle>
        <CardDescription>Cost by model</CardDescription>
      </CardHeader>
      <CardContent className={chartCardContent}>
        <ChartContainer config={modelConfig} className={chartAreaH}>
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
    <Card className="shadow-sm">
      <CardHeader className={chartCardHeader}>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className={chartCardContent}>
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
