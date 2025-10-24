import { PlanType, BillingCycle } from "@/pages/Index";

export interface Module {
  id: string;
  name: string;
  description: string;
  isFixed?: boolean;
}

export interface ModuleCategory {
  name: string;
  icon: string;
  modules: Module[];
}

// Pricing structure based on CSV
const PRICING = {
  business: {
    monthly: {
      "base-factorial": 10.30,
      "controle-ponto": 2.85,
      "gestao-ferias": 3.00,
      "gestao-escalas": 2.85,
      "gestao-projetos": 3.00,
      "compensation": 3.00,
      "pesquisas": 2.80,
      "desempenho": 4.00,
      "recrutamento": 470.00,
      "gestao-treinamentos": 2.80,
      "lms": 3.99,
      "gestao-despesas": 3.70,
      "aprovisionamento": 250.00,
      "gestao-espacos": 1.60,
      "gestao-software": 1.60,
      "inventario-ti": 3.15,
      "canal-seguro": 0.99,
    },
    yearly: {
      "base-factorial": 9.50,
      "controle-ponto": 2.55,
      "gestao-ferias": 2.65,
      "gestao-escalas": 2.55,
      "gestao-projetos": 2.65,
      "compensation": 3.00,
      "pesquisas": 1.40,
      "desempenho": 2.60,
      "recrutamento": 420.00,
      "gestao-treinamentos": 1.40,
      "lms": 3.59,
      "gestao-despesas": 3.30,
      "aprovisionamento": 222.50,
      "gestao-espacos": 1.40,
      "gestao-software": 1.40,
      "inventario-ti": 2.85,
      "canal-seguro": 0.89,
    },
  },
  enterprise: {
    monthly: {
      "base-factorial": 9.00,
      "controle-ponto": 4.15,
      "gestao-ferias": 4.30,
      "gestao-escalas": 3.15,
      "gestao-projetos": 4.30,
      "compensation": 3.00,
      "pesquisas": 5.00,
      "desempenho": 4.20,
      "recrutamento": 650.00,
      "gestao-treinamentos": 3.99,
      "gestao-despesas": 4.85,
    },
    yearly: {
      "base-factorial": 8.00,
      "controle-ponto": 3.70,
      "gestao-ferias": 3.85,
      "gestao-escalas": 2.85,
      "gestao-projetos": 3.85,
      "compensation": 3.00,
      "pesquisas": 4.50,
      "desempenho": 3.75,
      "recrutamento": 580.00,
      "gestao-treinamentos": 3.59,
      "gestao-despesas": 4.30,
    },
  },
};

// Modules organized by category
export const MODULES_BY_CATEGORY: Record<string, ModuleCategory> = {
  core: {
    name: "Core",
    icon: "🏢",
    modules: [
      {
        id: "base-factorial",
        name: "Base Factorial",
        description: "Plataforma core com folha de pagamento incluída",
      },
    ],
  },
  time: {
    name: "Gestão de Tempo",
    icon: "⏰",
    modules: [
      {
        id: "controle-ponto",
        name: "Controle de Ponto",
        description: "Gestão de presença e horas trabalhadas",
      },
      {
        id: "gestao-ferias",
        name: "Gestão de Férias e Ausências",
        description: "Controle de férias, licenças e ausências",
      },
      {
        id: "gestao-escalas",
        name: "Gestão de Escalas",
        description: "Planejamento e gestão de escalas de trabalho",
      },
      {
        id: "gestao-projetos",
        name: "Gestão de Projetos",
        description: "Controle de projetos e alocação de tempo",
      },
    ],
  },
  people: {
    name: "People",
    icon: "👥",
    modules: [
      {
        id: "pesquisas",
        name: "Pesquisas",
        description: "Pesquisas de satisfação e clima organizacional",
      },
      {
        id: "desempenho",
        name: "Desempenho",
        description: "Avaliação de performance dos colaboradores",
      },
      {
        id: "recrutamento",
        name: "Recrutamento e Seleção",
        description: "Gestão completa do processo seletivo",
        isFixed: true,
      },
      {
        id: "gestao-treinamentos",
        name: "Gestão de Treinamentos",
        description: "Controle de treinamentos e desenvolvimento",
      },
      {
        id: "lms",
        name: "LMS (Learning Management System)",
        description: "Sistema de aprendizado online",
      },
    ],
  },
  finance: {
    name: "Finance",
    icon: "💰",
    modules: [
      {
        id: "gestao-despesas",
        name: "Gestão de Despesas",
        description: "Controle de gastos e reembolsos",
      },
      {
        id: "aprovisionamento",
        name: "Aprovisionamento",
        description: "Gestão de compras e fornecedores",
        isFixed: true,
      },
      {
        id: "compensation",
        name: "Compensation",
        description: "Gestão de salários e benefícios",
      },
    ],
  },
  office: {
    name: "Office",
    icon: "🏢",
    modules: [
      {
        id: "gestao-espacos",
        name: "Gestão de Espaços",
        description: "Controle de escritórios e espaços físicos",
      },
      {
        id: "gestao-software",
        name: "Gestão de Software",
        description: "Inventário e licenças de software",
      },
      {
        id: "inventario-ti",
        name: "Inventário de TI",
        description: "Controle de equipamentos de tecnologia",
      },
      {
        id: "canal-seguro",
        name: "Canal Seguro",
        description: "Comunicação segura interna",
      },
    ],
  },
};

export const getModulePricing = (planType: PlanType, billingCycle: BillingCycle) => {
  return PRICING[planType][billingCycle];
};

export const calculateModuleCost = (
  moduleId: string,
  employeeCount: number,
  planType: PlanType,
  billingCycle: BillingCycle
): number => {
  const pricing = getModulePricing(planType, billingCycle);
  const price = pricing[moduleId];
  
  if (!price) return 0;

  // Find if module is fixed price
  const isFixed = Object.values(MODULES_BY_CATEGORY)
    .flatMap((cat) => cat.modules)
    .find((mod) => mod.id === moduleId)?.isFixed;

  if (isFixed) {
    return price;
  }

  return price * employeeCount;
};
