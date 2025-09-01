
import { ResumeData } from "./types";
import { formatDate } from "./utils";

interface ResumeExperienceProps {
  experience: ResumeData["experience"];
}

const ResumeExperience = ({ experience }: ResumeExperienceProps) => {
  if (experience.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        PROFESSIONAL EXPERIENCE
      </h2>
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 font-medium">{exp.company}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>{exp.location}</p>
                <p>
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </p>
              </div>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
              {exp.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeExperience;
