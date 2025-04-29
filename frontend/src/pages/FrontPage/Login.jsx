import LoginForm from "@/components/LandingPage/LoginForm";
import Navbar from "@/components/LandingPage/Navbar";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="mt-20 ">
        <div className="container flex-1 flex items-center justify-center mx-auto ">
          <div className="flex w-full flex-col justify-center space-y-6 mx-auto sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <LoginForm />
            <div className="space-y-2">
              <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/register"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </p>
              <p className="px-8 text-center text-sm text-muted-foreground">
                Forgot Password?{" "}
                <Link
                  to="/reset/password"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Reset
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
