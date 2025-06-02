// ResumePreview.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Award } from "lucide-react";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduation: string;
    gpa?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  certificates: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
  }>;
}

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  // ✅ Updated print function
  const handleExportPDF = () => {
    const resumeElement = document.querySelector(".print-area") as HTMLElement;

    if (!resumeElement) return;

    const printWindow = window.open("", "_blank", "width=1024,height=768");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Resume - ${data.personalInfo.fullName}</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              @page {
                margin: 0.5in;
                size: A4;
              }

              body {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
              }

              .print-area {
                box-shadow: none !important;
                border: none !important;
                width: 100%;
                margin: 0 auto;
                padding: 20px;
                font-size: 12px;
                line-height: 1.4;
              }
            </style>
          </head>
          <body>
            <div class="print-area">${resumeElement.innerHTML}</div>
            <script>
              window.onload = function () {
                window.print();
                window.onafterprint = function () {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
          <p className="text-sm text-gray-600">This is how your resume will look to employers</p>
        </div>
        <Button onClick={handleExportPDF} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export as PDF
        </Button>
      </div>

      {/* Your entire resume preview content remains unchanged */}
      {/* Resume content below */}
      <Card className="p-8 bg-white max-w-4xl mx-auto print-area" style={{ fontSize: "12px", lineHeight: "1.4" }}>
        {/* ... all sections like Header, Summary, Experience, Skills, etc. ... */}
        {/* No changes here, just reuse what you've already written */}
      </Card>
    </div>
  );
};

export default ResumePreview;
