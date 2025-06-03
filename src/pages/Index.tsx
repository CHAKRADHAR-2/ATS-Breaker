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
    // First switch to preview mode if not already there
    if (activeSection !== "preview") {
      setActiveSection("preview");
    }
    
    // Wait for the component to render, then use the same export logic as ResumePreview
    setTimeout(() => {
      const resumeElement = document.querySelector('.print-area');
      
      if (resumeElement) {
        // Create a new window with complete control over the document
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title></title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                @page {
                  margin: 0.5in;
                  size: A4;
                  /* Remove headers and footers */
                  @top-left { content: ""; }
                  @top-center { content: ""; }
                  @top-right { content: ""; }
                  @bottom-left { content: ""; }
                  @bottom-center { content: ""; }
                  @bottom-right { content: ""; }
                }
                
                /* Hide all browser UI elements */
                @media print {
                  html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background: white !important;
                    color: black !important;
                    font-family: system-ui, -apple-system, sans-serif !important;
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                  }
                  
                  /* Remove any browser-generated content */
                  * {
                    box-sizing: border-box !important;
                  }
                  
                  /* Ensure no page breaks in sections */
                  .resume-section {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                  }
                }
                
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  margin: 0;
                  padding: 0;
                  background: white;
                  color: black;
                  font-size: 12px;
                  line-height: 1.4;
                  width: 100%;
                  height: auto;
                }
                
                * {
                  box-sizing: border-box;
                }
                
                .resume-section {
                  page-break-inside: avoid;
                  break-inside: avoid;
                }
                
                h1 {
                  font-size: 18px;
                  font-weight: bold;
                  margin: 0 0 8px 0;
                }
                
                h2 {
                  font-size: 14px;
                  font-weight: 600;
                  margin: 16px 0 8px 0;
                  border-bottom: 1px solid #e5e5e5;
                  padding-bottom: 4px;
                }
                
                h3 {
                  font-size: 13px;
                  font-weight: 600;
                  margin: 8px 0 4px 0;
                }
                
                p, li {
                  margin: 4px 0;
                }
                
                ul {
                  margin: 0;
                  padding-left: 16px;
                }
                
                .text-center { text-align: center; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                .items-start { align-items: flex-start; }
                .gap-1 { gap: 4px; }
                .gap-2 { gap: 8px; }
                .gap-4 { gap: 16px; }
                .mb-2 { margin-bottom: 8px; }
                .mb-3 { margin-bottom: 12px; }
                .mb-6 { margin-bottom: 24px; }
                .pb-1 { padding-bottom: 4px; }
                .pb-6 { padding-bottom: 24px; }
                .ml-2 { margin-left: 8px; }
                .space-y-1 > * + * { margin-top: 4px; }
                .space-y-2 > * + * { margin-top: 8px; }
                .space-y-3 > * + * { margin-top: 12px; }
                .space-y-4 > * + * { margin-top: 16px; }
                .border-b { border-bottom: 1px solid #e5e5e5; }
                .text-sm { font-size: 11px; }
                .text-xs { font-size: 10px; }
                .font-semibold { font-weight: 600; }
                .font-medium { font-weight: 500; }
                .text-gray-600 { color: #666; }
                .text-gray-700 { color: #555; }
                .text-gray-900 { color: #000; }
                .bg-gray-100 { background-color: #f5f5f5; }
                .px-2 { padding-left: 8px; padding-right: 8px; }
                .py-1 { padding-top: 4px; padding-bottom: 4px; }
                .rounded { border-radius: 4px; }
                .flex-wrap { flex-wrap: wrap; }
                .justify-center { justify-content: center; }
                .text-right { text-align: right; }
                .leading-relaxed { line-height: 1.6; }
                .list-disc { list-style-type: disc; }
                .list-inside { list-style-position: inside; }
                
                .w-3 { width: 12px; }
                .h-3 { height: 12px; }
                
                svg {
                  display: inline-block;
                  vertical-align: middle;
                }

                a {
                  color: inherit;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              ${resumeElement.innerHTML}
              <script>
                // Wait for content to load, then print with no headers/footers
                window.onload = function() {
                  setTimeout(function() {
                    // Try to print without headers/footers
                    window.print();
                    // Close the window after printing
                    setTimeout(function() {
                      window.close();
                    }, 100);
                  }, 100);
                };
              </script>
            </body>
            </html>
          `);
          
          printWindow.document.close();
          printWindow.focus();
        }
      } else {
        // Fallback to regular print
        window.print();
      }
    }, 200);
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
