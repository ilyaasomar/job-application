import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/90">Over 2,500 architecture jobs available</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            Find Your Dream Role in <span className="text-accent">Architecture & Design</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            Connect with world-class firms and discover opportunities that match your expertise. The Curator brings together top talent and leading employers.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-3 shadow-2xl shadow-black/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="pl-12 h-12 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  className="pl-12 h-12 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
                Search Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-white/60">Popular:</span>
            {["Senior Architect", "Interior Designer", "BIM Specialist", "Urban Planner"].map((term) => (
              <Link
                key={term}
                href={`/jobs?q=${encodeURIComponent(term)}`}
                className="text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
