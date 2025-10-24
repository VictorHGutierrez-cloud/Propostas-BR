import { useState } from "react";
import { WelcomeScreen } from "@/components/proposal/WelcomeScreen";
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
  const [showWelcome, setShowWelcome] = useState(true);
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

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl">
                F
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gerador de Propostas</h1>
                <p className="text-sm text-muted-foreground">Factorial HR Solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep >= step
                      ? "bg-gradient-primary text-white shadow-radical"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
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
  );
};

export default Index;
