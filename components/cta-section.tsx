import { Button } from "@/components/ui/button";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Decorative Icon */}
      <div className="absolute right-8 bottom-8 opacity-10">
        <Compass className="w-48 h-48 text-white" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto text-pretty">
            Create an account today to start applying for jobs, or register as an employer to post your open roles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 h-12 px-8"
              asChild
            >
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 h-12 px-8 bg-transparent"
              asChild
            >
              <Link href="/auth/sign-in">Post a Job</Link>
            </Button>
          </div>

          <p className="text-sm text-white/60 mt-8">
            Free for job seekers. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
