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

  const renderTwoColumnLayout = () => (
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
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
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
      <div className="grid grid-cols-2 gap-4">
        <div className="resume-section">
          <ResumeProjects projects={data.projects} />
        </div>
        <div className="space-y-3">
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
        fontSize: template.spacing === 'compact' ? '11px' : '12px',
        lineHeight: template.spacing === 'compact' ? '1.3' : '1.4'
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .template-${template.id} h2 {
            color: ${colors.primary} !important;
            border-bottom-color: ${colors.border} !important;
            font-size: ${template.spacing === 'compact' ? '13px' : '14px'} !important;
            margin-bottom: ${template.spacing === 'compact' ? '6px' : '8px'} !important;
          }
          .template-${template.id} h3 {
            color: ${colors.text} !important;
            font-size: ${template.spacing === 'compact' ? '12px' : '13px'} !important;
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
        <div className="resume-section" style={{ marginBottom: template.spacing === 'compact' ? '12px' : '16px' }}>
          <ResumeHeader personalInfo={data.personalInfo} />
        </div>
        {renderLayout()}
      </div>
    </div>
  );
};

export default TemplatedResumePreview;