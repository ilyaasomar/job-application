import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Architect at Foster + Partners",
    avatar: "SC",
    content:
      "The Curator helped me land my dream job at one of the world&apos;s most prestigious firms. The platform&apos;s focus on architecture made all the difference.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Design Director at Gensler",
    avatar: "MR",
    content:
      "As a hiring manager, I&apos;ve found exceptional talent through The Curator. The quality of candidates and the streamlined process saves us countless hours.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "BIM Specialist at SOM",
    avatar: "ET",
    content:
      "The job matching is incredibly accurate. Within two weeks of creating my profile, I had three interview requests from top firms.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6 text-balance">
            Loved by Professionals
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Join thousands of architects and designers who have found success
            with The Curator.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-border hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 lg:p-8">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
