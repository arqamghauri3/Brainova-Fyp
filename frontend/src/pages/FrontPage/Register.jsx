import Navbar from "@/components/LandingPage/Navbar";
import RegisterForm from "@/components/LandingPage/RegisterForm";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div className="mt-20">
        <div className="container flex-1 flex items-center justify-center mx-auto ">
          <div className="flex w-full flex-col justify-center space-y-6 mx-auto sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details to create your account
              </p>
            </div>
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
