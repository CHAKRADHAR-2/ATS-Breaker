
import { ResumeData } from "./types";

// Utility function to convert new technical skills format to flat array for ATS checker
export const flattenTechnicalSkills = (technicalSkills: ResumeData["skills"]["technical"]): string[] => {
  // Handle case where technicalSkills might be undefined or in old format (flat array)
  if (!technicalSkills) {
    return [];
  }
  
  // If it's already a flat array (old format), return as is
  if (Array.isArray(technicalSkills)) {
    return technicalSkills;
  }
  
  // If it's the new object format, flatten it
  return [
    ...(technicalSkills.frontend || []),
    ...(technicalSkills.backend || []),
    ...(technicalSkills.databases || []),
    ...(technicalSkills.cloud || []),
    ...(technicalSkills.tools || []),
    ...(technicalSkills.other || [])
  ];
};

// Create resume data compatible with components expecting old format
export const createCompatibleResumeData = (resumeData: ResumeData): any => {
  return {
    ...resumeData,
    skills: {
      ...resumeData.skills,
      technical: flattenTechnicalSkills(resumeData.skills.technical)
    }
  };
};
