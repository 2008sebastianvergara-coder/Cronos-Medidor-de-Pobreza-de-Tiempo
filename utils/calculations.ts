
import { UserProfile, SimulationResult, PovertyStatus } from '../types';
import { DEFAULT_THRESHOLDS, CURRENCY_CONFIG } from '../constants';

export const calculateTimePoverty = (user: UserProfile): SimulationResult => {
  const {
    monthlyIncome,
    hoursPaidWork,
    hoursCommute,
    hoursDomesticWork,
    hoursSleep,
    childrenUnder12,
    householdSize,
    currency
  } = user;

  // Get currency specific configuration
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  const POVERTY_LINE = config.povertyLine;
  const REPLACEMENT_COST = config.replacementCostPerHour;

  const totalCommittedTime = hoursPaidWork + hoursCommute + hoursDomesticWork;
  const sleepWeekly = hoursSleep * 7;
  
  // --- 1. Vickery Model (Classical Trade-off) ---
  // Simplification: Checks if they meet minimal income OR minimal time for survival
  // Assuming a basic poverty line adapted for household size
  const adjustedPovertyLine = POVERTY_LINE * Math.sqrt(householdSize);
  
  let vickeryStatus = PovertyStatus.NOT_POOR;
  if (monthlyIncome < adjustedPovertyLine) {
      vickeryStatus = PovertyStatus.INCOME_POOR;
  }
  // Vickery emphasizes the curve, but for simple status:
  if (168 - totalCommittedTime - sleepWeekly < 0) {
       vickeryStatus = vickeryStatus === PovertyStatus.INCOME_POOR ? PovertyStatus.DOUBLE_POOR : PovertyStatus.TIME_POOR;
  }

  // --- 2. Robert Goodin (Discretionary Time) ---
  // Measure autonomy. Strictly necessary time vs discretionary.
  // Goodin uses normative standards, not just averages.
  const necessaryPersonalCare = DEFAULT_THRESHOLDS.survivalSleep + DEFAULT_THRESHOLDS.personalCareMin; 
  const necessaryHousehold = DEFAULT_THRESHOLDS.houseworkBase + (childrenUnder12 * DEFAULT_THRESHOLDS.houseworkPerChild);
  
  // Discretionary Time = 168 - (Paid Work + Necessary Unpaid + Necessary Personal)
  // We use actual paid work, but normative unpaid.
  const discretionaryTime = 168 - (hoursPaidWork + hoursCommute + necessaryHousehold + necessaryPersonalCare);
  const goodinStatus = discretionaryTime < 20 ? PovertyStatus.TIME_POOR : PovertyStatus.NOT_POOR; // Arbitrary 20h threshold for autonomy

  // --- 3. LIMTIP (Levy Institute) ---
  // The most complex. Calculates time deficit and monetizes it.
  
  // Required Time for Household Production (R)
  const requiredDomestic = DEFAULT_THRESHOLDS.houseworkBase + (childrenUnder12 * DEFAULT_THRESHOLDS.houseworkPerChild);
  
  // Available Time for Household Production (A)
  // 168 - PersonalMin - PaidWork
  const availableForDomestic = 168 - (DEFAULT_THRESHOLDS.survivalSleep + DEFAULT_THRESHOLDS.personalCareMin) - (hoursPaidWork + hoursCommute);
  
  // Time Deficit (X) = Max(0, R - A)
  const timeDeficit = Math.max(0, requiredDomestic - availableForDomestic);
  
  // Monetize Deficit
  // 4.3 weeks in a month approx
  const costOfDeficit = timeDeficit * REPLACEMENT_COST * 4.3; 
  
  // Adjusted Income
  const adjustedIncome = monthlyIncome - costOfDeficit;
  
  let limtipStatus = PovertyStatus.NOT_POOR;
  if (monthlyIncome < adjustedPovertyLine) {
      limtipStatus = PovertyStatus.INCOME_POOR;
  } else if (adjustedIncome < adjustedPovertyLine) {
      // Income was OK, but after subtracting time deficit cost, it's poor.
      limtipStatus = PovertyStatus.HIDDEN_POOR;
  }
  
  // --- 4. Bardasi & Wodon (Relative) ---
  // Relative poverty: Work hours > 1.5x Median
  const relativeThreshold = DEFAULT_THRESHOLDS.medianWorkHours * 1.5;
  const bardasiStatus = (hoursPaidWork + hoursDomesticWork) > relativeThreshold ? PovertyStatus.TIME_POOR : PovertyStatus.NOT_POOR;

  return {
    vickery: {
      modelName: "Modelo Vickery (1977)",
      author: "Clair Vickery",
      status: vickeryStatus,
      score: 168 - totalCommittedTime - sleepWeekly, // Free hours
      threshold: 0,
      description: "Analiza el trade-off mínimo entre tiempo y dinero para la supervivencia.",
      deficits: { time: 168 - totalCommittedTime - sleepWeekly < 0 ? Math.abs(168 - totalCommittedTime - sleepWeekly) : 0 }
    },
    goodin: {
      modelName: "Tiempo Discrecional",
      author: "Robert Goodin et al.",
      status: goodinStatus,
      score: discretionaryTime,
      threshold: 20,
      description: "Mide la autonomía temporal: cuánto control tienes realmente sobre tu tiempo fuera de lo estrictamente necesario.",
      deficits: { time: discretionaryTime < 20 ? 20 - discretionaryTime : 0 }
    },
    limtip: {
      modelName: "LIMTIP (Pobreza Oculta)",
      author: "Levy Economics Institute (Zacharias et al.)",
      status: limtipStatus,
      score: adjustedIncome,
      threshold: adjustedPovertyLine,
      description: "Detecta la 'pobreza oculta' al monetizar el déficit de tiempo necesario para el hogar.",
      deficits: { time: timeDeficit, income: costOfDeficit }
    },
    bardasi: {
      modelName: "Enfoque Relativo",
      author: "Bardasi & Wodon",
      status: bardasiStatus,
      score: hoursPaidWork + hoursDomesticWork,
      threshold: relativeThreshold,
      description: "Te compara con la mediana de tu sociedad. ¿Trabajas mucho más que el resto?",
      deficits: { time: Math.max(0, (hoursPaidWork + hoursDomesticWork) - relativeThreshold) }
    },
    currencyInfo: {
        symbol: config.symbol,
        code: config.code
    }
  };
};
