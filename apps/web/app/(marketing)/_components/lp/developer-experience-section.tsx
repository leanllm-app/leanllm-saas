import { CodeTerminal } from './code-terminal';

const highlights = [
  'Zero config - works out of the box',
  'OpenAI & LiteLLM compatible',
  'Async safe - no performance overhead',
  'Production ready from day one',
];

export function DeveloperExperienceSection() {
  const developerCode = `# Works with any OpenAI-compatible API
from leanllm import LeanLLM
client = LeanLLM()
response = client.chat(  model="gpt-4o",  messages=[{"role": "user", "content": "..."}],  labels={"feature": "summarize", "user_id": "u_123"},)`;

  return (
    <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-20 pt-4 sm:px-8 sm:pt-8 md:px-10">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-[#655ccf] uppercase">
            Developer Experience
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built for engineers who ship.
          </h2>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#507afe]" />
                <span className="text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full">
          <CodeTerminal code={developerCode} fileName="client.py" />
        </div>
      </div>
    </section>
  );
}
