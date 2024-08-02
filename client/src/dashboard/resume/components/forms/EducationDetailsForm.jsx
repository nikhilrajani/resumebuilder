import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { GripVertical, Trash } from "lucide-react";
import React, { useContext, useState } from "react";
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

const EducationDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [editEducation, setEditEducation] = useState(-1);
  const [dragItem, setDragItem] = useState(-1);
  const [dragOverItem, setDragOverItem] = useState(-1);

  const handleDragAndDrop = () => {
    if (dragOverItem == 0 || dragItem == 0) {
      setDragItem(-1);
      setDragOverItem(-1);
      return;
    }
    let educationListCopy = [...resumeInfo.education];
    const draggedItem = educationListCopy.splice(dragItem, 1)[0];

    educationListCopy.splice(dragOverItem, 0, draggedItem);

    const updatedResume = { ...resumeInfo };
    updatedResume.education = educationListCopy;
    setResumeInfo(updatedResume);

    if (dragItem === editEducation) {
      setEditEducation(dragOverItem);
    } else if (dragOverItem === editEducation) {
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
    const educationListCopy = [...resumeInfo.education];
    educationListCopy[index] = {
      ...educationListCopy[index],
      [name]: value,
    };
    const updatedResume = { ...resumeInfo };
    updatedResume.education = educationListCopy;
    setResumeInfo(updatedResume);
  };

  const addEducation = () => {
    const newEd = {
      id: resumeInfo.education.length + 1,
      institute: "",
      graduationYear: "",
      currentlyStudying: true,
      degree: "",
      major: "",
      performance: "",
    };

    const educationListCopy = [...resumeInfo.education, newEd];
    setEditEducation(resumeInfo.education.length);
    const updatedResume = { ...resumeInfo };
    updatedResume.education = educationListCopy;
    setResumeInfo(updatedResume);
  };

  const deleteEducation = (index) => {
    const educationListCopy = [...resumeInfo.education];
    educationListCopy.splice(index, 1);
    const updatedResume = { ...resumeInfo };
    updatedResume.education = educationListCopy;
    setResumeInfo(updatedResume);
  };
  return (
    <div className="p-5 shadow-md rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education Details</h2>
      <p>Tell us about your academic background</p>
      {resumeInfo.education.map((education, index) => {
        const isEditing = editEducation === index;
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
                onClick={() => setEditEducation(isEditing ? -1 : index)}
              >
                <div className="flex items-center justify-center cursor-move">
                  <GripVertical className="opacity-30" />
                </div>

                <div className="font-semibold text-lg">
                  {education.institute}
                </div>
              </div>
              {index > 0 && (
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
                      This will remove the education from the list
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-800">
                        <button onClick={() => deleteEducation(index)}>
                          Delete
                        </button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
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
                      <label className="text-sm font-semibold">Institute</label>
                      <Input
                        name="institute"
                        required
                        placeholder="Ex. IIT Kharagpur"
                        onChange={(e) => handleInputChange(index, e)}
                        defaultValue={
                          isEditing
                            ? resumeInfo.education[editEducation].institute
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">
                        Degree/Exam
                      </label>
                      <Input
                        name="degree"
                        required
                        placeholder="Ex. B.Tech"
                        onChange={(e) => handleInputChange(index, e)}
                        defaultValue={
                          isEditing
                            ? resumeInfo.education[editEducation].degree
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">
                        Performance
                      </label>
                      <Input
                        name="performance"
                        required
                        placeholder="Ex. 7.5/10 or 85.2%"
                        onChange={(e) => handleInputChange(index, e)}
                        defaultValue={
                          isEditing
                            ? resumeInfo.education[editEducation].performance
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">
                        Graduation Year
                      </label>
                      <Input
                        name="graduationYear"
                        required
                        placeholder="Ex. 2025"
                        onChange={(e) => handleInputChange(index, e)}
                        defaultValue={
                          isEditing
                            ? resumeInfo.education[editEducation].graduationYear
                            : ""
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-semibold">Major</label>
                      <Input
                        name="major"
                        required
                        placeholder="Ex. Electrical Engineering"
                        onChange={(e) => handleInputChange(index, e)}
                        defaultValue={
                          isEditing
                            ? resumeInfo.education[editEducation].major
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
          onClick={addEducation}
        >
          +
        </Button>
      </div>
      <div className="flex justify-end">
        <Button onClick={onSave}>Save</Button>
      </div>
      {/* <form onSubmit={onHandleSubmit}>
        <div className="grid grid-cols-3 mt-5 mb-10 gap-3">
          <div>
            <label className="text-sm">First Name*</label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Middle Name</label>
            <Input
              name="middleName"
              onChange={handleInputChange}
              defaultValue={resumeInfo.middleName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name*</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.lastName}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              onChange={handleInputChange}
              defaultValue={resumeInfo.phone}
            />
          </div>
          <div>
            <label className="text-sm">LinkedIn Profile</label>
            <Input
              name="linkedin"
              onChange={handleInputChange}
              defaultValue={resumeInfo.linkedin}
            />
          </div>
          <div>
            <label className="text-sm">Github Profile</label>
            <Input
              name="github"
              onChange={handleInputChange}
              defaultValue={resumeInfo.github}
            />
          </div>
        </div>
        <h2 className="font-bold text-lg">IIT Kharagpur Details</h2>
        <p>Enter your details at IIT Kharagpur</p>
        <div className="grid grid-cols-3 my-5 gap-3">
          <div>
            <label className="text-sm">Degree*</label>
            <Input
              name="degree"
              placeholder="Ex. B.Tech"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.education[0].degree}
            />
          </div>
          <div>
            <label className="text-sm">Roll No*</label>
            <Input
              name="rollNo"
              placeholder="20XX100XX"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.rollNo}
            />
          </div>
          <div>
            <label className="text-sm">Performance*</label>
            <Input
              name="performance"
              placeholder="Ex. 8.5/10"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.education[0].performance}
            />
          </div>
          <div>
            <label className="text-sm">Year of Graduation*</label>
            <Input
              name="graduationYear"
              placeholder="Ex. 2025"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.education[0].graduationYear}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Course*</label>
            <Input
              name="major"
              placeholder="Ex. Electrical Engineering"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.education[0].major}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="Submit">Save</Button>
        </div>
      </form> */}
    </div>
  );
};

export default EducationDetailsForm;
