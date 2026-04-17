'use client';

import { useCallback, useState } from 'react';

import { Check, Copy } from 'lucide-react';

import { Badge } from '@kit/ui/badge';
import { Button } from '@kit/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@kit/ui/card';

function CopyButton(props: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(props.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [props.text]);

  return (
    <Button
      size={'icon'}
      variant={'ghost'}
      className={'absolute top-2 right-2 h-7 w-7'}
      onClick={handleCopy}
    >
      {copied ? (
        <Check className={'h-3.5 w-3.5'} />
      ) : (
        <Copy className={'h-3.5 w-3.5'} />
      )}
    </Button>
  );
}

function CodeBlock(props: { code: string; language?: string }) {
  return (
    <div className={'relative'}>
      <pre
        className={
          'bg-muted overflow-x-auto rounded-md border p-4 text-xs leading-relaxed'
        }
      >
        <code>{props.code}</code>
      </pre>
      <CopyButton text={props.code} />
    </div>
  );
}

export function IntegrationGuide(props: { apiKeyPrefix?: string }) {
  const keyPlaceholder = props.apiKeyPrefix
    ? `${props.apiKeyPrefix}...`
    : 'lllm_your_key_here';

  const installCode = 'pip install leanllm-ai';

  const usageCode = `import os
os.environ["LEANLLM_API_KEY"] = "${keyPlaceholder}"

from leanllm import LeanLLM

client = LeanLLM(api_key="sk-your-openai-key")
response = client.chat(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello"}],
    labels={"feature": "onboarding", "user_id": "u_123"},
)`;

  const envVarsCode = `LEANLLM_API_KEY=${keyPlaceholder}
LEANLLM_ENDPOINT=https://api.leanllm.dev`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={'flex items-center gap-2'}>
          LeanLLM Integration
          <Badge variant={'outline'}>SDK</Badge>
        </CardTitle>
        <CardDescription>
          Connect your application to LeanLLM for LLM cost observability.
        </CardDescription>
      </CardHeader>

      <CardContent className={'space-y-6'}>
        <div className={'space-y-2'}>
          <h4 className={'text-sm font-medium'}>1. Install the SDK</h4>
          <CodeBlock code={installCode} language="bash" />
        </div>

        <div className={'space-y-2'}>
          <h4 className={'text-sm font-medium'}>2. Add to your code</h4>
          <CodeBlock code={usageCode} language="python" />
        </div>

        <div className={'space-y-2'}>
          <h4 className={'text-sm font-medium'}>3. Environment variables</h4>
          <CodeBlock code={envVarsCode} language="bash" />
        </div>

        <div className={'space-y-2'}>
          <h4 className={'text-sm font-medium'}>How it works</h4>
          <ul
            className={'text-muted-foreground list-disc space-y-1 pl-5 text-sm'}
          >
            <li>
              The SDK wraps your LLM calls and captures model, tokens, cost, and
              latency automatically.
            </li>
            <li>
              Events are batched in-memory (100 events or 3 minutes) and sent to
              the LeanLLM service.
            </li>
            <li>
              Your dashboard updates in near real-time with cost breakdowns by
              feature, user, and model.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
