import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";

export default function ReportPage() {
  return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Diagnostic Reports
          </h2>
        </div>
        <div className="grid gap-4">
          {[
            {
              title: "EEG Analysis Report",
              date: "February 19, 2024",
              status: "Final",
            },
            {
              title: "EEG Analysis Report",
              date: "February 19, 2024",
              status: "Final",
            },
            {
              title: "EEG Analysis Report",
              date: "February 19, 2024",
              status: "Final",
            },
          ].map((report, index) => (
            <Card key={index} className=' '>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{report.title}</CardTitle>
                      <CardDescription>
                        {report.date} 
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className=' '>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className=' '>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  Status:{" "}
                  <span className="text-primary font-medium">
                    {report.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
}
