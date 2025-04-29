import React from "react";
import { Button } from "@/components/ui/button";
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
import LandingPageImg from '../../assets/LandingPageImg.jpeg'
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto container flex flex-col lg:flex-row items-center justify-between py-24 gap-12">
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Early Detection Through
            <span className="text-primary"> Brain Wave Analysis</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Advanced AI-powered EEG analysis for early detection of Parkinson's
            disease. 95% accuracy in clinical trials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Research
            </Button>
          </div>
        </div>
        <div className="relative w-full max-w-xl lg:max-w-2xl aspect-square">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 rounded-full blur-3xl" />
          <img
            src={LandingPageImg}
            alt="EEG Brain Mapping"
            width={600}
            height={600}
            className="relative z-10 rounded-2xl"
            />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
