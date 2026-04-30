'use client';

import { CostPer1kModelChart } from '../charts/cost-per-1k-model-chart';
import { LatencyVsCostChart } from '../charts/latency-vs-cost-chart';

export function DashboardInsightsSection(props: {
  costPer1kByModel: Array<{ model: string; costPer1kTokens: number }>;
  latencyVsCost: Array<{ model: string; cost: number; latency: number; tokens: number }>;
}) {
  return (
    <div className={'grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2 lg:gap-4'}>
      <CostPer1kModelChart data={props.costPer1kByModel} />
      <LatencyVsCostChart data={props.latencyVsCost} />
    </div>
  );
}
