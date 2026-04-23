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
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-8 sm:pt-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-linear-to-r from-[#507afe]/8 via-[#655ccf]/8 to-transparent blur-2xl" />
              <CodeTerminal code={developerCode} fileName="client.py" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-2">
            <p className="w-fit rounded-full border border-[#655ccf]/20 bg-[#655ccf]/8 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[#655ccf] uppercase">
              Developer Experience
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Built for engineers who ship.
            </h2>

            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/85 px-4 py-3 text-slate-700 shadow-[0_14px_30px_-26px_rgba(15,23,42,0.5)] transition duration-200 hover:border-[#507afe]/30 hover:bg-white"
                >
                  <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#507afe] shadow-[0_0_0_4px_rgba(80,122,254,0.12)]" />
                  <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
