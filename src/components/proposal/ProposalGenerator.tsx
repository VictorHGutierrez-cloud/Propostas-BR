import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { ClientData, PlanType, BillingCycle } from "@/pages/Index";
import { calculateModuleCost, MODULES_BY_CATEGORY } from "@/lib/pricing";
import { toast } from "sonner";

interface ProposalGeneratorProps {
  clientData: ClientData;
  selectedModules: Set<string>;
  planType: PlanType;
  billingCycle: BillingCycle;
}

export const ProposalGenerator = ({
  clientData,
  selectedModules,
  planType,
  billingCycle,
}: ProposalGeneratorProps) => {
  const generateProposal = () => {
    // Validation
    if (!clientData.companyName) {
      toast.error("Por favor, preencha o nome da empresa");
      return;
    }
    if (!clientData.employeeCount || clientData.employeeCount <= 0) {
      toast.error("Por favor, informe o número de funcionários");
      return;
    }
    if (selectedModules.size === 0) {
      toast.error("Por favor, selecione pelo menos um módulo");
      return;
    }

    // Calculate totals
    let total = 0;
    const moduleDetails: Array<{ name: string; cost: number }> = [];

    selectedModules.forEach((moduleId) => {
      const cost = calculateModuleCost(moduleId, clientData.employeeCount, planType, billingCycle);
      total += cost;

      const moduleName = Object.values(MODULES_BY_CATEGORY)
        .flatMap((cat) => cat.modules)
        .find((mod) => mod.id === moduleId)?.name || moduleId;

      moduleDetails.push({ name: moduleName, cost });
    });

    const discount = clientData.discount || 0;
    const finalTotal = total * (1 - discount / 100);
    const monthlyEquivalent = billingCycle === "yearly" ? finalTotal / 12 : finalTotal;

    // Generate HTML
    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proposta Comercial - ${clientData.companyName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        .container { max-width: 900px; margin: 40px auto; background: white; padding: 60px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { text-align: center; padding-bottom: 40px; border-bottom: 3px solid #FF355E; }
        .logo { font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #FF355E, #FF9153); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
        h1 { color: #25253D; font-size: 32px; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 18px; }
        .section { margin: 40px 0; }
        .section-title { color: #FF355E; font-size: 24px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #eee; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .info-item { padding: 15px; background: #f9f9f9; border-radius: 8px; }
        .info-label { font-weight: bold; color: #666; font-size: 14px; margin-bottom: 5px; }
        .info-value { color: #25253D; font-size: 16px; }
        .modules-list { list-style: none; }
        .module-item { padding: 15px; margin: 10px 0; background: linear-gradient(to right, #FFF0F3, white); border-left: 4px solid #FF355E; display: flex; justify-content: space-between; align-items: center; border-radius: 4px; }
        .module-name { font-weight: 600; color: #25253D; }
        .module-price { font-weight: bold; color: #FF355E; }
        .pricing-summary { background: linear-gradient(135deg, #FF355E, #FF9153); color: white; padding: 30px; border-radius: 12px; margin: 30px 0; }
        .pricing-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.2); }
        .pricing-row:last-child { border: none; font-size: 24px; font-weight: bold; padding-top: 20px; }
        .badge { display: inline-block; padding: 8px 16px; background: #07A2AD; color: white; border-radius: 20px; font-size: 14px; font-weight: 600; }
        .footer { text-align: center; margin-top: 60px; padding-top: 30px; border-top: 2px solid #eee; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">FACTORIAL</div>
            <h1>Proposta Comercial</h1>
            <p class="subtitle">Solução Completa de RH</p>
        </div>

        <div class="section">
            <h2 class="section-title">📋 Informações do Cliente</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Empresa</div>
                    <div class="info-value">${clientData.companyName}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Contato</div>
                    <div class="info-value">${clientData.contactName || "N/A"}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Cargo</div>
                    <div class="info-value">${clientData.contactRole || "N/A"}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Funcionários</div>
                    <div class="info-value">${clientData.employeeCount}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Região</div>
                    <div class="info-value">${clientData.region || "N/A"}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Plano</div>
                    <div class="info-value">
                        <span class="badge">${planType === "business" ? "Business" : "Enterprise"}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">📦 Módulos Selecionados</h2>
            <ul class="modules-list">
                ${moduleDetails.map((mod) => `
                    <li class="module-item">
                        <span class="module-name">${mod.name}</span>
                        <span class="module-price">R$ ${mod.cost.toFixed(2)}</span>
                    </li>
                `).join("")}
            </ul>
        </div>

        <div class="section">
            <h2 class="section-title">💰 Resumo Financeiro</h2>
            <div class="pricing-summary">
                <div class="pricing-row">
                    <span>Subtotal (${billingCycle === "monthly" ? "Mensal" : "Anual"})</span>
                    <span>R$ ${total.toFixed(2)}</span>
                </div>
                ${discount > 0 ? `
                    <div class="pricing-row">
                        <span>Desconto (${discount}%)</span>
                        <span>- R$ ${(total - finalTotal).toFixed(2)}</span>
                    </div>
                ` : ""}
                <div class="pricing-row">
                    <span>Total ${billingCycle === "monthly" ? "Mensal" : "Anual"}</span>
                    <span>R$ ${finalTotal.toFixed(2)}</span>
                </div>
                ${billingCycle === "yearly" ? `
                    <div class="pricing-row" style="font-size: 16px; font-weight: normal; opacity: 0.9;">
                        <span>Equivalente Mensal</span>
                        <span>R$ ${monthlyEquivalent.toFixed(2)}/mês</span>
                    </div>
                ` : ""}
            </div>
        </div>

        <div class="footer">
            <p><strong>Factorial Brasil</strong></p>
            <p>Data da Proposta: ${new Date().toLocaleDateString("pt-BR")}</p>
            <p style="margin-top: 20px; font-size: 14px;">
                Esta proposta é válida por 30 dias a partir da data de emissão.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    // Download HTML file
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Proposta_${clientData.companyName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Proposta gerada com sucesso!");
  };

  return (
    <Card className="mt-6 border-2 shadow-lg animate-fade-in">
      <CardContent className="pt-6">
        <Button
          onClick={generateProposal}
          className="w-full bg-gradient-primary hover:opacity-90 text-white text-lg py-6 shadow-radical hover:scale-105 transition-all"
          size="lg"
        >
          <FileText className="mr-2 h-5 w-5" />
          Gerar Proposta
          <Download className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-3">
          A proposta será baixada em formato HTML
        </p>
      </CardContent>
    </Card>
  );
};
