import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-radical via-tangerine to-sunbeam flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-viridian/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunbeam/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="animate-scale-in">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-2xl flex items-center justify-center animate-pulse-glow">
              <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">F</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Gerador de Propostas
            <br />
            <span className="text-4xl md:text-5xl">Factorial</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Crie propostas profissionais em minutos com cálculos automáticos de ROI
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: "🎯", title: "Personalização Total", desc: "Selecione módulos específicos" },
              { icon: "💰", title: "Cálculo Automático", desc: "Preços e ROI em tempo real" },
              { icon: "📄", title: "Proposta Profissional", desc: "Download em HTML/PDF" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={onStart}
            size="lg"
            className="bg-white text-radical hover:bg-white/90 text-xl px-12 py-8 rounded-2xl shadow-2xl hover:shadow-radical hover:scale-105 transition-all animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Sparkles className="mr-3 h-6 w-6" />
            Começar Agora
          </Button>

          {/* Additional Info */}
          <p className="mt-8 text-white/70 text-sm animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            Sistema desenvolvido para a equipe de vendas Factorial Brasil
          </p>
        </div>
      </div>
    </div>
  );
};
