import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Briefcase, Users, MapPin, Percent } from "lucide-react";
import { ClientData, PlanType, BillingCycle } from "@/pages/Index";

interface ClientFormProps {
  clientData: ClientData;
  setClientData: (data: ClientData) => void;
  planType: PlanType;
  setPlanType: (plan: PlanType) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

export const ClientForm = ({
  clientData,
  setClientData,
  planType,
  setPlanType,
  billingCycle,
  setBillingCycle,
}: ClientFormProps) => {
  return (
    <Card className="border-2 shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-radical/10 to-tangerine/10 border-b">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Building2 className="h-6 w-6 text-radical" />
          Informações do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Nome da Empresa *
            </Label>
            <Input
              id="companyName"
              value={clientData.companyName}
              onChange={(e) => setClientData({ ...clientData, companyName: e.target.value })}
              placeholder="Ex: TechCorp Brasil"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactName" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Nome do Contato
            </Label>
            <Input
              id="contactName"
              value={clientData.contactName}
              onChange={(e) => setClientData({ ...clientData, contactName: e.target.value })}
              placeholder="Ex: João Silva"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactRole" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Cargo
            </Label>
            <Input
              id="contactRole"
              value={clientData.contactRole}
              onChange={(e) => setClientData({ ...clientData, contactRole: e.target.value })}
              placeholder="Ex: Diretor de RH"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeCount" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Número de Funcionários *
            </Label>
            <Input
              id="employeeCount"
              type="number"
              value={clientData.employeeCount || ""}
              onChange={(e) => setClientData({ ...clientData, employeeCount: parseInt(e.target.value) || 0 })}
              placeholder="Ex: 50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Região
            </Label>
            <Input
              id="region"
              value={clientData.region}
              onChange={(e) => setClientData({ ...clientData, region: e.target.value })}
              placeholder="Ex: São Paulo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount" className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              Desconto (%)
            </Label>
            <Input
              id="discount"
              type="number"
              value={clientData.discount || ""}
              onChange={(e) => setClientData({ ...clientData, discount: parseFloat(e.target.value) || 0 })}
              placeholder="Ex: 10"
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Plan Selection */}
        <div className="space-y-3 pt-4 border-t">
          <Label className="text-base font-semibold">Selecione o Plano *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setPlanType("business")}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                planType === "business"
                  ? "border-radical bg-radical/5 shadow-radical"
                  : "border-border hover:border-radical/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-foreground">Business</h3>
                {planType === "business" && (
                  <Badge className="bg-radical text-white">Selecionado</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Ideal para pequenas e médias empresas
              </p>
              <p className="text-2xl font-bold text-radical">
                A partir de R$ 9,50
                <span className="text-sm font-normal text-muted-foreground">/funcionário/ano</span>
              </p>
            </button>

            <button
              onClick={() => setPlanType("enterprise")}
              className={`p-6 rounded-xl border-2 text-left transition-all ${
                planType === "enterprise"
                  ? "border-viridian bg-viridian/5 shadow-viridian"
                  : "border-border hover:border-viridian/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-foreground">Enterprise</h3>
                {planType === "enterprise" && (
                  <Badge className="bg-viridian text-white">Selecionado</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Para grandes empresas com necessidades avançadas
              </p>
              <p className="text-2xl font-bold text-viridian">
                A partir de R$ 8,00
                <span className="text-sm font-normal text-muted-foreground">/funcionário/ano</span>
              </p>
            </button>
          </div>
        </div>

        {/* Billing Cycle */}
        <div className="space-y-3 pt-4 border-t">
          <Label className="text-base font-semibold">Ciclo de Cobrança *</Label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`p-4 rounded-xl border-2 transition-all ${
                billingCycle === "monthly"
                  ? "border-radical bg-radical/5"
                  : "border-border hover:border-radical/50"
              }`}
            >
              <div className="text-center">
                <p className="font-semibold text-foreground">Mensal</p>
                <p className="text-sm text-muted-foreground">Pagamento mensal</p>
              </div>
            </button>

            <button
              onClick={() => setBillingCycle("yearly")}
              className={`p-4 rounded-xl border-2 transition-all relative ${
                billingCycle === "yearly"
                  ? "border-success bg-success/5"
                  : "border-border hover:border-success/50"
              }`}
            >
              <Badge className="absolute -top-2 -right-2 bg-gradient-success text-white">
                Economize até 25%
              </Badge>
              <div className="text-center">
                <p className="font-semibold text-foreground">Anual</p>
                <p className="text-sm text-muted-foreground">Pagamento anual</p>
              </div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
