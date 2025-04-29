import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/slices/authSlice";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const access = useSelector((state) => state.auth.access);
  const patient = useSelector((state) => state.auth.patient);
  const user = useSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    setIsLoading(true);

    const { email, password } = data;

    try {
      const result = dispatch(login({ email, password }));

      console.log("Login Result:", result);

      // if (login.fulfilled.match(result)) {
      //   if (patient == null) {
      //     console.log("profile");
          
      //     navigate("/dashboard/profile");
      //   }
      //   else {
      //     console.log("dashboard");
      //     navigate("/dashboard");
      //   }

      // } else {


      // }
    } catch (error) {
      console.error("Error logging in:", error);
    }

    setIsLoading(false);
  };

  const reachGoogle = () => {
    const clientID = "118733874131-c6aka85g7mobfkhnk48c9a02jifd5jbl.apps.googleusercontent.com"
    const callBackURI = "http://localhost:5173/";
    window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`)
  };

  return (
    <div className="grid gap-6 px-3 md:px-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
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
            {isLoading ? "Signing In..." : "Sign In"}
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
        <Button onClick={reachGoogle}>Google</Button>
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

export default LoginForm;
