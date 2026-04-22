import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import {
  CtaButton,
} from '@kit/ui/marketing';
import { Trans } from '@kit/ui/trans';

import { withI18n } from '~/lib/i18n/with-i18n';
import { DeveloperExperienceSection } from './_components/lp/developer-experience-section';
import { FinalCtaSection } from './_components/lp/final-cta-section';
import { HeroSection } from './_components/lp/hero';
import { HowItWorksSection } from './_components/lp/how-it-works-section';
import { OpenSourceSaasSection } from './_components/lp/open-source-saas-section';
import { OutcomesSection } from './_components/lp/outcomes-section';
import { ProblemSection } from './_components/lp/problem-section';
import { SolutionSection } from './_components/lp/solution-section';
import { WhyLeanLLMSection } from './_components/lp/why-leanllm-section';

function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <DeveloperExperienceSection />
      <OutcomesSection />
      <WhyLeanLLMSection />
      <OpenSourceSaasSection />
      <FinalCtaSection />

      </>
  );
}

export default withI18n(Home);
