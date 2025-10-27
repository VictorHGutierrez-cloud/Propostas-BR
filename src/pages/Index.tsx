import { useState } from "react";
import { ClientForm } from "@/components/proposal/ClientForm";
import { ModuleSelector } from "@/components/proposal/ModuleSelector";
import { PricingCalculator } from "@/components/proposal/PricingCalculator";
import { ProposalGenerator } from "@/components/proposal/ProposalGenerator";

export type PlanType = "business" | "enterprise";
export type BillingCycle = "monthly" | "yearly";

export interface ClientData {
  companyName: string;
  contactName: string;
  contactRole: string;
  employeeCount: number;
  region: string;
  discount: number;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientData, setClientData] = useState<ClientData>({
    companyName: "",
    contactName: "",
    contactRole: "",
    employeeCount: 0,
    region: "",
    discount: 0,
  });
  const [planType, setPlanType] = useState<PlanType>("business");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [selectedModules, setSelectedModules] = useState<Set<string>>(new Set(["base-factorial"]));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      {/* Black Friday Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radical/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sunbeam/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card/95 backdrop-blur-sm border-b-4 border-radical shadow-lg sticky top-0 z-20">
          <div className="container mx-auto px-4 py-6">
            {/* Black Friday Banner */}
            <div className="bg-gradient-primary text-white text-center py-2 px-4 rounded-lg mb-4 animate-pulse-glow">
              <p className="text-sm md:text-base font-bold">
                🔥 BLACK FRIDAY FACTORIAL 2025 🔥 Ofertas Exclusivas!
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl shadow-radical">
                  F
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    Black Friday 2025
                    <span className="text-lg">🎯</span>
                  </h1>
                  <p className="text-sm text-muted-foreground">Monte seu pacote e aproveite!</p>
                </div>
              </div>
              
              <div className="bg-sunbeam/10 border-2 border-sunbeam rounded-lg px-4 py-2">
                <p className="text-xs text-muted-foreground">Ofertas válidas por tempo limitado</p>
                <p className="text-lg font-bold text-radical">Descontos de até 50%</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms and Selectors */}
          <div className="lg:col-span-2 space-y-6">
            <ClientForm
              clientData={clientData}
              setClientData={setClientData}
              planType={planType}
              setPlanType={setPlanType}
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />
            
            <ModuleSelector
              selectedModules={selectedModules}
              setSelectedModules={setSelectedModules}
              planType={planType}
              billingCycle={billingCycle}
            />
          </div>

          {/* Right Column - Calculator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PricingCalculator
                clientData={clientData}
                selectedModules={selectedModules}
                planType={planType}
                billingCycle={billingCycle}
              />
              
              <ProposalGenerator
                clientData={clientData}
                selectedModules={selectedModules}
                planType={planType}
                billingCycle={billingCycle}
              />
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
