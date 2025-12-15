
export const SYSTEM_PROMPT = `
Eres "Cronos", un experto economista y sociólogo especializado en pobreza de tiempo, inspirado en las teorías de Vickery, Goodin y el Instituto Levy.
Tu tono es académico pero accesible, empático y riguroso.

Misión:
1. Analizar la "Pobreza de Tiempo" y la "Pobreza Oculta" (LIMTIP).
2. Explicar conceptos complejos con claridad.
3. Proveer recomendaciones de políticas públicas estructurales, no solo consejos de autoayuda.
`;

// Configuration for distinct currencies
export const CURRENCY_CONFIG = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar (Internacional)',
    povertyLine: 1200, // Monthly moderate poverty line for household
    replacementCostPerHour: 15, // Cost to hire help
    step: 50,
    maxIncome: 20000
  },
  CLP: {
    code: 'CLP',
    symbol: '$',
    name: 'Peso Chileno',
    povertyLine: 550000, // Línea pobreza hogar promedio aprox
    replacementCostPerHour: 3500, // Costo hora trabajo doméstico/cuidado
    step: 10000,
    maxIncome: 20000000
  }
};

export const DEFAULT_THRESHOLDS = {
  medianWorkHours: 40,
  survivalSleep: 35, // 5 hours * 7 days (Absolute minimum survival)
  personalCareMin: 10,
  houseworkBase: 15,
  houseworkPerChild: 12,
};

export const AUTHORS_DATA = [
  {
    id: 'vickery',
    name: 'Clair Vickery',
    year: '1977',
    title: 'Time-Income Trade-off',
    description: 'Vickery fue pionera en cuestionar la definición oficial de pobreza en EE.UU. Argumentó que un hogar con un solo ingreso pero con un adulto dedicado al hogar tiene más recursos reales que un hogar con el mismo ingreso pero donde todos los adultos trabajan, debido a la capacidad de producción doméstica.',
    policyProposal: 'Propuso ajustar los umbrales de pobreza considerando si el hogar tiene "tiempo" para cocinar, limpiar y cuidar, o si necesita dinero para comprar esos servicios.',
    quote: 'El tiempo es un recurso económico necesario para el consumo, igual que el dinero.',
    context: 'La Madre Fundadora del Concepto'
  },
  {
    id: 'limtip',
    name: 'Zacharias, Antonopoulos & Masterson',
    year: '2011-Presente',
    title: 'Pobreza Oculta & Déficits Monetizados',
    description: 'Desarrollaron el modelo matemático más robusto hasta la fecha. Miden cuánto tiempo se requiere para producir el nivel de vida de la línea de pobreza. Si un hogar trabaja más de lo disponible, tiene un "déficit". Este déficit se convierte en valor monetario (costo de reemplazo) y se suma a la línea de pobreza.',
    policyProposal: 'Utilizar el LIMTIP para identificar beneficiarios de programas sociales. Un hogar puede no ser pobre en ingresos, pero ser "pobre en tiempo y recursos" una vez ajustado el déficit.',
    quote: 'La pobreza oculta emerge cuando reconocemos que el tiempo no es infinito.',
    context: 'Metodología LIMTIP (Levy Institute)'
  },
  {
    id: 'folbre',
    name: 'Nancy Folbre',
    year: '1994, 2006',
    title: 'El "Impuesto" del Cuidado',
    description: 'Folbre se enfoca en cómo el trabajo de cuidado (reproductivo) está sistemáticamente devaluado. Critica que el PIB ignora la producción doméstica. Argumenta que la pobreza de tiempo es estructuralmente femenina debido a normas de género.',
    policyProposal: 'Inversión pública masiva en cuidado infantil no como "gasto", sino como infraestructura económica esencial. Creación de Cuentas Satélite de Tiempo en estadísticas nacionales.',
    quote: 'La mano invisible del mercado depende del corazón invisible del cuidado.',
    context: 'Economía del Cuidado'
  },
  {
    id: 'bardasi',
    name: 'Bardasi & Wodon',
    year: '2006, 2010',
    title: 'Infraestructura y Pobreza de Tiempo',
    description: 'Analizan la pobreza de tiempo en contextos de desarrollo bajo. Encuentran que la falta de infraestructura (agua corriente, electricidad, caminos) es la causa principal de la pobreza de tiempo rural, obligando a horas excesivas en tareas de subsistencia.',
    policyProposal: 'La mejor política contra la pobreza de tiempo en países en desarrollo no es necesariamente laboral, sino de infraestructura física (pozos de agua, redes eléctricas).',
    quote: 'La pobreza de tiempo en África es un problema de infraestructura, no solo de ingresos.',
    context: 'Perspectiva del Desarrollo (Banco Mundial)'
  },
  {
    id: 'goodin',
    name: 'Goodin, Rice, Parpo & Eriksson',
    year: '2008',
    title: 'Tiempo Discrecional',
    description: 'Proponen medir no cuánto tiempo trabaja la gente, sino cuánto tiempo *estrictamente necesario* requieren para subsistir. La diferencia es el "Tiempo Discrecional". Argumentan que la libertad real es tener control sobre ese tiempo discrecional.',
    policyProposal: 'Políticas que maximicen la autonomía temporal. Critican a los "ricos en dinero, pobres en tiempo" por elección, diferenciándolos de los pobres en tiempo por necesidad.',
    quote: 'La libertad es, en esencia, tiempo discrecional.',
    context: 'Autonomía Temporal'
  },
  {
    id: 'hirway',
    name: 'Indira Hirway',
    year: '2010',
    title: 'Trabajo Penoso (Drudgery)',
    description: 'Desde la India, Hirway destaca cómo la pobreza de tiempo atrapa a las mujeres en trabajos de baja productividad y alta intensidad física (drudgery), impidiéndoles adquirir habilidades para salir de la pobreza.',
    policyProposal: 'Integrar Encuestas de Uso del Tiempo (TUS) en todos los censos nacionales para visibilizar la carga de trabajo físico en zonas rurales.',
    quote: 'Las mujeres pobres subsidian la economía con su propio agotamiento físico.',
    context: 'Perspectiva del Sur Global'
  },
  {
    id: 'esquivel',
    name: 'Valeria Esquivel',
    year: '2011',
    title: 'Simultaneidad de Tareas',
    description: 'Critica las mediciones estándar que no capturan la "multitarea" (cuidar a un niño mientras se cocina). En Latinoamérica, la intensidad del trabajo doméstico es mayor debido a la estructura familiar y falta de servicios.',
    policyProposal: 'Políticas de conciliación corresponsable. El Estado debe ser garante del derecho al cuidado (Cuidado como Derecho Humano).',
    quote: 'Contar las horas lineales subestima la intensidad real del trabajo de cuidado.',
    context: 'Perspectiva Latinoamericana'
  },
   {
    id: 'boltvinik',
    name: 'Julio Boltvinik & Damián',
    year: '2003',
    title: 'Ejes de Bienestar',
    description: 'Investigadores mexicanos que integran el tiempo libre como un eje fundamental del bienestar humano, al mismo nivel que el ingreso y los servicios básicos. Una persona sin tiempo libre vive en "pobreza de tiempo" que degrada su humanidad.',
    policyProposal: 'El tiempo libre debe ser considerado una necesidad humana básica en cualquier medición multidimensional oficial.',
    quote: 'Sin tiempo libre, la reproducción social y biológica está en riesgo.',
    context: 'Método de Medición Integrada (MMIP)'
  }
];

