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
const AboutSection = () => {
  return (
    <section id="benefits" className="py-24">
          <div className="container mx-auto">
            <div className="flex items-center  justify-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Leading the Future of
                  <span className="text-primary"> Neurological Diagnostics</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our system provides unprecedented accuracy in early detection, enabling better treatment outcomes
                  through timely intervention.
                </p>
                <div className="grid gap-4">
                  {[
                    {
                      title: "Early Detection",
                      description: "Identify signs up to 5 years earlier than traditional methods",
                    },
                    {
                      title: "95% Accuracy",
                      description: "Clinically validated accuracy in diagnostic predictions",
                    },
                    {
                      title: "Non-invasive",
                      description: "Completely painless and non-invasive procedure",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-bold">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default AboutSection;
