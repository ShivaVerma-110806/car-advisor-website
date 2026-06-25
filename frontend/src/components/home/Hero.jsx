import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary">
            Find the car that fits{" "}
            <span className="gradient-text">your life.</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-lg leading-relaxed">
            Stop scrolling endless specifications. Tell us what matters to you and let AI help you choose confidently.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full">
            <Button to="/advisor" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
              Ask AI to Recommend
            </Button>
            <Button to="/discover" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Cars
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none w-full">
            <GlassCard className="p-4 sm:p-8 glow-blue">
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  className="animate-float glass rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4"
                  style={{ animationDelay: "0s" }}
                >
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20">
                    <svg viewBox="0 0 40 24" className="w-7 h-4 sm:w-10 sm:h-6" fill="none">
                      <path d="M4 16 Q6 10 12 9 L18 8 Q22 7 26 8 L32 9 Q38 10 36 16" fill="#ef4444" opacity="0.8" />
                      <circle cx="12" cy="16" r="4" fill="#333" />
                      <circle cx="28" cy="16" r="4" fill="#333" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-text-primary">Premium Selection</p>
                    <p className="text-xs sm:text-sm text-text-secondary">Curated collection</p>
                  </div>
                </motion.div>

                <motion.div
                  className="animate-float-delayed glass rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4 ml-0 sm:ml-8"
                >
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-purple-500/30">
                    <Sparkles className="h-5 w-5 sm:h-7 sm:w-7 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-text-primary">Instant Comparison</p>
                    <p className="text-xs sm:text-sm text-text-secondary">Smart analysis</p>
                  </div>
                </motion.div>
              </div>
            </GlassCard>

            <div className="absolute -z-10 inset-4 rounded-3xl bg-gradient-to-br from-accent/20 to-purple-500/10 blur-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
