import { Building2, Users, Briefcase, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "100%",
    label: "Free for Seekers",
    description: "Apply without hidden fees",
  },
  {
    icon: Briefcase,
    value: "3",
    label: "Experience Levels",
    description: "Junior, Mid, and Senior roles",
  },
  {
    icon: Building2,
    value: "2",
    label: "Job Types",
    description: "Full-Time and Part-Time options",
  },
  {
    icon: Award,
    value: "1",
    label: "Unified Dashboard",
    description: "Manage applications easily",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
