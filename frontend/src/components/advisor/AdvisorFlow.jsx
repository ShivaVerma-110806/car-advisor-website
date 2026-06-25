import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Brain, ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import GlassCard from "../ui/GlassCard";
import ScoreRing from "../ui/ScoreRing";
import { ConfidenceMeter } from "../ui/ProgressBar";
import CarVisual from "../ui/CarVisual";
import { ADVISOR_QUESTIONS, generateRecommendations } from "../../data/cars";

export default function AdvisorFlow() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [explainIndex, setExplainIndex] = useState(null);

  const currentQuestion = ADVISOR_QUESTIONS[step];
  const progress = showResults ? 100 : ((step + 1) / ADVISOR_QUESTIONS.length) * 100;
  const recommendations = showResults ? generateRecommendations(answers) : [];

  const selectOption = (value) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < ADVISOR_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const goBack = () => {
    if (showResults) {
      setShowResults(false);
      setStep(ADVISOR_QUESTIONS.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 text-center page-enter">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10"
        >
          <Brain className="h-10 w-10 text-accent-light" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">AI Advisor</h1>
        <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
          Let our AI help you find the perfect car through an intelligent guided conversation. Tell us what matters to you and we'll recommend the best options.
        </p>

        <GlassCard className="mt-12 p-8 text-left">
          <p className="text-sm text-text-muted text-center mb-6">The AI Advisor will guide you through:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Budget", desc: "What's your price range?" },
              { title: "Driving Style", desc: "City, highway, or mixed?" },
              { title: "Priorities", desc: "What matters most to you?" },
              { title: "AI Recommendations", desc: "Get personalized results", muted: true },
            ].map((item) => (
              <div
                key={item.title}
                className={`glass rounded-xl p-5 ${item.muted ? "opacity-60" : ""}`}
              >
                <h3 className="font-semibold text-text-primary">{item.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" icon={ArrowRight} onClick={() => setStarted(true)}>
            Start AI Consultation
          </Button>
          <Button to="/" variant="secondary" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 page-enter">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary text-center">
            Your AI Recommendations
          </h1>
          <p className="mt-3 text-text-secondary text-center max-w-xl mx-auto">
            Based on your preferences, here are your top matches ranked by compatibility.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <ConfidenceMeter value={recommendations[0]?.matchScore || 85} />
          </div>

          <div className="mt-12 space-y-8">
            {recommendations.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassCard className="overflow-hidden">
                  <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 p-6 sm:p-8">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl font-bold text-accent-light">#{i + 1}</span>
                      <ScoreRing score={car.matchScore} size={100} strokeWidth={6} />
                    </div>

                    <div>
                      <div className="flex items-start gap-4">
                        <CarVisual
                          gradient={car.gradient}
                          accentColor={car.accentColor}
                          className="w-32 h-20 hidden sm:block shrink-0"
                        />
                        <div>
                          <p className="text-xs text-text-muted uppercase">{car.brand}</p>
                          <h3 className="text-2xl font-bold text-text-primary">{car.name}</h3>
                          <p className="text-accent-light font-semibold mt-1">{car.priceRange}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-text-secondary leading-relaxed">
                        Based on your budget, family size, and preference for{" "}
                        {answers.preference || "balanced driving"}, this car offers the strongest balance of{" "}
                        {answers.matters === "safety" ? "safety and reliability" : "practicality and value"}.
                      </p>

                      <div className="mt-4 glass rounded-xl p-4">
                        <p className="text-sm font-medium text-text-primary mb-2">Trade-offs</p>
                        <ul className="space-y-1">
                          {car.cons.slice(0, 2).map((c) => (
                            <li key={c} className="text-sm text-text-secondary flex gap-2">
                              <span className="text-amber-400">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="mt-3 text-sm text-text-muted">
                        Ownership suitability: {car.ownership.practicality}
                      </p>

                      <AnimatePresence>
                        {explainIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 overflow-hidden"
                          >
                            <div className="glass rounded-xl p-4 border border-accent/20">
                              <p className="text-sm text-text-secondary leading-relaxed">
                                <strong className="text-text-primary">AI Reasoning:</strong> We matched {car.name} because your budget aligns with the {car.priceRange} range, your {answers.fuel !== "any" ? answers.fuel : "flexible fuel"} preference matches, and it scores {car.matchScore}% on your stated priorities. Compared to alternatives, it offers better {answers.matters || "overall"} value while accepting trade-offs in {car.cons[0]?.toLowerCase() || "specific areas"}.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => setExplainIndex(explainIndex === i ? null : i)}
                        className="mt-4 text-sm text-accent-light hover:text-accent font-medium transition-colors"
                      >
                        {explainIndex === i ? "Hide Explanation" : "Explain Why →"}
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button to={`/car/${car.id}`} size="sm">
                        View Details
                      </Button>
                      <Button to="/compare" variant="secondary" size="sm">
                        Compare
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <Button variant="secondary" icon={ArrowLeft} onClick={() => { setShowResults(false); setStep(0); setAnswers({}); setStarted(false); }}>
              Start Over
            </Button>
            <Button to="/discover" icon={ChevronRight}>
              Explore All Cars
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 page-enter">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Question {step + 1} of {ADVISOR_QUESTIONS.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center mb-2">
            Let's find your perfect car.
          </h2>
          <p className="text-xl text-text-secondary text-center mb-10">{currentQuestion.question}</p>

          <div className="grid gap-3">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectOption(option.value)}
                className={`glass glass-hover rounded-2xl p-5 text-left transition-all duration-300 ${
                  answers[currentQuestion.id] === option.value
                    ? "ring-2 ring-accent bg-accent/10"
                    : ""
                }`}
              >
                <span className="text-lg font-medium text-text-primary">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {step > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="ghost" icon={ArrowLeft} onClick={goBack}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
