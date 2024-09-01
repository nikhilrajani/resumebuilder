import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import PreviewSection from "../../components/PreviewSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const ViewResume = () => {
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    params && getResumeInfo();
  }, [params]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
          <div id="no-print">
            <div className=" flex flex-col justify-center my-10 mx-10 md:mx-20 lg:mx-36">
              <h2 className="text-center text-2xl font-medium">
                Congratulations! Your resume is ready now!
              </h2>
              <p className="text-center text-gray-400 text-xl my-3">
                Now you can download/share your resume!
              </p>
              <div className="flex justify-between px-96">
                <Button onClick={handleDownload}>Download</Button>
                <Button>Share</Button>
              </div>
            </div>
          </div>
          <div
            id="print-area"
            className="flex flex-row justify-center items-center h-full w-full"
          >
            <div className="w-[900px] shadow-lg border-t-[5px] p-5 border border-5 border-gray-500">
              <PreviewSection />
            </div>
          </div>
        </ResumeInfoContext.Provider>
      )}
    </div>
  );
};

export default ViewResume;
