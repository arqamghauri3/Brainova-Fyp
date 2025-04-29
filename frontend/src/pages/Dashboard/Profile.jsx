import ProfileForm from "@/components/Dashboard/ProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { DashboardProvider } from "../../contexts/DashboardContext";
import { useSelector } from "react-redux";

export default function Profile() {
  const  user  = useSelector((state) => state.auth.user);

  return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 ">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          </div>
          <Card className=' '>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and medical information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </div>
  );
}
