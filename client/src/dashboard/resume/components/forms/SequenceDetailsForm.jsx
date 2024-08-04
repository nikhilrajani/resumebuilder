import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "axios";
import { GripVertical } from "lucide-react";
import React, { useContext, useState } from "react";

const SequenceDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [dragItem, setDragItem] = useState(-1);
  const [dragOverItem, setDragOverItem] = useState(-1);

  const handleDragAndDrop = () => {
    enableNext(false);
    let sequenceListCopy = [...resumeInfo.sequence];
    const draggedItem = sequenceListCopy.splice(dragItem, 1)[0];

    sequenceListCopy.splice(dragOverItem, 0, draggedItem);

    const updatedResume = { ...resumeInfo };
    updatedResume.sequence = sequenceListCopy;
    setResumeInfo(updatedResume);

    setDragItem(-1);
    setDragOverItem(-1);
  };

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
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Sections Sequence</h2>
      <p>Arrange the sections according to your preference</p>

      {resumeInfo.sequence &&
        resumeInfo.sequence.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full border my-2 rounded-lg shadow-md p-2 transition-all ease-in-out duration-300"
              draggable
              onDragStart={() => setDragItem(index)}
              onDragEnter={() => setDragOverItem(index)}
              onDragEnd={handleDragAndDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex justify-between">
                <div className="flex flex-row gap-1 cursor-pointer w-full">
                  <div className="flex items-center justify-center cursor-move">
                    <GripVertical className="opacity-30" />
                  </div>

                  <div className="font-semibold text-lg">{item}</div>
                </div>
              </div>
            </div>
          );
        })}
      <div className="flex justify-end">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default SequenceDetailsForm;
