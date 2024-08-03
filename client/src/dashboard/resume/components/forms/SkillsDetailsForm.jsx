import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import RichTextEditor from "./components/RichTechEditor";
import axios from "axios";
import { Button } from "@/components/ui/button";

const SkillsDetailsForm = ({ enableNext }) => {
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
    updatedResume.skills = value;
    setResumeInfo(updatedResume);
  };
  return (
    <div className="p-5 shadow-md rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills Details</h2>
      <p>Tell us about your expertise</p>
      <div className="col-span-3 mt-2">
        <RichTextEditor
          onRichTextEditorChange={onSummaryChange}
          index={0}
          defaultValue={resumeInfo.skills}
        />
      </div>
      <div className="flex justify-end mt-3">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default SkillsDetailsForm;
