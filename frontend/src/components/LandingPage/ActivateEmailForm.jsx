import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/store/slices/authSlice";

function ActivateEmailForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { key } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(verifyEmail({ key }));
  };

  return (
    <div className="grid gap-6 px-3 md:px-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Button type="submit" disabled={isLoading} className="   ">
            {isLoading ? "Activating..." : "Activate"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ActivateEmailForm;
