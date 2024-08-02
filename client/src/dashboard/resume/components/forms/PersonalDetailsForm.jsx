import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import axios from "axios";
import React, { useContext } from "react";

const PersonalDetailsForm = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    if (
      name === "degree" ||
      name === "performance" ||
      name === "graduationYear" ||
      name === "major"
    ) {
      const updatedResume = { ...resumeInfo };
      updatedResume.education[0] = {
        ...updatedResume.education[0],
        [name]: value,
      };
      setResumeInfo(updatedResume);
    } else {
      setResumeInfo({
        ...resumeInfo,
        [name]: value,
      });
    }
  };

  const onHandleSubmit = async (e) => {
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

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started with your basic information</p>
      <form onSubmit={onHandleSubmit}>
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
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
