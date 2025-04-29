import React from "react";
import {
  Brain,
  Activity,
  BarChartIcon as ChartBar,
  ArrowRight,
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="border-t border-muted px-4 md:px-0 lg:px-0 xl:px-0">
    <div className="mx-auto container py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold">Brainova</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Advanced EEG analysis for early detection of Parkinson's disease.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Product</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Technology
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Research
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Documentation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Company</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Team
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Connect</h3>
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-muted pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Brainova. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
};

export default Footer;