export const POLICY_MATRIX = [
  {
    title: 'Cuenta Satélite de Tiempo',
    icon: 'chart', 
    proposal: 'Integrar el trabajo no remunerado en las Cuentas Nacionales (PIB).',
    authors: 'Nancy Folbre, Indira Hirway',
    impact: 'Visibiliza el aporte económico del cuidado (20-40% del PIB) y justifica la inversión pública.'
  },
  {
    title: 'Inversión en Infraestructura',
    icon: 'truck',
    proposal: 'Electrificación rural, agua potable in-situ y transporte eficiente.',
    authors: 'Bardasi & Wodon',
    impact: 'Reduce directamente la "drudgery" (trabajo penoso) y libera horas para educación o descanso.'
  },
  {
    title: 'Sistema Nacional de Cuidados',
    icon: 'baby',
    proposal: 'Universalización de educación preescolar y cuidado de ancianos.',
    authors: 'LIMTIP, Valeria Esquivel',
    impact: 'La intervención más efectiva para reducir la pobreza de tiempo en mujeres, permitiendo participación laboral plena.'
  },
  {
    title: 'Regulación de Jornada Laboral',
    icon: 'clock',
    proposal: 'Reducción de jornada a 40hrs o 4 días, con protección salarial.',
    authors: 'Goodin, Rice (Tiempo Discrecional)',
    impact: 'Aumenta la "autonomía temporal", pero requiere salarios dignos para no generar pobreza de ingreso.'
  },
  {
    title: 'Reconocimiento Previsional',
    icon: 'award',
    proposal: 'Reconocer años dedicados al cuidado exclusivo como años cotizados para la jubilación.',
    authors: 'CEPAL, OIT',
    impact: 'Reduce la feminización de la pobreza en la vejez, compensando el costo de oportunidad histórico.'
  },
  {
    title: 'Tecnología Doméstica Subsidiada',
    icon: 'zap',
    proposal: 'Subsidios para electrodomésticos eficientes (lavadoras, estufas limpias) en hogares pobres.',
    authors: 'Electrificación Rural (Varios)',
    impact: 'Reduce drásticamente las horas dedicadas a tareas domésticas básicas en hogares de bajos ingresos.'
  }
];
