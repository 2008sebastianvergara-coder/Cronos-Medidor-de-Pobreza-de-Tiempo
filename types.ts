
export interface UserProfile {
  gender: 'male' | 'female' | 'other';
  age: number;
  householdSize: number;
  childrenUnder12: number;
  monthlyIncome: number; // In local currency units
  currency: 'USD' | 'CLP'; // Updated to specific union type
  hoursPaidWork: number; // Weekly
  hoursCommute: number; // Weekly
  hoursDomesticWork: number; // Weekly (Unpaid care, housework)
  hoursSleep: number; // Daily average
  location: 'urban' | 'rural';
}

export enum PovertyStatus {
  NOT_POOR = 'No Pobre',
  INCOME_POOR = 'Pobreza de Ingreso',
  TIME_POOR = 'Pobreza de Tiempo',
  HIDDEN_POOR = 'Pobreza Oculta (LIMTIP)', // Income OK, but Time Deficit causes poverty
  DOUBLE_POOR = 'Pobreza Dual' // Both time and income
}

export interface ModelResult {
  modelName: string;
  author: string;
  status: PovertyStatus;
  score: number; // Normalized score or specific unit
  threshold: number;
  description: string;
  deficits: {
    time?: number; // Hours per week deficit
    income?: number; // Monetary deficit
  };
}

export interface SimulationResult {
  vickery: ModelResult;
  goodin: ModelResult;
  limtip: ModelResult;
  bardasi: ModelResult;
  currencyInfo: {
      symbol: string;
      code: string;
  }
}
