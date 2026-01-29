
export type CalculatorType = 
  | 'SIP' 
  | 'FD' 
  | 'MUTUAL_FUND' 
  | 'RETIREMENT' 
  | 'INFLATION' 
  | 'COMPOUND_INTEREST' 
  | 'NET_WORTH' 
  | 'EMERGENCY_FUND';

export interface CalculatorResult {
  totalValue: number;
  investedAmount: number;
  estReturns: number;
  dataPoints: { name: string; value: number }[];
  details: Record<string, any>;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  stripeLink?: string;
}

export interface Milestone {
  label: string;
  value: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}
