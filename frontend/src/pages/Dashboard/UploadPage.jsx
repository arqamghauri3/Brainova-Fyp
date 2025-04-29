import UploadForm from "@/components/Dashboard/UploadForm";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { DashboardProvider } from "../../contexts/DashboardContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UploadPage() {
  return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Upload EEG Data
            </h2>
          </div>
          <Card className=''>
            <CardHeader>
              <CardTitle>EEG Data Upload</CardTitle>
              <CardDescription>
                Upload your EEG data files for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>
        </div>
  );
}
