
import { ResumeData } from "../types";
import { Template } from './types';
import { getColorScheme } from './templateDefinitions';
import ResumeHeader from "../ResumeHeader";
import ResumeSummary from "../ResumeSummary";
import ResumeExperience from "../ResumeExperience";
import ResumeProjects from "../ResumeProjects";
import ResumeSkills from "../ResumeSkills";
import ResumeCertifications from "../ResumeCertifications";
import ResumeEducation from "../ResumeEducation";

interface TemplatedResumePreviewProps {
  data: ResumeData;
  template: Template;
}

const TemplatedResumePreview = ({ data, template }: TemplatedResumePreviewProps) => {
  const colors = getColorScheme(template.colorScheme);
  
  const getSpacingClass = () => {
    switch (template.spacing) {
      case 'compact': return 'space-y-3';
      case 'relaxed': return 'space-y-6';
      default: return 'space-y-4';
    }
  };

  const getFontClass = () => {
    switch (template.fontStyle) {
      case 'classic': return 'font-serif';
      case 'elegant': return 'font-light';
      case 'minimal': return 'font-extralight';
      default: return 'font-sans';
    }
  };

  const getSectionSpacing = () => {
    switch (template.spacing) {
      case 'compact': return 'mb-3';
      case 'relaxed': return 'mb-8';
      default: return 'mb-6';
    }
  };

  const renderTwoColumnLayout = () => {
    const hasPhoto = data.personalInfo.photo && data.personalInfo.includePhoto;
    const isPhotoSidebar = (template.id === 'compact-photo-sidebar' || template.id === 'normal-photo-creative') && hasPhoto;
    
    return (
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="resume-section">
            <ResumeSummary summary={data.personalInfo.summary} />
          </div>
          <div className="resume-section">
            <ResumeExperience experience={data.experience} />
          </div>
          <div className="resume-section">
            <ResumeProjects projects={data.projects} />
          </div>
        </div>
        <div className="space-y-4">
          {/* Photo in sidebar for creative-photo-sidebar template */}
          {isPhotoSidebar && (
            <div className="resume-section" data-resume-photo>
              <div className="flex justify-center mb-4">
                <img
                  src={data.personalInfo.photo}
                  alt="Profile"
                  className={`${template.spacing === 'compact' ? 'w-12 h-12' : data.personalInfo.photoSize === 'small' ? 'w-16 h-16' : data.personalInfo.photoSize === 'medium' ? 'w-20 h-20' : data.personalInfo.photoSize === 'large' ? 'w-28 h-28' : data.personalInfo.photoSize === 'xlarge' ? 'w-32 h-32' : data.personalInfo.photoSize === 'xxlarge' ? 'w-40 h-40' : 'w-20 h-20'} ${template.photoStyle === 'circular' ? 'rounded-full' : template.photoStyle === 'square' ? 'rounded-none' : 'rounded-lg'} object-cover border-2 border-gray-200`}
                />
              </div>
            </div>
          )}
          <div className="resume-section">
            <ResumeSkills skills={data.skills} />
          </div>
          <div className="resume-section">
            <ResumeEducation education={data.education} />
          </div>
          <div className="resume-section">
            <ResumeCertifications certificates={data.certificates} />
          </div>
        </div>
      </div>
    );
  };

  const renderSingleColumnLayout = () => (
    <div className={getSpacingClass()}>
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
        <ResumeEducation education={data.education} />
      </div>
      <div className="resume-section">
        <ResumeCertifications certificates={data.certificates} />
      </div>
    </div>
  );

  const renderCompactLayout = () => (
    <div className="space-y-1">
      <div className="grid grid-cols-2 gap-2">
        <div className="resume-section">
          <ResumeSummary summary={data.personalInfo.summary} />
        </div>
        <div className="resume-section">
          <ResumeSkills skills={data.skills} />
        </div>
      </div>
      <div className="resume-section">
        <ResumeExperience experience={data.experience} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="resume-section">
          <ResumeProjects projects={data.projects} />
        </div>
        <div className="space-y-1">
          <div className="resume-section">
            <ResumeEducation education={data.education} />
          </div>
          <div className="resume-section">
            <ResumeCertifications certificates={data.certificates} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayout = () => {
    switch (template.sectionLayout) {
      case 'two-column': return renderTwoColumnLayout();
      case 'compact': return renderCompactLayout();
      default: return renderSingleColumnLayout();
    }
  };

  return (
    <div 
      className={`${getFontClass()} text-xs leading-tight`}
      style={{ 
        color: colors.text,
        fontSize: template.id === 'two-column-gray' ? '10px' : template.spacing === 'compact' ? '10px' : '12px',
        lineHeight: template.id === 'two-column-gray' ? '1.3' : template.spacing === 'compact' ? '1.2' : '1.4'
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .template-${template.id} h2 {
            color: ${colors.primary} !important;
            border-bottom-color: ${colors.border} !important;
            font-size: ${template.id === 'two-column-gray' ? '12px' : template.spacing === 'compact' ? '11px' : '14px'} !important;
            margin-bottom: ${template.id === 'two-column-gray' ? '4px' : template.spacing === 'compact' ? '4px' : '8px'} !important;
            margin-top: ${template.id === 'two-column-gray' ? '8px' : template.spacing === 'compact' ? '8px' : '16px'} !important;
            padding-bottom: ${template.id === 'two-column-gray' ? '2px' : '4px'} !important;
          }
          .template-${template.id} h3 {
            color: ${colors.text} !important;
            font-size: ${template.id === 'two-column-gray' ? '11px' : template.spacing === 'compact' ? '10px' : '13px'} !important;
            margin-bottom: ${template.id === 'two-column-gray' ? '2px' : template.spacing === 'compact' ? '2px' : '4px'} !important;
            margin-top: ${template.id === 'two-column-gray' ? '6px' : '8px'} !important;
          }
          .template-${template.id} p, .template-${template.id} li {
            margin: ${template.id === 'two-column-gray' ? '1px 0' : template.spacing === 'compact' ? '1px 0' : '4px 0'} !important;
            font-size: ${template.id === 'two-column-gray' ? '10px' : template.spacing === 'compact' ? '9px' : '12px'} !important;
            line-height: ${template.id === 'two-column-gray' ? '1.3' : '1.4'} !important;
          }
          .template-${template.id} .text-blue-600 {
            color: ${colors.primary} !important;
          }
          .template-${template.id} .border-gray-200 {
            border-color: ${colors.border} !important;
          }
          .template-${template.id} .bg-gray-100 {
            background-color: ${colors.secondary} !important;
          }
        `
      }} />
      
      <div className={`template-${template.id}`}>
        {/* Render ResumeHeader - special handling for creative-photo-sidebar */}
        <div className="resume-section" style={{ marginBottom: template.spacing === 'compact' ? '6px' : '16px' }}>
          {(template.id === 'compact-photo-sidebar' || template.id === 'normal-photo-creative') && data.personalInfo.photo && data.personalInfo.includePhoto ? (
            // For creative-photo-sidebar with photo, render header without photo (photo goes in sidebar)
            <ResumeHeader personalInfo={{...data.personalInfo, photo: undefined, includePhoto: false}} template={template} />
          ) : (
            // For all other templates, render header normally
            <ResumeHeader personalInfo={data.personalInfo} template={template} />
          )}
        </div>
        {renderLayout()}
      </div>
    </div>
  );
};

export default TemplatedResumePreview;
