import React, { useContext, useState } from "react";
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
import SequenceDetailsForm from "./forms/SequenceDetailsForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const sections = [
  "Personal Details",
  "Education Details",
  "Internship Details",
  "Project Details",
  "Competition Details",
  "Award Details",
  "Skills Details",
  "Coursework Details",
  "POR Details",
  "Extra Curricular Details",
  "Sequence",
];

const FormSection = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formIndex, setFormIndex] = useState(0);
  const [enableNext, setEnableNext] = useState(true);
  return (
    <div>
      <div className="flex flex-row justify-between gap-2">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Form Section</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-10">
              <DropdownMenuLabel>Section</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={formIndex}
                onValueChange={(value) => setFormIndex(value)}
              >
                {sections.map((section, index) => {
                  return (
                    <DropdownMenuRadioItem value={index} key={index}>
                      {section}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-row gap-2">
          {formIndex > 0 && (
            <Button
              onClick={() => setFormIndex(formIndex - 1)}
              disabled={!enableNext}
            >
              <ArrowLeft />
            </Button>
          )}
          {formIndex < 10 ? (
            <Button
              className="flex gap-2"
              onClick={() => setFormIndex(formIndex + 1)}
              disabled={!enableNext}
            >
              Next <ArrowRight />
            </Button>
          ) : (
            <Button disabled={!enableNext}>
              <Link
                to={"/dashboard/resume/" + resumeInfo.resumeId + "/view"}
                disabled={!enableNext}
                className="flex fap-2 items-center"
              >
                Finish <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
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

      {/* Extra Curricular Details */}
      {formIndex === 9 && (
        <ExtraCurricularDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}

      {/* Sequence Details */}
      {formIndex === 10 && (
        <SequenceDetailsForm enableNext={(v) => setEnableNext(v)} />
      )}
    </div>
  );
};

export default FormSection;
