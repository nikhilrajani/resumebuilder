import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import PreviewSection from "../../components/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import axios from "axios";

const EditResume = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [resumeInfo, setResumeInfo] = useState();

  const getResumeInfo = async () => {
    setLoading(true);
    const id = params.resumeId;
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(
        `${backendUri}/api/getResume?resumeId=${id}`
      );
      if (response.data) {
        setResumeInfo(response.data.resume);
        // setResumeInfo(dummy);
      }
    } catch (error) {
      console.error(error); // Handle errors appropriately
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    params && getResumeInfo();
  }, [params]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
          <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
            <FormSection />
            <PreviewSection />
          </div>
        </ResumeInfoContext.Provider>
      )}
    </div>
  );
};

export default EditResume;
