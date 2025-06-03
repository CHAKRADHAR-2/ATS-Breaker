import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { ResumeData } from "./types";

interface ResumeHeaderProps {
  personalInfo: ResumeData["personalInfo"];
}

const ResumeHeader = ({ personalInfo }: ResumeHeaderProps) => {
  return (
    <div className="text-center border-b border-gray-200 pb-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {personalInfo.fullName || "Your Name"}
      </h1>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
        {personalInfo.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            {personalInfo.email}
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {personalInfo.phone}
          </div>
        )}
        {personalInfo.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {personalInfo.location}
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="w-3 h-3" />
            {personalInfo.linkedin}
          </div>
        )}
        {personalInfo.portfolio && (
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {personalInfo.portfolio}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeHeader;