import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import api from "@/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/token";
import ConfirmReset from "@/pages/FrontPage/ConfirmReset";
import { useDispatch } from "react-redux";
import { confirmResetPassword } from "@/store/slices/authSlice";

function ConfirmResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { new_password1, new_password2 } = data;
    dispatch(confirmResetPassword({uid, token, new_password1, new_password2}));
  };

  return (
    <div className="grid gap-6 px-3 md:px-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="new_password1">Password</Label>
            <div className="relative">
              <Input
                id="new_password1"
                placeholder=""
                type={showPassword ? "text" : "password"}
                {...register("new_password1", {
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
            {errors.new_password1 && (
              <p className="text-red-500 text-sm">
                {errors.new_password1.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new_password2">Confirm Password</Label>
            <div className="relative">
              <Input
                id="new_password2"
                placeholder=""
                type={showPassword ? "text" : "password"}
                {...register("new_password2", {
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
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmResetForm;
