import Link from "next/link"
import { Linkedin, Twitter, Instagram } from "lucide-react"

const footerLinks = {
  forSeekers: {
    title: "For Job Seekers",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Salary Guide", href: "/salaries" },
      { label: "Career Advice", href: "/advice" },
      { label: "Resume Tips", href: "/resume-tips" },
    ],
  },
  forEmployers: {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Pricing", href: "/pricing" },
      { label: "Talent Search", href: "/talent" },
      { label: "Employer Resources", href: "/resources" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/press" },
      { label: "Careers", href: "/careers" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Help Center", href: "/help" },
    ],
  },
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-background">The Curator</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-xs">
              The leading job platform for architecture and design professionals. 
              Connecting talent with world-class firms since 2024.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-background/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-background mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} The Architectural Curator. All rights reserved.
            </p>
            <p className="text-sm text-background/50">
              Designed for professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
