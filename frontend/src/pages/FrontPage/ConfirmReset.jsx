import ConfirmResetForm from "@/components/LandingPage/ConfirmResetForm";
import LoginForm from "@/components/LandingPage/LoginForm";
import Navbar from "@/components/LandingPage/Navbar";
import ResetPasswordForm from "@/components/LandingPage/ResetPasswordForm";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function ConfirmReset() {
  return (
    <div className="mt-20">
      <div className="container flex-1 flex items-center justify-center mx-auto ">
        <div className="flex w-full flex-col justify-center space-y-6 mx-auto sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter New Password
            </p>
          </div>
          <ConfirmResetForm />
        </div>
      </div>
    </div>
  );
}

export default ConfirmReset;
