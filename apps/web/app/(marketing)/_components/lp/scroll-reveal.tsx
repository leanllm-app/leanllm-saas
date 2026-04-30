'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

type Preset = 'up' | 'left' | 'right' | 'scale';

const presetVariants: Record<Preset, Variants> = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
};

type ScrollRevealProps = {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  duration?: number;
  className?: string;
};

/** Dispara cedo no scroll para a animação inteira ficar visível ao rolar. */
const revealViewport = { once: true as const, amount: 0.1, margin: '0px 0px 22% 0px' };

export function ScrollReveal({
  children,
  preset = 'up',
  delay = 0.22,
  duration = 1.15,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={presetVariants[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {},
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerReveal({
  children,
  className,
  staggerChildren = 0.2,
  delayChildren = 0.22,
}: StaggerRevealProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{
        staggerChildren,
        delayChildren,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
