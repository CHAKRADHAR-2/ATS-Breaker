import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResumeData } from "./types";
import ResumeHeader from "./ResumeHeader";
import ResumeSummary from "./ResumeSummary";
import ResumeExperience from "./ResumeExperience";
import ResumeProjects from "./ResumeProjects";
import ResumeSkills from "./ResumeSkills";
import ResumeCertifications from "./ResumeCertifications";
import ResumeEducation from "./ResumeEducation";
import ResumePrintStyles from "./ResumePrintStyles";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const handleExportPDF = () => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
          <p className="text-sm text-gray-600">This is how your resume will look to employers</p>
        </div>
        <Button onClick={handleExportPDF} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export as PDF
        </Button>
      </div>

      {/* Resume Preview */}
      <Card className="p-8 bg-white max-w-4xl mx-auto print-area" style={{ fontSize: "12px", lineHeight: "1.4" }}>
        <div className="resume-section">
          <ResumeHeader personalInfo={data.personalInfo} />
        </div>
        <div className="resume-section">
          <ResumeSummary summary={data.personalInfo.summary} />
        </div>
        <div className="resume-section">
          <ResumeExperience experience={data.experience} />
        </div>
        <div className="resume-section">
          <ResumeProjects projects={data.projects} />
        </div>
        <div className="resume-section">
          <ResumeSkills skills={data.skills} />
        </div>
        <div className="resume-section">
          <ResumeCertifications certificates={data.certificates} />
        </div>
        <div className="resume-section">
          <ResumeEducation education={data.education} />
        </div>
      </Card>

      <ResumePrintStyles />
    </div>
  );
};

export default ResumePreview;
