
import { Card } from "@/components/ui/card";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import SkillsForm from "@/components/resume/SkillsForm";
import EducationForm from "@/components/resume/EducationForm";
import ProjectsForm from "@/components/resume/ProjectsForm";
import CertificatesForm from "@/components/resume/CertificatesForm";
import ResumePreview from "@/components/resume/ResumePreview";
import TemplateSelector from "@/components/resume/templates/TemplateSelector";
import { ResumeData } from "@/components/resume/types";

interface MainContentProps {
  activeSection: string;
  resumeData: ResumeData;
  selectedTemplate: string;
  onResumeDataUpdate: (section: keyof ResumeData, data: any) => void;
  onTemplateSelect: (templateId: string) => void;
}

const sections = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "template", label: "Template" },
  { id: "preview", label: "Preview" }
];

const getSectionDescription = (sectionId: string) => {
  const descriptions = {
    personal: "Start with your basic information and professional summary",
    experience: "Add your work experience with quantified achievements",
    projects: "Showcase your key projects with technologies and impact",
    skills: "List your technical skills, soft skills, and languages",
    education: "Include your educational background and certifications",
    certificates: "Add your professional certifications and credentials",
    template: "Choose from 10 professional templates designed to fit on one page",
    preview: "Review your complete resume before exporting"
  };
  return descriptions[sectionId as keyof typeof descriptions] || "";
};

const MainContent = ({ 
  activeSection, 
  resumeData, 
  selectedTemplate, 
  onResumeDataUpdate, 
  onTemplateSelect 
}: MainContentProps) => {
  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => onResumeDataUpdate("personalInfo", data)}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => onResumeDataUpdate("experience", data)}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => onResumeDataUpdate("projects", data)}
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => onResumeDataUpdate("skills", data)}
          />
        );
      case "education":
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => onResumeDataUpdate("education", data)}
          />
        );
      case "certificates":
        return (
          <CertificatesForm
            data={resumeData.certificates}
            onChange={(data) => onResumeDataUpdate("certificates", data)}
          />
        );
      case "template":
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={onTemplateSelect}
            hasPhoto={resumeData.personalInfo.includePhoto && !!resumeData.personalInfo.photo}
          />
        );
      case "preview":
        return <ResumePreview data={resumeData} selectedTemplate={selectedTemplate} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {sections.find(s => s.id === activeSection)?.label}
        </h2>
        <p className="text-gray-600 mt-1">
          {getSectionDescription(activeSection)}
        </p>
      </div>

      {renderActiveSection()}
    </Card>
  );
};

export default MainContent;
