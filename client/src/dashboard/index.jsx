import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import ResumeCard from "./components/ResumeCard";

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  const getUserResumes = async () => {
    setLoading(true);
    const email = user?.primaryEmailAddress?.emailAddress;
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(
      `${backendUri}/api/getResumes?email=${email}`
    );

    if (response.data) {
      setResumes(response.data.resumes);
    }

    setLoading(false);
  };

  useEffect(() => {
    user && getUserResumes();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating an AI Resume for your next Job Role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <AddResume />
        {resumes.map((resume) => (
          <ResumeCard key={resume.resumeId} resume={resume} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
