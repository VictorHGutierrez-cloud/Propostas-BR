import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { PlanType, BillingCycle } from "@/pages/Index";
import { getModulePricing, MODULES_BY_CATEGORY } from "@/lib/pricing";

interface ModuleSelectorProps {
  selectedModules: Set<string>;
  setSelectedModules: (modules: Set<string>) => void;
  planType: PlanType;
  billingCycle: BillingCycle;
}

export const ModuleSelector = ({
  selectedModules,
  setSelectedModules,
  planType,
  billingCycle,
}: ModuleSelectorProps) => {
  const toggleModule = (moduleId: string) => {
    if (moduleId === "base-factorial") return; // Cannot deselect base
    
    const newModules = new Set(selectedModules);
    if (newModules.has(moduleId)) {
      newModules.delete(moduleId);
    } else {
      newModules.add(moduleId);
    }
    setSelectedModules(newModules);
  };

  const pricing = getModulePricing(planType, billingCycle);

  return (
    <Card className="border-2 shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-viridian/10 to-sunbeam/10 border-b">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Package className="h-6 w-6 text-viridian" />
          Selecione os Módulos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {Object.entries(MODULES_BY_CATEGORY).map(([categoryKey, category]) => (
          <div key={categoryKey} className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.modules.map((module) => {
                const price = pricing[module.id];
                const isAvailable = price !== undefined;
                const isSelected = selectedModules.has(module.id);
                const isMandatory = module.id === "base-factorial";

                if (!isAvailable && module.id !== "base-factorial") return null;

                return (
                  <div
                    key={module.id}
                    onClick={() => !isMandatory && toggleModule(module.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-radical bg-radical/5 shadow-md"
                        : "border-border hover:border-radical/30"
                    } ${isMandatory ? "opacity-100 cursor-default" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        disabled={isMandatory}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-foreground text-sm">
                            {module.name}
                          </h4>
                          {isMandatory && (
                            <Badge variant="secondary" className="text-xs">
                              Obrigatório
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {module.description}
                        </p>
                        {isAvailable && (
                          <p className="text-sm font-bold text-radical">
                            {module.isFixed
                              ? `R$ ${price.toFixed(2)}/${billingCycle === "monthly" ? "mês" : "ano"}`
                              : `R$ ${price.toFixed(2)}/func/${billingCycle === "monthly" ? "mês" : "ano"}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
