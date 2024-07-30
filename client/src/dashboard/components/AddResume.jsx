import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigator = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const resumeId = uuidv4();

    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(`${backendUri}/api/addResume`, {
      resumeId,
      title,
      email: user?.primaryEmailAddress?.emailAddress,
    });

    if (response.data) {
      console.log(response.data);
      navigator("/dashboard/resume/" + resumeId + "/edit");
    }

    setOpenDialog(false);
    setLoading(false);
  };

  return (
    <div className="mt-10">
      <div
        className="p-14 py-24 flex items-center border justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add Title for your new Resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button disabled={!title || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
