import React from "react";
import { FaBrain, FaChartLine, FaCloudUploadAlt } from "react-icons/fa";
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

const FeaturesSection = () => {
  return (
    <section id="technology" className="bg-[hsl(var(--muted) / 0.5)];">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our advanced AI system analyzes EEG patterns to detect early signs of Parkinson's disease with
                unprecedented accuracy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "EEG Recording",
                  description: "High-resolution EEG data is recorded using our specialized equipment",
                  icon: Activity,
                },
                {
                  step: "2",
                  title: "AI Analysis",
                  description: "Our deep learning model analyzes brain wave patterns in real-time",
                  icon: Brain,
                },
                {
                  step: "3",
                  title: "Results & Insights",
                  description: "Receive detailed analysis and early detection indicators",
                  icon: ChartBar,
                },
              ].map((item, index) => (
                <div key={index} className="relative p-6  rounded-lg border">
                  <div className="absolute -top-4 left-4 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="mt-4">
                    <item.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  );
};

export default FeaturesSection;
