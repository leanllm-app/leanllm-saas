import { SitePageHeader } from '~/(marketing)/_components/site-page-header';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'We collect account information such as your name, email address, organization, authentication provider details, and billing details when you create or manage an account.',
      'When you use LeanLLM, we process service data such as API requests, model/provider choices, token counts, latency, costs, labels, routing decisions, errors, and related logs. Depending on your configuration, service data may include prompts, outputs, tool calls, metadata, and other content you send through the service.',
      'We also collect device, usage, analytics, and security information such as IP address, browser information, pages viewed, events, cookies, and similar technologies.',
    ],
  },
  {
    title: 'How we use information',
    paragraphs: [
      'We use information to provide, secure, monitor, support, and improve LeanLLM, including routing requests, measuring savings, debugging issues, preventing abuse, and generating usage analytics.',
      'We use billing and account information to manage subscriptions, invoices, free credits, account notices, support requests, and compliance obligations.',
      'We do not sell your customer content. We may use aggregated or de-identified information to understand product performance and improve cost optimization.',
    ],
  },
  {
    title: 'LLM providers and subprocessors',
    paragraphs: [
      'LeanLLM routes requests to third-party model providers and infrastructure services that help us operate the product. Those providers process service data only as needed to deliver the requested functionality.',
      'You are responsible for ensuring that the content you send through LeanLLM may be shared with the providers you enable or request us to use.',
    ],
  },
  {
    title: 'Retention and security',
    paragraphs: [
      'We retain information for as long as needed to provide the service, meet legal obligations, resolve disputes, enforce agreements, and maintain security. Retention may vary by account settings, plan, and data type.',
      'We use technical and organizational safeguards designed to protect information, including access controls, encryption where appropriate, logging, and operational security practices. No system is perfectly secure, so you should avoid sending unnecessary sensitive data.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'You may request access, correction, export, or deletion of personal information by contacting us. We may need to retain some information where required for security, compliance, billing, or legitimate business purposes.',
      'You can control cookies through your browser settings. Disabling cookies may affect authentication, analytics, or product functionality.',
    ],
  },
  {
    title: 'International use and children',
    paragraphs: [
      'LeanLLM may process information in the United States and other countries where we or our service providers operate.',
      'LeanLLM is not intended for children under 13, and we do not knowingly collect personal information from children.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Questions about this Privacy Policy or privacy requests can be sent to support@leanllm.ai.',
    ],
  },
];

export async function generateMetadata() {
  const { t } = await createI18nServerInstance();

  return {
    title: t('marketing:privacyPolicy'),
  };
}

async function PrivacyPolicyPage() {
  const { t } = await createI18nServerInstance();

  return (
    <div>
      <SitePageHeader
        title={t('marketing:privacyPolicy')}
        subtitle={t('marketing:privacyPolicyDescription')}
      />

      <div className={'container mx-auto max-w-4xl space-y-8 py-10'}>
        <p className={'text-muted-foreground text-sm'}>
          Last updated: May 17, 2026
        </p>

        <p className={'text-muted-foreground text-base leading-7'}>
          LeanLLM provides software that helps teams monitor, route, and reduce
          the cost of large language model usage. This Privacy Policy explains
          how LeanLLM collects, uses, and protects information when you use our
          websites, dashboard, APIs, SDKs, and related services.
        </p>

        {sections.map((section) => (
          <section key={section.title} className={'space-y-3'}>
            <h2 className={'font-heading text-2xl font-semibold'}>
              {section.title}
            </h2>

            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className={'text-muted-foreground text-base leading-7'}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export default withI18n(PrivacyPolicyPage);
