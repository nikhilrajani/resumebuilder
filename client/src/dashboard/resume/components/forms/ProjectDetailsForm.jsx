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

const ProjectDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [editProject, setEditProject] = useState(-1);
  const [dragItem, setDragItem] = useState(-1);
  const [dragOverItem, setDragOverItem] = useState(-1);

  useEffect(() => {
    if (resumeInfo.projects.length === 0) {
      addProject();
    }
  }, [resumeInfo]);

  const handleDragAndDrop = () => {
    let projectsListCopy = [...resumeInfo.projects];
    const draggedItem = projectsListCopy.splice(dragItem, 1)[0];

    projectsListCopy.splice(dragOverItem, 0, draggedItem);

    const updatedResume = { ...resumeInfo };
    updatedResume.projects = projectsListCopy;
    setResumeInfo(updatedResume);

    if (dragItem === editProject) {
      setEditEducation(dragOverItem);
    } else if (dragOverItem === editProject) {
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
    const projectsListCopy = [...resumeInfo.projects];
    projectsListCopy[index] = {
      ...projectsListCopy[index],
      [name]: value,
    };
    const updatedResume = { ...resumeInfo };
    updatedResume.projects = projectsListCopy;
    setResumeInfo(updatedResume);
  };

  const addProject = () => {
    const newProject = {
      id: resumeInfo.projects.length + 1,
      title: "",
      guidance: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      projectSummary: "",
    };

    const projectsListCopy = [...resumeInfo.projects, newProject];
    setEditProject(resumeInfo.projects.length);
    const updatedResume = { ...resumeInfo };
    updatedResume.projects = projectsListCopy;
    setResumeInfo(updatedResume);
  };

  const deleteProject = (index) => {
    const projectsListCopy = [...resumeInfo.projects];
    projectsListCopy.splice(index, 1);
    const updatedResume = { ...resumeInfo };
    updatedResume.projects = projectsListCopy;
    setResumeInfo(updatedResume);
  };

  const handleSwitchToggle = (index) => {
    enableNext(false);
    const newValue = resumeInfo.projects[index].currentlyWorking ? false : true;
    const projectsListCopy = [...resumeInfo.projects];
    projectsListCopy[index].currentlyWorking = newValue;
    const updatedResume = { ...resumeInfo };
    updatedResume.projects = projectsListCopy;
    setResumeInfo(updatedResume);
  };

  const onSummaryChange = (index, value) => {
    enableNext(false);
    const projectsListCopy = [...resumeInfo.projects];
    projectsListCopy[index].projectSummary = value;
    const updatedResume = { ...resumeInfo };
    updatedResume.projects = projectsListCopy;
    setResumeInfo(updatedResume);
  };

  const handleReset = async () => {
    setEditProject(-1);
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
      <h2 className="font-bold text-lg">Project Details</h2>
      <p>Add your previous works</p>

      {resumeInfo.projects &&
        resumeInfo.projects.map((project, index) => {
          const isEditing = editProject === index;
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
                  onClick={() => setEditProject(isEditing ? -1 : index)}
                >
                  <div className="flex items-center justify-center cursor-move">
                    <GripVertical className="opacity-30" />
                  </div>

                  <div className="font-semibold text-lg">
                    {project.title} | {project.guidance}
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
                      This will remove the project from the list
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-800">
                        <button onClick={() => deleteProject(index)}>
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
                        <label className="text-sm font-semibold">
                          Project Title
                        </label>
                        <Input
                          name="title"
                          required
                          placeholder="Ex. E-Commerce Website"
                          onChange={(e) => handleInputChange(index, e)}
                          value={
                            isEditing
                              ? resumeInfo.projects[editProject].title
                              : ""
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-semibold">
                          Guidance
                        </label>
                        <Input
                          name="guidance"
                          required
                          placeholder="Ex. Term Project"
                          onChange={(e) => handleInputChange(index, e)}
                          value={
                            isEditing
                              ? resumeInfo.projects[editProject].guidance
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
                          value={
                            isEditing
                              ? resumeInfo.projects[editProject].startDate
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
                          value={
                            isEditing
                              ? resumeInfo.projects[editProject].endDate
                              : ""
                          }
                        />
                      </div>
                      <div className="flex flex-col justify-end">
                        <Switch
                          checked={
                            isEditing
                              ? resumeInfo.projects[editProject]
                                  .currentlyWorking
                                ? true
                                : false
                              : false
                          }
                          id="currentlyWorking"
                          onClick={() => handleSwitchToggle(index)}
                        />
                        <label className="text-md font-semibold">
                          Currently Working
                        </label>
                      </div>
                      <div className="col-span-3 mt-2">
                        {isEditing && (
                          <RichTextEditor
                            onRichTextEditorChange={onSummaryChange}
                            index={index}
                            defaultValue={
                              isEditing ? project.projectSummary : ""
                            }
                          />
                        )}
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
          onClick={addProject}
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

export default ProjectDetailsForm;
