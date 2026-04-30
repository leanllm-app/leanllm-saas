'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';

import { Event } from './events-columns';

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4
        className={
          'text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase'
        }
      >
        {props.title}
      </h4>
      {props.children}
    </div>
  );
}

function Row(props: { label: string; value: string }) {
  return (
    <div className={'flex justify-between border-b py-1'}>
      <span className={'text-muted-foreground'}>{props.label}</span>
      <span className={'font-mono'}>{props.value}</span>
    </div>
  );
}

export function EventsDetailDialog(props: {
  event: Event | null;
  onClose: () => void;
}) {
  if (!props.event) return null;

  const e = props.event;

  return (
    <Dialog open={!!props.event} onOpenChange={() => props.onClose()}>
      <DialogContent className={'max-h-[80vh] max-w-2xl overflow-y-auto'}>
        <DialogHeader>
          <DialogTitle>Event Detail</DialogTitle>
        </DialogHeader>

        <div className={'space-y-4 text-sm'}>
          <Section title="General">
            <Row label="Event ID" value={e.event_id} />
            <Row
              label="Timestamp"
              value={new Date(e.timestamp).toISOString()}
            />
            <Row label="Model" value={e.model} />
            <Row label="Provider" value={e.provider} />
            <Row label="Feature" value={e.feature ?? '-'} />
            <Row label="User ID" value={e.user_id ?? '-'} />
            <Row label="Environment" value={e.environment ?? '-'} />
          </Section>

          <Section title="Usage">
            <Row label="Input Tokens" value={String(e.input_tokens ?? 0)} />
            <Row label="Output Tokens" value={String(e.output_tokens ?? 0)} />
            <Row label="Total Tokens" value={String(e.total_tokens ?? 0)} />
            <Row label="Cost" value={`$${(e.cost_usd ?? 0).toFixed(6)}`} />
            <Row label="Latency" value={`${e.latency_ms ?? 0}ms`} />
          </Section>

          {e.labels &&
            typeof e.labels === 'object' &&
            !Array.isArray(e.labels) &&
            Object.keys(e.labels).length > 0 && (
              <Section title="Labels">
                <pre
                  className={'bg-muted overflow-x-auto rounded-md p-3 text-xs'}
                >
                  {JSON.stringify(e.labels, null, 2)}
                </pre>
              </Section>
            )}

          {e.metadata &&
            typeof e.metadata === 'object' &&
            !Array.isArray(e.metadata) &&
            Object.keys(e.metadata).length > 0 && (
              <Section title="Metadata">
                <pre
                  className={'bg-muted overflow-x-auto rounded-md p-3 text-xs'}
                >
                  {JSON.stringify(e.metadata, null, 2)}
                </pre>
              </Section>
            )}

          {e.prompt && (
            <Section title="Prompt">
              <pre
                className={
                  'bg-muted max-h-48 overflow-y-auto rounded-md p-3 text-xs whitespace-pre-wrap'
                }
              >
                {e.prompt}
              </pre>
            </Section>
          )}

          {e.response && (
            <Section title="Response">
              <pre
                className={
                  'bg-muted max-h-48 overflow-y-auto rounded-md p-3 text-xs whitespace-pre-wrap'
                }
              >
                {e.response}
              </pre>
            </Section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
