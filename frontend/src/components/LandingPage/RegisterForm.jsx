import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/api/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/token";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/slices/authSlice";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    console.log("Login Data:", data);
    setIsLoading(true);

    const { email, first_name, last_name, password  } = data;
    console.log("password:", password);
    const password1 = password;
    const password2 = password
    try {
      const result = await dispatch(registerUser({ email, first_name, last_name, password1, password2 }));
      console.log("Reg Result:", result);
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="grid gap-6 px-3 md:px-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="Arqam"
              type="text"
              {...register("first_name", {
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z]+/,
                  message: "Enter a valid Name",
                },
              })}
              autoCapitalize="none"
              autoCorrect="off"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="Ghauri"
              type="text"
              {...register("last_name", {
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z]+/,
                  message: "Enter a valid Name",
                },
              })}
              autoCapitalize="none"
              autoCorrect="off"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john@example.com"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid Email",
                },
              })}
              autoCapitalize="none"
              autoCorrect="off"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder=""
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Enter a valid Password",
                  },
                })}
                autoCapitalize="none"
                autoCorrect="off"
              />
              <Button
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-white" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="   ">
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="dark:bg-background bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1">
        <Button className="" disabled={isLoading}>
          Google
        </Button>
        <Button className="   " disabled={isLoading}>
          Microsoft
        </Button>
        <Button className="   " disabled={isLoading}>
          Apple
        </Button>
        <Button className="   " disabled={isLoading}>
          Facebook
        </Button>
      </div>
    </div>
  );
}

export default RegisterForm;
