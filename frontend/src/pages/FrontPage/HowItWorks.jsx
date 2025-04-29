import { Link } from "react-router-dom";
import {
  Brain,
  Wand2,
  Upload,
  FileText,
  BarChartIcon as ChartBar,
  Shield,
  Microscope,
  Zap,
  Server,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

export default function HowItWorks() {
  return (
    <>
      
      <main className="flex-1 container mx-auto px-4 md:px-0 lg:px-0 xl:px-0">
        {/* Hero Section */}
        <section className="relative">
          <div className="container py-24 space-y-8">
            <div className="mx-auto max-w-[800px] space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Understanding Our Technology
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Discover how our AI-powered EEG analysis system detects early
                signs of Parkinson's disease with 95% accuracy
              </p>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="border-t">
          <div className="container py-12 md:py-24">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Data Collection",
                  description:
                    "High-resolution EEG recording using medical-grade equipment",
                  icon: Activity,
                  color: "text-blue-500",
                },
                {
                  title: "Signal Processing",
                  description:
                    "Advanced filtering and noise reduction techniques",
                  icon: Wand2,
                  color: "text-purple-500",
                },
                {
                  title: "AI Analysis",
                  description:
                    "Deep learning model trained on 50,000+ EEG scans",
                  icon: Brain,
                  color: "text-green-500",
                },
                {
                  title: "Results & Insights",
                  description: "Detailed report with 95% accuracy rate",
                  icon: ChartBar,
                  color: "text-orange-500",
                },
              ].map((step, index) => (
                <Card key={index}  >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 border rounded-lg ${step.color}`}
                      >
                        <step.icon className="h-6 w-6 " />
                      </div>
                      <div>
                        <CardTitle>{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="border-t bg-muted/50">
          <div className="container py-12 md:py-24">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Advanced Signal Processing
                </h2>
                <p className="text-muted-foreground">
                  Our system employs state-of-the-art signal processing
                  techniques to analyze EEG data:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      title: "Artifact Removal",
                      description:
                        "Advanced algorithms remove noise and artifacts from raw EEG signals",
                      icon: Shield,
                    },
                    {
                      title: "Frequency Analysis",
                      description:
                        "Multi-resolution wavelet analysis for detailed frequency examination",
                      icon: Activity,
                    },
                    {
                      title: "Pattern Recognition",
                      description:
                        "Detection of specific wave patterns associated with neurological conditions",
                      icon: Microscope,
                    },
                    {
                      title: "Real-time Processing",
                      description:
                        "Immediate analysis with our high-performance computing infrastructure",
                      icon: Zap,
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2  border rounded-lg">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto">
                <img
                  src="https://kzmic6yxvd0rgangkymw.lite.vusercontent.net/placeholder.svg"
                  alt="EEG Signal Processing"
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* AI Model Section */}
        <section className="border-t">
          <div className="container py-12 md:py-24">
            <div className="mx-auto max-w-[800px] space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">
                AI-Powered Analysis
              </h2>
              <p className="text-muted-foreground">
                Our deep learning model has been trained on over 50,000 EEG
                scans to detect subtle patterns indicative of early-stage
                Parkinson's disease
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Model Architecture</CardTitle>
                  <CardDescription>
                    Advanced neural network design
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Deep convolutional neural networks</li>
                    <li>• Attention mechanisms for pattern focus</li>
                    <li>• Multi-scale feature extraction</li>
                    <li>• Temporal sequence analysis</li>
                  </ul>
                </CardContent>
              </Card>
              <Card  >
                <CardHeader>
                  <CardTitle>Training Data</CardTitle>
                  <CardDescription>
                    Comprehensive dataset coverage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 50,000+ validated EEG scans</li>
                    <li>• Diverse patient demographics</li>
                    <li>• Multiple clinical conditions</li>
                    <li>• Continuous model updates</li>
                  </ul>
                </CardContent>
              </Card>
              <Card  >
                <CardHeader>
                  <CardTitle>Validation</CardTitle>
                  <CardDescription>Rigorous testing protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 95% accuracy in clinical trials</li>
                    <li>• Cross-validation studies</li>
                    <li>• Independent laboratory testing</li>
                    <li>• Ongoing performance monitoring</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Process Section */}
        <section className="border-t bg-muted/50">
          <div className="container py-12 md:py-24">
            <h2 className="text-3xl font-bold tracking-tighter mb-12">
              How to Use Brainova
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Upload EEG Data",
                  description:
                    "Upload your EEG recordings through our secure platform",
                  icon: Upload,
                },
                {
                  step: "2",
                  title: "Automated Analysis",
                  description: "Our AI system processes and analyzes the data",
                  icon: Server,
                },
                {
                  step: "3",
                  title: "Review Results",
                  description:
                    "Receive detailed reports with actionable insights",
                  icon: FileText,
                },
              ].map((step, index) => (
                <Card key={index}  >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {step.step}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <step.icon className="h-12 w-12 text-primary" />
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="container py-12 md:py-24">
            <div className="mx-auto max-w-[800px] space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Join leading medical institutions already using our technology
                for early detection
              </p>
              <div className="flex justify-center">
                <Button size="lg" variant='outline'  >
                  Try Brainova
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
