import { Building2, Users, Briefcase, Award } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "12,000+",
    label: "Active Job Listings",
    description: "New opportunities daily",
  },
  {
    icon: Building2,
    value: "3,500+",
    label: "Top Firms",
    description: "From boutique to global",
  },
  {
    icon: Users,
    value: "85,000+",
    label: "Design Professionals",
    description: "Growing community",
  },
  {
    icon: Award,
    value: "94%",
    label: "Satisfaction Rate",
    description: "From placed candidates",
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
