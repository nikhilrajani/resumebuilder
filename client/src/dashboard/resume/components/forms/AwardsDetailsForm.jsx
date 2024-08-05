import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import RichTextEditor from "./components/RichTechEditor";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const AwardsDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const onSave = async (e) => {
    e.preventDefault();
    enableNext(true);
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(`${backendUri}/api/saveResume`, {
      resume: resumeInfo,
    });

    if (response.data) {
      console.log(response.data);
    }
  };

  const onSummaryChange = (index, value) => {
    enableNext(false);
    const updatedResume = { ...resumeInfo };
    updatedResume.awards = value;
    setResumeInfo(updatedResume);
  };

  const handleReset = async () => {
    enableNext(true);
    const id = resumeInfo.resumeId;
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(
        `${backendUri}/api/getResume?resumeId=${id}`
      );
      if (response.data) {
        setResumeInfo(response.data.resume);
      }
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };
  return (
    <div className="p-5 shadow-md rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Awards Details</h2>
      <p>Let us know about your awards and achievements</p>
      <div className="col-span-3 my-2">
        <RichTextEditor
          onRichTextEditorChange={onSummaryChange}
          index={0}
          defaultValue={resumeInfo.awards}
        />
      </div>
      <div className="flex justify-end">
        <div className="flex flex-row gap-2">
          <Button onClick={handleReset} variant="outline">
            <RefreshCcw className="text-primary" />
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default AwardsDetailsForm;
