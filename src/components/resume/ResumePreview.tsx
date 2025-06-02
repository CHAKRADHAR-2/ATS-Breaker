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

  const handleExportPDF = () => {
    window.print();
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

      {/* Resume Preview */}
      <Card className="p-8 bg-white max-w-4xl mx-auto print-area" style={{ fontSize: "12px", lineHeight: "1.4" }}>
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                {data.personalInfo.linkedin}
              </div>
            )}
            {data.personalInfo.portfolio && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {data.personalInfo.portfolio}
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{exp.location}</p>
                      <p>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                    {exp.achievements.filter(achievement => achievement.trim()).map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              KEY PROJECTS
            </h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {project.name}
                        {project.link && (
                          <ExternalLink className="w-3 h-3 text-gray-500" />
                        )}
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>
                        {formatDate(project.startDate)} - {project.current ? "Present" : formatDate(project.endDate)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 ml-2">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              SKILLS
            </h2>
            <div className="space-y-2">
              {data.skills.technical.length > 0 && (
                <div>
                  <span className="font-medium text-gray-900">Technical: </span>
                  <span className="text-gray-700">{data.skills.technical.join(", ")}</span>
                </div>
              )}
              {data.skills.soft.length > 0 && (
                <div>
                  <span className="font-medium text-gray-900">Soft Skills: </span>
                  <span className="text-gray-700">{data.skills.soft.join(", ")}</span>
                </div>
              )}
              {data.skills.languages.length > 0 && (
                <div>
                  <span className="font-medium text-gray-900">Languages: </span>
                  <span className="text-gray-700">{data.skills.languages.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certificates.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-3">
              {data.certificates.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Award className="w-3 h-3" />
                      {cert.name}
                      {cert.url && (
                        <ExternalLink className="w-3 h-3 text-gray-500" />
                      )}
                    </h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>Issued: {formatDate(cert.issueDate)}</p>
                    {cert.expiryDate && (
                      <p>Expires: {formatDate(cert.expiryDate)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    {formatDate(edu.graduation)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Enhanced Print styles to remove headers and footers */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              margin: 0.5in;
              size: A4;
            }
            
            body * {
              visibility: hidden;
            }
            
            .print-area, .print-area * {
              visibility: visible;
            }
            
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              background: white !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }

            /* Hide browser headers and footers */
            html, body {
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          }
          
          /* Additional CSS to ensure clean printing */
          @media print {
            .print-area {
              box-shadow: none !important;
              border: none !important;
            }
          }
        `
      }} />
    </div>
  );
};

export default ResumePreview;
