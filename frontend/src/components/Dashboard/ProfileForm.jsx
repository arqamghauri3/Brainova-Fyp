import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createPatient } from "@/api/mutations";
import { viewProfile } from "@/api/queries";
export default function ProfileForm() {
  const accessToken = useSelector((state) => state.auth.access);
  const { pk, email } = useSelector(
    (state) => state.auth.user
  );
  const user = pk;
  const { mutate, isError } = useMutation({ mutationFn: createPatient });
  const { data, isLoading } = useQuery({
    queryKey: ["patient", user],
    queryFn: () => viewProfile({ user }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const {
      first_name,
      last_name,
      gender,
      age,
      medical_history,
      current_medications,
    } = data;

    mutate({
      user,
      first_name,
      last_name,
      age,
      medical_history,
      current_medications,
      gender,
      accessToken,
    });
  };

  return (
    <>
      {isError && <div className="text-red-500">{isError.message}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
          </div>
          <input type="file" className="hidden" id="profile-pic" />
          <Label htmlFor="profile-pic">
            <Button as="label" className="bg-black text-white cursor-pointer">
              Change Profile Picture
            </Button>
          </Label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              {...register("first_name", {
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Enter a valid Name",
                },
              })}
              id="firstName"
              placeholder="John"
              defaultValue={data?.user?.first_name || ""}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              {...register("last_name", {
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Enter a valid Name",
                },
              })}
              id="last_name"
              placeholder="Doe"
              defaultValue={data?.user?.last_name || ""}

              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid Email",
                },
              })}
              id="email"
              type="email"
              placeholder="john@example.com"
              defaultValue={email}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input
              {...register("gender", { required: "Gender is required" })}
              id="gender"
              type="text"
              placeholder="Male or Female"
              defaultValue={data?.patient?.gender || ""}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              {...register("age", { required: "Age is required" })}
              id="age"
              type="number"
              placeholder="25"
              defaultValue={data?.patient?.age || ""}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medical_history">Medical History</Label>
          <Textarea
            {...register("medical_history", {
              required: "Medical History is required",
            })}
            id="medical_history"
            placeholder="Enter any relevant medical history..."
            className="min-h-[100px]"
            defaultValue={data?.patient?.medical_history || ""}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="current_medications">Current Medications</Label>
          <Textarea
            {...register("current_medications", {
              required: "Medications are required",
            })}
            id="current_medications"
            placeholder="List your current medications..."
            className="min-h-[100px]"
            defaultValue={data?.patient?.current_medications || ""}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="outline"
          disabled={isLoading}
          className="bg-black text-white"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </>
  );
}
