"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "axios";
import { useContext } from "react";

export function SaveButton({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { toast } = useToast();

  const onSave = async (e) => {
    enableNext(true);
    e.preventDefault();
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(`${backendUri}/api/saveResume`, {
      resume: resumeInfo,
    });

    if (response.data) {
      console.log(response.data);
    }
  };

  return (
    <div className="flex justify-end">
      <Button
        onClick={(e) => {
          toast({
            title: "Resumed Saved Successfully!",
            description: "You are good to go now!",
          });
          console.log(toast);
          //   onSave(e);
        }}
      >
        Save
      </Button>
    </div>
  );
}
