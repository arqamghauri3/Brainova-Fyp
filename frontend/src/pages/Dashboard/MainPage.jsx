import React, { useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { DashboardProvider } from "../../contexts/DashboardContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  Calendar,
  FileText,
  Upload,
  Download,
  HelpCircle,
  LineChart,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useDispatch, useSelector } from "react-redux";
import { getUser, refreshToken, verify } from "@/store/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import { getDiagnosis } from "@/api/queries";

function MainPage() {
  const user = useSelector((state) => state.auth.user);
  const patient = useSelector((state) => state.auth.patient);
  const { pk } = useSelector((state) => state.auth.user);
  const id = pk;
  const { data, isLoading } = useQuery({
    queryKey: ["diagnosis", patient],
    queryFn: () => getDiagnosis({ patient: patient.patient.id }),
  });
  useEffect(() => {
    console.log(user);
    
  })

  return (
    <div className="space-y-6 p-4 md:p-8 pt-6">
      {/* Welcome Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.first_name} {user.last_name}
        </h2>
        <Alert className=" ">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Getting Started</AlertTitle>
          <AlertDescription>
            Upload your EEG scan data for AI-powered analysis. Our system will
            analyze your data and provide a detailed report within minutes.
          </AlertDescription>
        </Alert>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2  ">
          {" "}
          {/* Apply col-span-2 only for md+ */}
          <CardHeader>
            <CardTitle>Upload New Scan</CardTitle>
            <CardDescription>
              Get instant AI-powered analysis of your EEG data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="w-full" asChild>
              <Link to="/dashboard/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload EEG Data
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className=" ">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Contact our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full  " asChild>
              <Link to="/dashboard/support">
                <HelpCircle className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className=" ">
          <CardHeader>
            <CardTitle>Track Progress</CardTitle>
            <CardDescription>View your diagnosis history</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full  " asChild>
              <Link to="/dashboard/history">
                <LineChart className="mr-2 h-4 w-4" />
                View History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Latest Report */}
      <div className="grid gap-4  md:grid-cols-12">
        <Card className="col-span-12  ">
          <CardHeader>
            <CardTitle>Latest Analysis Report</CardTitle>
            <CardDescription>
              Based on your EEG scan from {data?.diagnosed_at}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analysis Result:</span>
                <span className="text-sm text-green-500 font-semibold">
                  {data?.prediction}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Model Confidence
                  </span>
                  <span className="font-medium"> {data?.confidence*100}%</span>
                </div>
                <Progress value={data?.confidence*100} className="h-2 " />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className=" ">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Key Findings:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Normal brain wave patterns detected</li>
                <li>• No significant anomalies in motor function signals</li>
                <li>• Recommended follow-up: 6 months</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className=" ">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest interactions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[
              {
                title: "EEG Analysis Completed",
                description: "No significant concerns detected",
                date: "Today",
                icon: Brain,
                type: "success",
              },
              {
                title: "Report Generated",
                description: "Detailed analysis report is ready for review",
                date: "Today",
                icon: FileText,
                type: "info",
              },
              {
                title: "Doctor's Review Scheduled",
                description: "Follow-up appointment with Dr. Smith",
                date: "Tomorrow",
                icon: Calendar,
                type: "pending",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                    item.type === "success"
                      ? "bg-green-500/10 text-green-500"
                      : item.type === "info"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainPage;
