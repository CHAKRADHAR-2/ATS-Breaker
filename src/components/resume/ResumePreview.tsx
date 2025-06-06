import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ResumeData } from "./types";
import { templates } from "./templates/templateDefinitions";
import TemplatedResumePreview from "./templates/TemplatedResumePreview";

interface ResumePreviewProps {
  data: ResumeData;
  selectedTemplate?: string;
}

const ResumePreview = ({ data, selectedTemplate = "modern-blue" }: ResumePreviewProps) => {
  const template = templates.find(t => t.id === selectedTemplate) || templates[0];

  const handleExportPDF = () => {
    const resumeElement = document.querySelector('.print-area');
    
    if (resumeElement) {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Resume</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              @page {
                margin: 0.5in;
                size: A4;
                @top-left { content: ""; }
                @top-center { content: ""; }
                @top-right { content: ""; }
                @bottom-left { content: ""; }
                @bottom-center { content: ""; }
                @bottom-right { content: ""; }
              }
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              html, body {
                font-family: system-ui, -apple-system, sans-serif;
                background: white;
                color: black;
                font-size: 12px;
                line-height: 1.4;
                width: 100%;
                height: auto;
              }
              
              .resume-section {
                page-break-inside: avoid;
                break-inside: avoid;
                margin-bottom: 16px;
              }
              
              h1 { font-size: 18px; font-weight: bold; margin: 0 0 8px 0; }
              h2 { font-size: 14px; font-weight: 600; margin: 16px 0 8px 0; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px; }
              h3 { font-size: 13px; font-weight: 600; margin: 8px 0 4px 0; }
              p, li { margin: 4px 0; }
              ul { margin: 0; padding-left: 16px; }
              
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
              .border-gray-200 { border-color: #e5e5e5; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
              .col-span-2 { grid-column: span 2 / span 2; }
              
              .w-3 { width: 12px; }
              .h-3 { height: 12px; }
              
              svg {
                display: inline-block;
                vertical-align: middle;
                width: 12px;
                height: 12px;
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
              window.onload = function() {
                setTimeout(function() {
                  window.print();
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
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between no-print">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
          <p className="text-sm text-gray-600">
            Using template: <span className="font-medium">{template.name}</span> - This is how your resume will look to employers
          </p>
        </div>
        <Button 
          onClick={handleExportPDF} 
          className="flex items-center gap-2"
          data-export="pdf"
        >
          <Download className="w-4 h-4" />
          Export as PDF
        </Button>
      </div>

      {/* Resume Preview with Template - Fixed container */}
      <Card className="p-6 bg-white max-w-4xl mx-auto print-area overflow-hidden" 
            style={{ 
              fontSize: "12px", 
              lineHeight: "1.4", 
              width: "8.5in",
              minHeight: "11in", 
              maxHeight: "11in",
              pageBreakAfter: "always"
            }}>
        <div className="w-full h-full overflow-hidden">
          <TemplatedResumePreview data={data} template={template} />
        </div>
      </Card>
    </div>
  );
};

export default ResumePreview;
