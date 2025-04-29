import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Brain,
  Search,
  MessageSquare,
  FileText,
  HelpCircle,
  Zap,
  AlertCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";

export default function FaqPage() {
  return (
    <>
      <main className="container py-10 mx-auto">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Help Center & FAQ
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Brainova and get help with
            any issues you might encounter
          </p>

          <div className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-10 pr-4"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: "Getting Started",
              description: "Learn the basics of using Brainova",
              icon: Zap,
              href: "/register",
            },
            {
              title: "Contact Support",
              description: "Get help from our team",
              icon: MessageSquare,
              href: "/contact",
            },
          ].map((item, index) => (
            <Card key={index} className="transition-all hover:border-primary">
              <Link to={item.href}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-md bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="general" className="space-y-8   ">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 ">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          {/* General FAQs */}
          <TabsContent value="general" id="getting-started">
            <Card className="  ">
              <CardHeader>
                <CardTitle className="text-2xl">General Questions</CardTitle>
                <CardDescription>
                  Common questions about Brainova and our services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is Brainova?</AccordionTrigger>
                    <AccordionContent>
                      Brainova is an advanced AI-powered platform that analyzes
                      EEG (electroencephalogram) data to detect early signs of
                      Parkinson's disease. Our technology uses deep learning
                      algorithms trained on thousands of EEG scans to identify
                      subtle patterns that may indicate the onset of
                      neurological conditions before traditional symptoms
                      appear.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      How accurate is Brainova?
                    </AccordionTrigger>
                    <AccordionContent>
                      Brainova has demonstrated 95% accuracy in clinical trials
                      for early detection of Parkinson's disease. Our system has
                      been validated through extensive testing and peer-reviewed
                      research. However, it's important to note that Brainova is
                      designed to be a diagnostic aid and not a replacement for
                      comprehensive medical evaluation by healthcare
                      professionals.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Who can use Brainova?</AccordionTrigger>
                    <AccordionContent>
                      Brainova is designed for use by healthcare professionals,
                      including neurologists, clinicians, and researchers.
                      Patients can also access their own data and reports
                      through our patient portal with proper authorization from
                      their healthcare provider. Our platform is currently used
                      in hospitals, research institutions, and specialized
                      neurological clinics worldwide.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      What equipment do I need to use Brainova?
                    </AccordionTrigger>
                    <AccordionContent>
                      Brainova is compatible with most standard clinical EEG
                      recording systems. We recommend using high-quality EEG
                      equipment that can record at least 16 channels at 250Hz or
                      higher sampling rate. For specific equipment
                      recommendations or compatibility questions, please contact
                      our technical support team.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      How long does it take to get results?
                    </AccordionTrigger>
                    <AccordionContent>
                      After uploading EEG data to our secure platform, analysis
                      results are typically available within 15-30 minutes,
                      depending on the size and complexity of the data. For
                      urgent cases, we offer a priority processing option that
                      can deliver results in as little as 5 minutes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical FAQs */}
          <TabsContent value="technical">
            <Card className="  ">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Technical Information
                </CardTitle>
                <CardDescription>
                  Detailed information about our technology and EEG processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tech-1">
                    <AccordionTrigger>
                      How does Brainova process EEG data?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Brainova processes EEG data through a multi-stage
                        pipeline:
                      </p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>
                          <strong>Preprocessing:</strong> Raw EEG data undergoes
                          artifact removal, filtering, and normalization.
                        </li>
                        <li>
                          <strong>Feature Extraction:</strong> Our system
                          extracts time-domain, frequency-domain, and non-linear
                          features from the processed signals.
                        </li>
                        <li>
                          <strong>Deep Learning Analysis:</strong> A specialized
                          neural network architecture analyzes these features to
                          identify patterns associated with neurological
                          conditions.
                        </li>
                        <li>
                          <strong>Classification:</strong> The system provides a
                          diagnostic assessment with confidence scores.
                        </li>
                        <li>
                          <strong>Report Generation:</strong> A comprehensive
                          report is created with visualizations and
                          interpretations of the findings.
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tech-2">
                    <AccordionTrigger>
                      What EEG file formats are supported?
                    </AccordionTrigger>
                    <AccordionContent>
                      Brainova supports the following EEG file formats:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>European Data Format (EDF/EDF+)</li>
                        <li>BioSemi Data Format (BDF)</li>
                        <li>
                          Brain Vision Data Exchange Format (VHDR, VMRK, EEG)
                        </li>
                        <li>Neuroscan CNT format</li>
                        <li>EEGLab SET format</li>
                        <li>Micromed TRC format</li>
                        <li>
                          Generic ASCII/CSV formats (with proper channel
                          configuration)
                        </li>
                      </ul>
                      If you use a different format, please contact our support
                      team for assistance with conversion.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tech-3">
                    <AccordionTrigger>
                      What are the minimum technical requirements for EEG
                      recordings?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        For optimal results, we recommend EEG recordings that
                        meet these specifications:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Minimum 16 channels (21+ channels preferred)</li>
                        <li>
                          Sampling rate of at least 250 Hz (500 Hz recommended)
                        </li>
                        <li>
                          Recording duration of at least 5 minutes (10+ minutes
                          recommended)
                        </li>
                        <li>Standard 10-20 electrode placement system</li>
                        <li>
                          Properly calibrated equipment with impedance below 5
                          kΩ
                        </li>
                        <li>
                          Recording should include both resting state and
                          cognitive tasks if possible
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tech-4">
                    <AccordionTrigger>
                      What AI models does Brainova use?
                    </AccordionTrigger>
                    <AccordionContent>
                      Brainova employs a combination of advanced AI models:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Convolutional Neural Networks (CNNs) for spatial
                          pattern recognition
                        </li>
                        <li>
                          Recurrent Neural Networks (RNNs) with LSTM units for
                          temporal sequence analysis
                        </li>
                        <li>
                          Transformer-based models for attention-focused feature
                          detection
                        </li>
                        <li>
                          Ensemble methods that combine multiple model outputs
                          for improved accuracy
                        </li>
                      </ul>
                      Our models are continuously trained and updated using
                      federated learning techniques while maintaining strict
                      privacy controls.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tech-5">
                    <AccordionTrigger>
                      Can Brainova integrate with our existing systems?
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes, Brainova offers several integration options:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          REST API for seamless integration with electronic
                          health record (EHR) systems
                        </li>
                        <li>
                          DICOM compatibility for integration with medical
                          imaging systems
                        </li>
                        <li>HL7 FHIR support for healthcare data exchange</li>
                        <li>
                          Custom integrations for specific institutional
                          requirements
                        </li>
                        <li>
                          On-premises deployment options for organizations with
                          strict data sovereignty requirements
                        </li>
                      </ul>
                      Our technical team can work with your IT department to
                      ensure smooth integration with your existing workflows.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
