import React, { useState } from "react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EducationDetailsForm from "./forms/EducationDetailsForm";
import InternshipDetailsForm from "./forms/InternshipDetailsForm";
import ProjectDetailsForm from "./forms/ProjectDetailsForm";
import CompetitionDetailsForm from "./forms/CompetitionDetailsForm";
import AwardsDetailsForm from "./forms/AwardsDetailsForm";
import ExtraCurricularDetailsForm from "./forms/ExtraCurriculurDetailsForm";
import SkillsDetailsForm from "./forms/SkillsDetailsForm";
import CourseworkDetailsForm from "./forms/CourseworkDetailsForm";
import PORDetailsForm from "./forms/PORDetailsForm";

const FormSection = () => {
  const [formIndex, setFormIndex] = useState(4);
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

      {/* Project Details */}
      {formIndex === 3 && (
        <ProjectDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Competition Details */}
      {formIndex === 4 && (
        <CompetitionDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Awards Details */}
      {formIndex === 5 && (
        <AwardsDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Skills Details */}
      {formIndex === 6 && (
        <SkillsDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Coursework Details */}
      {formIndex === 7 && (
        <CourseworkDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Coursework Details */}
      {formIndex === 8 && (
        <PORDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/*  Details */}
      {formIndex === 9 && (
        <ExtraCurricularDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}
    </div>
  );
};

export default FormSection;
