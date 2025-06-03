import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Star, FolderOpen, Award } from "lucide-react";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import SkillsForm from "@/components/resume/SkillsForm";
import EducationForm from "@/components/resume/EducationForm";
import ProjectsForm from "@/components/resume/ProjectsForm";
import CertificatesForm from "@/components/resume/CertificatesForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ATSScoreChecker from "@/components/resume/ATSScoreChecker";
import { ResumeData } from "@/components/resume/types";

const Index = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
      github: "",
      summary: ""
    },
    experience: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    education: [],
    projects: [],
    certificates: []
  });

  const sections = [
    { id: "personal", label: "Personal Info", icon: FileText },
    { id: "experience", label: "Experience", icon: Star },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Star },
    { id: "education", label: "Education", icon: Star },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "preview", label: "Preview", icon: Eye }
  ];

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleExportPDF = () => {
    // Switch to preview mode first
    setActiveSection("preview");
    
    // Wait for the component to render, then trigger print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleLivePreview = () => {
    setActiveSection("preview");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => updateResumeData("personalInfo", data)}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => updateResumeData("experience", data)}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => updateResumeData("projects", data)}
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => updateResumeData("skills", data)}
          />
        );
      case "education":
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => updateResumeData("education", data)}
          />
        );
      case "certificates":
        return (
          <CertificatesForm
            data={resumeData.certificates}
            onChange={(data) => updateResumeData("certificates", data)}
          />
        );
      case "preview":
        return <ResumePreview data={resumeData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ATS Resume Breaker</h1>
              <p className="text-gray-600 mt-1">Create a resume that beats tracking systems and impresses recruiters</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleExportPDF}
              >
                <Download className="w-4 h-4" />
                Export PDF
              </Button>
              <Button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleLivePreview}
              >
                <Eye className="w-4 h-4" />
                Live Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Resume Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
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

              {/* ATS Score */}
              <ATSScoreChecker data={resumeData} />
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {sections.find(s => s.id === activeSection)?.label}
                </h2>
                <p className="text-gray-600 mt-1">
                  {activeSection === "personal" && "Start with your basic information and professional summary"}
                  {activeSection === "experience" && "Add your work experience with quantified achievements"}
                  {activeSection === "projects" && "Showcase your key projects with technologies and impact"}
                  {activeSection === "skills" && "List your technical skills, soft skills, and languages"}
                  {activeSection === "education" && "Include your educational background and certifications"}
                  {activeSection === "certificates" && "Add your professional certifications and credentials"}
                  {activeSection === "preview" && "Review your complete resume before exporting"}
                </p>
              </div>

              {renderActiveSection()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
