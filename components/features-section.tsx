import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  FileText,
  Bell,
  Building2,
  Users,
  BarChart3,
  CheckCircle2,
  Zap,
} from "lucide-react";

const seekerFeatures = [
  {
    icon: Search,
    title: "Job Filtering",
    description:
      "Find the right opportunities by searching jobs by category, salary range, and experience level.",
  },
  {
    icon: FileText,
    title: "Simple Applications",
    description:
      "Apply to jobs quickly by submitting your resume link and a customized cover letter.",
  },
  {
    icon: Bell,
    title: "Status Updates",
    description:
      "Know exactly where you stand by seeing when your application moves to interviewing or offered.",
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description:
      "Monitor all your active and past applications in one unified view.",
  },
];

const employerFeatures = [
  {
    icon: Building2,
    title: "Company Profiles",
    description:
      "Set up your company&apos;s profile with a logo and description to provide context to incoming applicants.",
  },
  {
    icon: Zap,
    title: "Job Posting",
    description:
      "Create detailed job listings with specific requirements like experience level, job type, and salary range.",
  },
  {
    icon: Users,
    title: "Applicant Tracking",
    description:
      "Review incoming applications and keep track of who applied to which positions.",
  },
  {
    icon: CheckCircle2,
    title: "Candidate Management",
    description:
      "Update application statuses as candidates move through the hiring process and leave internal private notes.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Whether you&apos;re seeking your next opportunity or looking to hire
            top talent, The Curator provides powerful tools designed for the
            architecture industry.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* For Job Seekers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                For Job Seekers
              </h3>
            </div>
            <div className="grid gap-6">
              {seekerFeatures.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-border hover:border-primary/30 transition-colors"
                >
                  <CardContent className="flex gap-4 p-6">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* For Employers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                For Employers
              </h3>
            </div>
            <div className="grid gap-6">
              {employerFeatures.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-border hover:border-accent/50 transition-colors"
                >
                  <CardContent className="flex gap-4 p-6">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
