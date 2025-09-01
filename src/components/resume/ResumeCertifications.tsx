
import { Award, ExternalLink } from "lucide-react";
import { ResumeData } from "./types";
import { formatDate } from "./utils";

interface ResumeCertificationsProps {
  certificates: ResumeData["certificates"];
}

const ResumeCertifications = ({ certificates }: ResumeCertificationsProps) => {
  if (certificates.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        CERTIFICATIONS
      </h2>
      <div className="space-y-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Award className="w-3 h-3" />
                {cert.url ? (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 flex items-center gap-1"
                  >
                    {cert.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  cert.name
                )}
              </h3>
              <p className="text-gray-700">{cert.issuer}</p>
              {cert.credentialId && (
                <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>
              )}
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Issued: {formatDate(cert.issueDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeCertifications;
