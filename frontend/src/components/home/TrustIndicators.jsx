import { motion } from "framer-motion";
import { Sparkles, Zap, Shield } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const indicators = [
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description: "AI understands your needs",
  },
  {
    icon: Zap,
    title: "Compare Instantly",
    description: "Side-by-side analysis in seconds",
  },
  {
    icon: Shield,
    title: "Explain Every Recommendation",
    description: "Transparent AI reasoning",
  },
];

export default function TrustIndicators() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-6">
        {indicators.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard hover className="p-6 sm:p-8 h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-light mb-5">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
