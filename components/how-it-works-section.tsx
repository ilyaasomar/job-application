import { UserPlus, FileSearch, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Sign up as a job seeker to get started. Set up your basic information to prepare for your applications.",
  },
  {
    step: "02",
    icon: FileSearch,
    title: "Browse Jobs",
    description:
      "Search through available job listings. Filter by category, job type, and experience level to find a match.",
  },
  {
    step: "03",
    icon: Send,
    title: "Apply Easily",
    description:
      "Submit your application by providing a link to your resume and an optional cover letter.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Track Status",
    description:
      "Monitor your applications from your dashboard as employers review and update your status.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
            Your Application Journey
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Getting started is simple. Follow these straightforward steps to
            find and apply to open roles.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="relative bg-muted/30 rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-colors">
                {/* Step Number */}
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
