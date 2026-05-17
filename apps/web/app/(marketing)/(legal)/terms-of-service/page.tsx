import { SitePageHeader } from '~/(marketing)/_components/site-page-header';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

const sections = [
  {
    title: 'Using LeanLLM',
    paragraphs: [
      'You may use LeanLLM only if you can form a binding agreement and you comply with these Terms, applicable laws, and any order form or plan terms that apply to your account.',
      'You are responsible for your users, credentials, API keys, configuration, prompts, outputs, and other content submitted through your account. Keep API keys secure and notify us promptly if you believe your account has been compromised.',
    ],
  },
  {
    title: 'Service data and model providers',
    paragraphs: [
      'LeanLLM acts as an API proxy, analytics layer, and optimization service for LLM requests. To provide the service, LeanLLM may process and route your requests, metadata, and outputs to third-party model providers and infrastructure services.',
      'You retain ownership of your content. You grant LeanLLM the rights needed to process, transmit, store, analyze, and display that content solely to provide, secure, support, and improve the service.',
      'You are responsible for confirming that your use of any model provider, including the content you send to that provider through LeanLLM, complies with that provider\'s terms and policies.',
    ],
  },
  {
    title: 'Acceptable use',
    paragraphs: [
      'You may not use LeanLLM to violate laws, infringe rights, bypass provider policies, transmit malware, attack or disrupt systems, scrape or exfiltrate data without permission, or send content that you are not authorized to process.',
      'You may not reverse engineer, resell, or provide access to LeanLLM in a way that competes with the service unless we agree in writing.',
    ],
  },
  {
    title: 'Fees, savings, and credits',
    paragraphs: [
      'Fees, free credits, billing periods, and savings-based pricing are described on the website, in the product, or in an applicable order form. Free credits may expire and have no cash value.',
      'Savings estimates are based on usage data, provider pricing, configuration, and routing decisions available to LeanLLM. Actual savings can vary, and we do not guarantee a specific cost reduction unless expressly stated in a signed agreement.',
      'You are responsible for all charges incurred through your account, including charges from third-party model providers when applicable.',
    ],
  },
  {
    title: 'Availability and changes',
    paragraphs: [
      'We may modify, suspend, or discontinue parts of LeanLLM as the product evolves. We will make reasonable efforts to avoid materially reducing paid functionality without notice.',
      'Beta, experimental, or preview features are provided as-is and may change or be removed at any time.',
    ],
  },
  {
    title: 'Disclaimers and liability',
    paragraphs: [
      'LeanLLM is provided on an as-is and as-available basis. We disclaim warranties to the fullest extent permitted by law, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'To the fullest extent permitted by law, LeanLLM will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, lost profits, lost revenue, loss of data, or costs of substitute services.',
    ],
  },
  {
    title: 'Termination',
    paragraphs: [
      'You may stop using LeanLLM at any time. We may suspend or terminate access if you violate these Terms, create risk for the service or other users, fail to pay fees, or if required by law.',
      'Sections that by their nature should survive termination will survive, including payment obligations, disclaimers, limitations of liability, and rights needed to resolve disputes.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Questions about these Terms can be sent to support@leanllm.ai.',
    ],
  },
];

export async function generateMetadata() {
  const { t } = await createI18nServerInstance();

  return {
    title: t('marketing:termsOfService'),
  };
}

async function TermsOfServicePage() {
  const { t } = await createI18nServerInstance();

  return (
    <div>
      <SitePageHeader
        title={t(`marketing:termsOfService`)}
        subtitle={t(`marketing:termsOfServiceDescription`)}
      />

      <div className={'container mx-auto max-w-4xl space-y-8 py-10'}>
        <p className={'text-muted-foreground text-sm'}>
          Last updated: May 17, 2026
        </p>

        <p className={'text-muted-foreground text-base leading-7'}>
          These Terms of Service govern your access to and use of LeanLLM
          websites, dashboard, APIs, SDKs, and related services. By using
          LeanLLM, you agree to these Terms.
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

export default withI18n(TermsOfServicePage);
