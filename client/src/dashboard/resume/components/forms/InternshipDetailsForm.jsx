import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { GripVertical, Trash } from "lucide-react";
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

const InternshipDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [editInternship, setEditInternship] = useState(-1);
  const [dragItem, setDragItem] = useState(-1);
  const [dragOverItem, setDragOverItem] = useState(-1);

  useEffect(() => {
    if (resumeInfo.internships.length === 0) {
      addInternship();
    }
  }, [resumeInfo]);

  const handleDragAndDrop = () => {
    let internshipsListCopy = [...resumeInfo.internships];
    const draggedItem = internshipsListCopy.splice(dragItem, 1)[0];

    internshipsListCopy.splice(dragOverItem, 0, draggedItem);

    const updatedResume = { ...resumeInfo };
    updatedResume.internships = internshipsListCopy;
    setResumeInfo(updatedResume);

    if (dragItem === editInternship) {
      setEditEducation(dragOverItem);
    } else if (dragOverItem === editInternship) {
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
    const internshipsListCopy = [...resumeInfo.internships];
    internshipsListCopy[index] = {
      ...internshipsListCopy[index],
      [name]: value,
    };
    const updatedResume = { ...resumeInfo };
    updatedResume.internships = internshipsListCopy;
    setResumeInfo(updatedResume);
  };

  const addInternship = () => {
    const newInternship = {
      id: resumeInfo.internships.length + 1,
      role: "",
      companyName: "",
      workplace: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      workSummary: "",
    };

    const internshipsListCopy = [...resumeInfo.internships, newInternship];
    setEditInternship(resumeInfo.internships.length);
    const updatedResume = { ...resumeInfo };
    updatedResume.internships = internshipsListCopy;
    setResumeInfo(updatedResume);
  };

  const deleteInternship = (index) => {
    const internshipsListCopy = [...resumeInfo.internships];
    internshipsListCopy.splice(index, 1);
    const updatedResume = { ...resumeInfo };
    updatedResume.internships = internshipsListCopy;
    setResumeInfo(updatedResume);
  };

  const handleSwitchToggle = (index) => {
    enableNext(false);
    const newValue = resumeInfo.internships[index].currentlyWorking
      ? false
      : true;
    console.log(newValue);
    const internshipsListCopy = [...resumeInfo.internships];
    internshipsListCopy[index].currentlyWorking = newValue;
    const updatedResume = { ...resumeInfo };
    updatedResume.internships = internshipsListCopy;
    setResumeInfo(updatedResume);
    console.log(resumeInfo.internships[index]);
  };

  const onSummaryChange = (index, value) => {
    enableNext(false);
    const internshipsListCopy = [...resumeInfo.internships];
    internshipsListCopy[index].workSummary = value;
    const updatedResume = { ...resumeInfo };
    updatedResume.internships = internshipsListCopy;
    setResumeInfo(updatedResume);
  };

  return (
    <div className="p-5 shadow-md rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Internships Details</h2>
      <p>Tell us about your previous experiences</p>
      {resumeInfo.internships &&
        resumeInfo.internships.map((internship, index) => {
          const isEditing = editInternship === index;
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
                  onClick={() => setEditInternship(isEditing ? -1 : index)}
                >
                  <div className="flex items-center justify-center cursor-move">
                    <GripVertical className="opacity-30" />
                  </div>

                  <div className="font-semibold text-lg">
                    {internship.role} | {internship.companyName}
                  </div>
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
                      This will remove the internship from the list
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-800">
                        <button onClick={() => deleteInternship(index)}>
                          Delete
                        </button>
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
                        <label className="text-sm font-semibold">Role</label>
                        <Input
                          name="role"
                          required
                          placeholder="Ex. Software Developer"
                          onChange={(e) => handleInputChange(index, e)}
                          defaultValue={
                            isEditing
                              ? resumeInfo.internships[editInternship].role
                              : ""
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">
                          Company Name
                        </label>
                        <Input
                          name="companyName"
                          required
                          placeholder="Ex. Google"
                          onChange={(e) => handleInputChange(index, e)}
                          defaultValue={
                            isEditing
                              ? resumeInfo.internships[editInternship]
                                  .companyName
                              : ""
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold">
                          Work Place
                        </label>
                        <Input
                          name="workplace"
                          placeholder="Ex. Bangalore or Remote"
                          onChange={(e) => handleInputChange(index, e)}
                          defaultValue={
                            isEditing
                              ? resumeInfo.internships[editInternship].workplace
                              : ""
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
                          defaultValue={
                            isEditing
                              ? resumeInfo.internships[editInternship].startDate
                              : ""
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
                          defaultValue={
                            isEditing
                              ? resumeInfo.internships[editInternship].endDate
                              : ""
                          }
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <Switch
                          id="currentlyWorking"
                          onClick={() => handleSwitchToggle(index)}
                        />
                        <label className="text-md font-semibold">
                          Currently Working
                        </label>
                      </div>
                      <div className="col-span-3 mt-2">
                        <RichTextEditor
                          onRichTextEditorChange={onSummaryChange}
                          index={index}
                          defaultValue={
                            isEditing
                              ? resumeInfo.internships[editInternship]
                                  .workSummary
                              : ""
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
          onClick={addInternship}
        >
          +
        </Button>
      </div>
      <div className="flex justify-end">
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default InternshipDetailsForm;
