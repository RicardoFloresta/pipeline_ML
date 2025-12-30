import { ReactNode } from 'react';

export enum SlideId {
  INGESTION = 0,
  PROCESSING = 1,
  TRAINING = 2,
  INFERENCE = 3,
  DICTIONARY = 4,
  FLOW = 5,
}

export interface BenefitProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface DiagramNodeProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  variant: 'aws' | 'external' | 'sagemaker' | 's3' | 'athena' | 'dms';
}

export interface SlideContentProps {
  isActive: boolean;
}