
import { useState } from "react";
import AppHeader from "@/components/layout/AppHeader";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import MainContent from "@/components/layout/MainContent";
import { useResumeData } from "@/hooks/useResumeData";
import { handlePDFExport } from "@/utils/pdfExport";

const Index = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern-gray");
  const { resumeData, updateResumeData } = useResumeData();

  const handleExportPDF = () => {
    handlePDFExport(activeSection, setActiveSection);
  };

  const handleLivePreview = () => {
    setActiveSection("preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AppHeader 
        onExportPDF={handleExportPDF}
        onLivePreview={handleLivePreview}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <SidebarNavigation
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              resumeData={resumeData}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <MainContent
              activeSection={activeSection}
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              onResumeDataUpdate={updateResumeData}
              onTemplateSelect={setSelectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
