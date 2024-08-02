import React, { useState } from "react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EducationDetailsForm from "./forms/EducationDetailsForm";
import InternshipDetailsForm from "./forms/InternshipDetailsForm";

const FormSection = () => {
  const [formIndex, setFormIndex] = useState(2);
  const [enableNext, setEnableNext] = useState(true);
  return (
    <div>
      <div className="flex flex-row justify-end gap-2">
        {formIndex > 0 && (
          <Button
            onClick={() => setFormIndex(formIndex - 1)}
            disabled={!enableNext}
          >
            <ArrowLeft />
          </Button>
        )}
        <Button
          className="flex gap-2"
          onClick={() => setFormIndex(formIndex + 1)}
          disabled={!enableNext}
        >
          Next <ArrowRight />
        </Button>
      </div>
      {/* Personal Details Form */}
      {formIndex === 0 && (
        <PersonalDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Education Detials */}
      {formIndex === 1 && (
        <EducationDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Internship Details */}
      {formIndex === 2 && (
        <InternshipDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}
    </div>
  );
};

export default FormSection;
