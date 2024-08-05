import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { GripVertical, RefreshCcw, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "./components/RichTechEditor";

const PORDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [editPOR, setEditPOR] = useState(-1);
  const [dragItem, setDragItem] = useState(-1);
  const [dragOverItem, setDragOverItem] = useState(-1);

  useEffect(() => {
    if (resumeInfo.por.length === 0) {
      addPOR();
    }
  }, []);

  const handleDragAndDrop = () => {
    let porListCopy = [...resumeInfo.por];
    const draggedItem = porListCopy.splice(dragItem, 1)[0];

    porListCopy.splice(dragOverItem, 0, draggedItem);

    const updatedResume = { ...resumeInfo };
    updatedResume.por = porListCopy;
    setResumeInfo(updatedResume);

    if (dragItem === editPOR) {
      setEditEducation(dragOverItem);
    } else if (dragOverItem === editPOR) {
      setEditEducation(dragItem);
    }
    setDragItem(-1);
    setDragOverItem(-1);
  };

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

  const handleInputChange = (index, e) => {
    enableNext(false);
    const { name, value } = e.target;
    const porListCopy = [...resumeInfo.por];
    porListCopy[index] = {
      ...porListCopy[index],
      [name]: value,
    };
    const updatedResume = { ...resumeInfo };
    updatedResume.por = porListCopy;
    setResumeInfo(updatedResume);
  };

  const addPOR = () => {
    const newPOR = {
      id: resumeInfo.internships.length + 1,
      position: "",
      startDate: "",
      endDate: "",
      currentlyHolding: false,
      workSummary: "",
    };

    const porListCopy = [...resumeInfo.por, newPOR];
    setEditPOR(resumeInfo.por.length);
    const updatedResume = { ...resumeInfo };
    updatedResume.por = porListCopy;
    setResumeInfo(updatedResume);
  };

  const deletePOR = (index) => {
    const porListCopy = [...resumeInfo.por];
    porListCopyistCopy.splice(index, 1);
    const updatedResume = { ...resumeInfo };
    updatedResume.por = porListCopy;
    setResumeInfo(updatedResume);
  };

  const handleSwitchToggle = (index) => {
    enableNext(false);
    const newValue = resumeInfo.por[index].currentlyHolding ? false : true;
    const porListCopy = [...resumeInfo.por];
    porListCopy[index].currentlyHolding = newValue;
    const updatedResume = { ...resumeInfo };
    updatedResume.por = porListCopy;
    setResumeInfo(updatedResume);
  };

  const onSummaryChange = (index, value) => {
    enableNext(false);
    const porListCopy = [...resumeInfo.por];
    porListCopy[index].workSummary = value;
    const updatedResume = { ...resumeInfo };
    updatedResume.por = porListCopy;
    setResumeInfo(updatedResume);
  };

  const handleReset = async () => {
    setEditPOR(-1);
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
      <h2 className="font-bold text-lg">Positions of Responsibility</h2>
      <p>Tell us about your involvements</p>
      {resumeInfo.por &&
        resumeInfo.por.map((post, index) => {
          const isEditing = editPOR === index;
          return (
            <div
              key={index}
              className={`w-full border my-2 rounded-lg shadow-md p-2 transition-all ease-in-out duration-300`}
              draggable
              onDragStart={() => setDragItem(index)}
              onDragEnter={() => setDragOverItem(index)}
              onDragEnd={handleDragAndDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex justify-between">
                <div
                  className="flex flex-row gap-1 cursor-pointer w-full"
                  onClick={() => setEditPOR(isEditing ? -1 : index)}
                >
                  <div className="flex items-center justify-center cursor-move">
                    <GripVertical className="opacity-30" />
                  </div>

                  <div className="font-semibold text-lg">{post.position}</div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center justify-center">
                      <Trash size={20} className="text-red-500" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      This will remove the POR from the list
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-800">
                        <button onClick={() => deletePOR(index)}>Delete</button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isEditing ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-2">
                  <form>
                    <div className="grid grid-cols-3 mt-5 mb-10 gap-3">
                      <div>
                        <label className="text-sm font-semibold">
                          Position
                        </label>
                        <Input
                          name="position"
                          required
                          placeholder="Ex. General Secretary"
                          onChange={(e) => handleInputChange(index, e)}
                          value={
                            isEditing ? resumeInfo.por[editPOR].position : ""
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">
                          Start Date
                        </label>
                        <Input
                          name="startDate"
                          required
                          placeholder="Ex. May 2024"
                          onChange={(e) => handleInputChange(index, e)}
                          value={
                            isEditing ? resumeInfo.por[editPOR].startDate : ""
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">
                          End Date
                        </label>
                        <Input
                          name="endDate"
                          placeholder="Ex. Jun. 2024"
                          onChange={(e) => handleInputChange(index, e)}
                          value={
                            isEditing ? resumeInfo.por[editPOR].endDate : ""
                          }
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <Switch
                          checked={
                            isEditing
                              ? resumeInfo.por[editPOR].currentlyHolding
                                ? true
                                : false
                              : false
                          }
                          id="currentlyHolding"
                          onClick={() => handleSwitchToggle(index)}
                        />
                        <label className="text-md font-semibold">
                          Currently Holding
                        </label>
                      </div>
                      <div className="col-span-3 mt-2">
                        <RichTextEditor
                          onRichTextEditorChange={onSummaryChange}
                          index={index}
                          defaultValue={
                            isEditing ? resumeInfo.por[editPOR].workSummary : ""
                          }
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}

      <div className="flex justify-start mt-2">
        <Button
          variant="outline"
          className="text-primary font-bold text-xl"
          onClick={addPOR}
        >
          +
        </Button>
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

export default PORDetailsForm;
