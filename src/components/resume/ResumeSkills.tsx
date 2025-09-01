
import { ResumeData } from "./types";

interface ResumeSkillsProps {
  skills: ResumeData["skills"];
}

const ResumeSkills = ({ skills }: ResumeSkillsProps) => {
  const hasAnyTechnicalSkills = Object.values(skills.technical).some(categorySkills => categorySkills.length > 0);
  const hasSkills = hasAnyTechnicalSkills || skills.soft.length > 0 || skills.languages.length > 0;
  
  if (!hasSkills) return null;

  const technicalCategories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'databases', label: 'Databases' },
    { key: 'cloud', label: 'Cloud & DevOps' },
    { key: 'tools', label: 'Tools & Frameworks' },
    { key: 'other', label: 'Other Technologies' }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        SKILLS
      </h2>
      <div className="space-y-2">
        {/* Technical Skills - organized by category */}
        {hasAnyTechnicalSkills && (
          <div className="space-y-1">
            {technicalCategories.map(({ key, label }) => {
              const categorySkills = skills.technical[key as keyof typeof skills.technical];
              if (categorySkills.length === 0) return null;
              
              return (
                <div key={key}>
                  <span className="font-medium text-gray-900">{label}: </span>
                  <span className="text-gray-700">{categorySkills.join(", ")}</span>
                </div>
              );
            })}
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
