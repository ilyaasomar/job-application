import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Compass,
  PenTool,
  Building,
  Leaf,
  Home,
  Layers,
  Monitor,
  Ruler,
} from "lucide-react";

const categories = [
  {
    icon: Compass,
    name: "Architecture",
    jobs: 1240,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: PenTool,
    name: "Interior Design",
    jobs: 856,
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Building,
    name: "Urban Planning",
    jobs: 432,
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Leaf,
    name: "Sustainability",
    jobs: 318,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Layers,
    name: "BIM & CAD",
    jobs: 567,
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Home,
    name: "Residential",
    jobs: 723,
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Monitor,
    name: "Visualization",
    jobs: 289,
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: Ruler,
    name: "Project Management",
    jobs: 445,
    color: "bg-orange-50 text-orange-600",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 text-balance">
              Explore by Specialty
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Find opportunities in your area of expertise across all major
              design disciplines.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/jobs?category=${encodeURIComponent(category.name.toLowerCase())}`}
            >
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.jobs.toLocaleString()} jobs
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
