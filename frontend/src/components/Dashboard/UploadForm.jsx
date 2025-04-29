import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { viewPatient } from "@/api/queries";
import { useSelector } from "react-redux";

export default function UploadForm() {
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const [currentDate, setCurrentDate] = useState();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [uploadStatus, setUploadStatus] = useState("");
  const queryClient = useQueryClient();
  const { pk } = useSelector((state) => state.auth.user) || {};
  const user = pk;


  const { data, isLoading } = useQuery({
    queryKey: ["patient", user],
    queryFn: () => viewPatient({ user }),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("http://127.0.0.1:8000/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(formData);
      
      return response.data;
    },

    onMutate: () => setUploadStatus("Uploading..."),
    onSuccess: (data) => {
      setUploadStatus("File uploaded successfully!");
      console.log("Upload Response:", data);
      reset();
      queryClient.invalidateQueries(["patient", user]);
    },
    onError: (error) => {
      setUploadStatus("Upload failed. Try again.");
      console.error("Upload Error:", error);
    },
  });

  const mutationClassify = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post("  http://127.0.0.1:8000/api/classify/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onMutate: () => setUploadStatus("Uploading..."),
    onSuccess: (data) => {
      setCurrentDate(getDate());
      setUploadStatus("File uploaded successfully!");
      console.log("Upload Response:", data);
      reset();
      queryClient.invalidateQueries(["patient", user]);
    },
    onError: (error) => {
      setUploadStatus("Upload failed. Try again.");
      console.error("Upload Error:", error);
    },
  });

  const onSubmit = (formData) => {
    if (!formData.eegFile[0]) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", formData.eegFile[0]);
    uploadData.append("patient", data?.patient?.id || "");

    mutation.mutate(uploadData);
    mutationClassify.mutate(uploadData);


  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid w-full gap-4">
        {/* EEG File Upload */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="eegFile">EEG Data File</Label>
          <div className="flex items-center gap-4">
            <Input
              {...register("eegFile", {
                required: "EEG File is required",
                validate: (value) => value.length > 0 || "You must select a file",
              })}
              id="eegFile"
              type="file"
              accept=".edf,.bdf,.csv"
              disabled={mutation.isPending}
              className="cursor-pointer"
            />
            {isLoading ? (
              <p>Loading patient data...</p>
            ) : (
              <Input
                {...register("patient", { required: "Patient is required" })}
                id="patient"
                type="hidden"
                value={data?.patient?.id || ""}
              />
            )}
            <Button type="submit" disabled={mutation.isPending} variant="outline">
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Upload
            </Button>
          </div>
          {errors.eegFile && <p className="text-red-500 text-sm">{errors.eegFile.message}</p>}
          <p className="text-sm text-muted-foreground">
            Supported formats: .edf, .bdf, .csv (max size: 100MB)
          </p>
        </div>

        {/* Notes Input */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            {...register("notes")}
            id="notes"
            placeholder="Add any notes about the recording..."
            disabled={mutation.isPending}
          />
        </div>
      </div>

      {/* Upload Status Message */}
      {uploadStatus && (
        <p className={`text-sm ${mutation.isError ? "text-red-500" : "text-blue-600"}`}>
          {uploadStatus}
        </p>
      )}
    </form>
  );
}
