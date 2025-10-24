import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";
import { ClientData, PlanType, BillingCycle } from "@/pages/Index";
import { calculateModuleCost, getModulePricing, MODULES_BY_CATEGORY } from "@/lib/pricing";

interface PricingCalculatorProps {
  clientData: ClientData;
  selectedModules: Set<string>;
  planType: PlanType;
  billingCycle: BillingCycle;
}

export const PricingCalculator = ({
  clientData,
  selectedModules,
  planType,
  billingCycle,
}: PricingCalculatorProps) => {
  const calculateTotal = () => {
    let total = 0;
    selectedModules.forEach((moduleId) => {
      total += calculateModuleCost(moduleId, clientData.employeeCount, planType, billingCycle);
    });
    return total;
  };

  const calculateMonthlyEquivalent = () => {
    if (billingCycle === "monthly") return calculateTotal();
    return calculateTotal() / 12;
  };

  const calculateYearlySavings = () => {
    if (billingCycle === "monthly") {
      // Calculate what yearly would cost
      let yearlyTotal = 0;
      selectedModules.forEach((moduleId) => {
        yearlyTotal += calculateModuleCost(moduleId, clientData.employeeCount, planType, "yearly");
      });
      const monthlyTotal = calculateTotal() * 12;
      return monthlyTotal - yearlyTotal;
    }
    return 0;
  };

  const applyDiscount = (amount: number) => {
    if (clientData.discount > 0) {
      return amount * (1 - clientData.discount / 100);
    }
    return amount;
  };

  const total = calculateTotal();
  const monthlyEquivalent = calculateMonthlyEquivalent();
  const savings = calculateYearlySavings();
  const finalTotal = applyDiscount(total);
  const finalMonthly = applyDiscount(monthlyEquivalent);

  const getAllModules = () => {
    const allModules: Array<{ id: string; name: string }> = [];
    Object.values(MODULES_BY_CATEGORY).forEach((category) => {
      category.modules.forEach((module) => {
        allModules.push({ id: module.id, name: module.name });
      });
    });
    return allModules;
  };

  const selectedModulesList = getAllModules().filter((mod) => selectedModules.has(mod.id));

  return (
    <Card className="border-2 shadow-xl sticky top-24 animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-sunbeam/20 to-tangerine/20 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calculator className="h-5 w-5 text-sunbeam" />
          Calculadora de ROI
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Selected Modules */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Módulos Selecionados</h3>
          <div className="flex flex-wrap gap-2">
            {selectedModulesList.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum módulo selecionado</p>
            ) : (
              selectedModulesList.map((module) => (
                <Badge key={module.id} variant="secondary" className="text-xs">
                  {module.name}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Plan Info */}
        <div className="p-4 rounded-xl bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Plano</span>
            <Badge className={planType === "business" ? "bg-radical" : "bg-viridian"}>
              {planType === "business" ? "Business" : "Enterprise"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Ciclo</span>
            <Badge variant="outline">
              {billingCycle === "monthly" ? "Mensal" : "Anual"}
            </Badge>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Funcionários</span>
            <span className="font-semibold">{clientData.employeeCount || 0}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total {billingCycle === "monthly" ? "Mensal" : "Anual"}</span>
            <span className="text-xl font-bold text-foreground">
              R$ {total.toFixed(2)}
            </span>
          </div>

          {billingCycle === "yearly" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Equivalente Mensal</span>
              <span className="font-semibold text-viridian">R$ {monthlyEquivalent.toFixed(2)}/mês</span>
            </div>
          )}

          {clientData.discount > 0 && (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Desconto ({clientData.discount}%)</span>
                <span className="font-semibold text-success">
                  - R$ {(total - finalTotal).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-semibold text-foreground">Total com Desconto</span>
                <span className="text-xl font-bold text-radical">R$ {finalTotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Savings Card */}
        {billingCycle === "monthly" && savings > 0 && (
          <div className="p-4 rounded-xl bg-gradient-success text-white">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Economia com Plano Anual</p>
                <p className="text-2xl font-bold">R$ {savings.toFixed(2)}</p>
                <p className="text-sm opacity-90 mt-1">
                  Economize {((savings / (total * 12)) * 100).toFixed(1)}% escolhendo o plano anual!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Annual Summary */}
        {billingCycle === "yearly" && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-viridian/10 to-sunbeam/10 border border-viridian/20">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-viridian mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Investimento Anual</p>
                <p className="text-3xl font-bold text-viridian">
                  R$ {finalTotal.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  R$ {finalMonthly.toFixed(2)}/mês
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
