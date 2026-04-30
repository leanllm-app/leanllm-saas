'use client';

import { CostOverTimeChart } from '../charts/cost-over-time-chart';
import { TopFeaturesChart } from '../charts/top-features-chart';
import { TopModelsChart } from '../charts/top-models-donut-chart';

export function DashboardChartsSection(props: {
  costOverTime: Array<{ date: string; cost: number }>;
  costByFeature: Array<{ feature: string; cost: number }>;
  costByModel: Array<{ model: string; cost: number }>;
}) {
  return (
    <>
      <CostOverTimeChart data={props.costOverTime} />

      <div className={'grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2 lg:gap-4'}>
        <TopFeaturesChart data={props.costByFeature} />
        <TopModelsChart data={props.costByModel} />
      </div>
    </>
  );
}
