
import { Card } from "@/components/ui/card";
import { FileText, Eye, Star, FolderOpen, Award } from "lucide-react";
import ATSScoreChecker from "@/components/resume/ATSScoreChecker";
import { ResumeData } from "@/components/resume/types";
import { createCompatibleResumeData } from "@/components/resume/skillsUtils";

interface SidebarNavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  resumeData: ResumeData;
}

const sections = [
  { id: "personal", label: "Personal Info", icon: FileText },
  { id: "experience", label: "Experience", icon: Star },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Star },
  { id: "education", label: "Education", icon: Star },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "template", label: "Template", icon: Eye },
  { id: "preview", label: "Preview", icon: Eye }
];

const SidebarNavigation = ({ activeSection, onSectionChange, resumeData }: SidebarNavigationProps) => {
  const compatibleResumeData = createCompatibleResumeData(resumeData);

  return (
    <Card className="p-6 sticky top-8">
      <h3 className="font-semibold text-gray-900 mb-4">Resume Sections</h3>
      <nav className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </nav>

      <ATSScoreChecker data={compatibleResumeData} />
    </Card>
  );
};

export default SidebarNavigation;
