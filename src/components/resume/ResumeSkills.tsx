import { ResumeData } from "./types";

interface ResumeSkillsProps {
  skills: ResumeData["skills"];
}

const ResumeSkills = ({ skills }: ResumeSkillsProps) => {
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;
  
  if (!hasSkills) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        SKILLS
      </h2>
      <div className="space-y-2">
        {skills.technical.length > 0 && (
          <div>
            <span className="font-medium text-gray-900">Technical: </span>
            <span className="text-gray-700">{skills.technical.join(", ")}</span>
          </div>
        )}
        {skills.soft.length > 0 && (
          <div>
            <span className="font-medium text-gray-900">Soft Skills: </span>
            <span className="text-gray-700">{skills.soft.join(", ")}</span>
          </div>
        )}
        {skills.languages.length > 0 && (
          <div>
            <span className="font-medium text-gray-900">Languages: </span>
            <span className="text-gray-700">{skills.languages.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSkills;