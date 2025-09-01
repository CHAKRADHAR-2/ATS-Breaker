
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
import { ResumeData } from "./types";
import { Template } from "./templates/types";

interface ResumeHeaderProps {
  personalInfo: ResumeData["personalInfo"];
  template?: Template;
}

const ResumeHeader = ({ personalInfo, template }: ResumeHeaderProps) => {
  console.log('=== ResumeHeader Debug ===');
  console.log('personalInfo.photo:', personalInfo.photo ? `YES (${personalInfo.photo.length} chars)` : 'NO');
  console.log('personalInfo.includePhoto:', personalInfo.includePhoto);
  console.log('personalInfo.photoSize:', personalInfo.photoSize);
  console.log('template?.id:', template?.id);
  console.log('template?.headerStyle:', template?.headerStyle);
  
  const hasPhoto = personalInfo.photo && personalInfo.includePhoto;
  console.log('hasPhoto calculated as:', hasPhoto);
  console.log('========================');

  const getPhotoStyles = () => {    
    const sizeClasses = {
      small: "w-16 h-16",
      medium: "w-20 h-20", 
      large: "w-28 h-28",
      xlarge: "w-32 h-32",
      xxlarge: "w-40 h-40"
    };
    
    const styleClasses = {
      circular: "rounded-full",
      rounded: "rounded-lg",
      square: "rounded-none"
    };
    
    // Adjust photo size based on template and user preference
    let size = personalInfo.photoSize || 'medium';
    
    // Override size for compact templates to ensure single page fit
    if (template?.spacing === 'compact') {
      size = personalInfo.photoSize === 'xxlarge' ? 'large' : 
             personalInfo.photoSize === 'xlarge' ? 'medium' : 
             personalInfo.photoSize || 'small';
    }
    
    // Adjust for specific template layouts
    if (template?.sectionLayout === 'two-column' && template?.spacing === 'compact') {
      size = 'small'; // Force small for compact two-column
    }
    const style = template?.photoStyle || 'circular';
    
    return `${sizeClasses[size]} ${styleClasses[style]} object-cover border-2 border-gray-200`;
  };
  
  const getHeaderFontSizes = () => {
    const photoSize = personalInfo.photoSize || 'medium';
    const isCompact = template?.spacing === 'compact';
    
    if (isCompact) {
      switch (photoSize) {
        case 'small':
          return { name: 'text-lg', contact: 'text-xs' };
        case 'medium':
          return { name: 'text-base', contact: 'text-xs' };
        case 'large':
        case 'xlarge':
        case 'xxlarge':
          return { name: 'text-sm', contact: 'text-xs' };
        default:
          return { name: 'text-base', contact: 'text-xs' };
      }
    } else {
      // Normal templates - larger fonts
      switch (photoSize) {
        case 'small':
          return { name: 'text-2xl', contact: 'text-sm' };
        case 'medium':
          return { name: 'text-xl', contact: 'text-sm' };
        case 'large':
        case 'xlarge':
        case 'xxlarge':
          return { name: 'text-lg', contact: 'text-sm' };
        default:
          return { name: 'text-2xl', contact: 'text-sm' };
      }
    }
  };

  // Handle different photo layouts based on template
  // Show photo if user has uploaded one and enabled it, regardless of template support
  const isHeaderWithPhoto = hasPhoto && template?.headerStyle === 'two-column';
  const isCenteredWithPhoto = hasPhoto && (template?.headerStyle === 'centered' || template?.headerStyle === 'minimal' || !template?.headerStyle);
  const isLeftAlignedWithPhoto = hasPhoto && template?.headerStyle === 'left-aligned' && template?.sectionLayout !== 'two-column';
  const isSidebarWithPhoto = hasPhoto && template?.id === 'creative-photo-sidebar';

  // Two-column header with photo (executive-photo-large)
  if (isHeaderWithPhoto) {
    return (
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start gap-6">
          {/* Photo */}
          <div className="flex-shrink-0 mr-6" data-resume-photo>
            <img
              src={personalInfo.photo}
              alt="Profile"
              className={getPhotoStyles()}
            />
          </div>
          
          {/* Header Content */}
          <div className="flex-1">
            <h1 className={`${getHeaderFontSizes().name} font-bold text-gray-900 mb-2`}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            
            <div className={`flex flex-wrap gap-4 ${getHeaderFontSizes().contact} text-gray-600`}>
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-600">
                    {personalInfo.email}
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-600">
                    {personalInfo.phone}
                  </a>
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
                  <a 
                    href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {personalInfo.linkedin}
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  <a 
                    href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {personalInfo.github}
                  </a>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <a 
                    href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {personalInfo.portfolio}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Left-aligned header with photo (modern-photo-compact)
  if (isLeftAlignedWithPhoto) {
    return (
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start gap-4">
          {/* Photo */}
          <div className="flex-shrink-0 mr-4" data-resume-photo>
            <img
              src={personalInfo.photo}
              alt="Profile"
              className={getPhotoStyles()}
            />
          </div>
          
          {/* Header Content */}
          <div className="flex-1">
            <h1 className={`${getHeaderFontSizes().name} font-bold text-gray-900 mb-1`}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            
            <div className={`flex flex-wrap gap-3 ${getHeaderFontSizes().contact} text-gray-600`}>
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-600">
                    {personalInfo.email}
                  </a>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-600">
                    {personalInfo.phone}
                  </a>
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
                  <a 
                    href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {personalInfo.linkedin}
                  </a>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  <a 
                    href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {personalInfo.github}
                  </a>
                </div>
              )}
              {personalInfo.portfolio && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <a 
                    href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {personalInfo.portfolio}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Centered header (default) - with or without photo
  return (
    <div className="text-center border-b border-gray-200 pb-6 mb-6">
      {/* Photo in centered layouts */}
      {isCenteredWithPhoto && (
        <div className="mb-4 flex justify-center" data-resume-photo>
          <img
            src={personalInfo.photo}
            alt="Profile"
            className={getPhotoStyles()}
          />
        </div>
      )}
      
      <h1 className={`${getHeaderFontSizes().name} font-bold text-gray-900 mb-2`}>
        {personalInfo.fullName || "Your Name"}
      </h1>
      
      <div className={`flex flex-wrap justify-center gap-4 ${getHeaderFontSizes().contact} text-gray-600`}>
        {personalInfo.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-600">
              {personalInfo.email}
            </a>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-600">
              {personalInfo.phone}
            </a>
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
            <a 
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {personalInfo.linkedin}
            </a>
          </div>
        )}
        {personalInfo.github && (
          <div className="flex items-center gap-1">
            <Github className="w-3 h-3" />
            <a 
              href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {personalInfo.github}
            </a>
          </div>
        )}
        {personalInfo.portfolio && (
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            <a 
              href={personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              {personalInfo.portfolio}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeHeader;
