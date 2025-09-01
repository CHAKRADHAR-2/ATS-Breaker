
import { ResumeData } from "./types";
import { formatDate } from "./utils";

interface ResumeEducationProps {
  education: ResumeData["education"];
}

const ResumeEducation = ({ education }: ResumeEducationProps) => {
  if (education.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        EDUCATION
      </h2>
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">
                {edu.degree} in {edu.field}
              </h3>
              <p className="text-gray-700">{edu.institution}</p>
              {(edu.gpa || edu.percentage) && (
                <div className="text-gray-600 text-sm">
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  {edu.gpa && edu.percentage && <span> | </span>}
                  {edu.percentage && <span>Percentage: {edu.percentage}</span>}
                </div>
              )}
            </div>
            <div className="text-right text-sm text-gray-600">
              {formatDate(edu.graduation)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeEducation;
