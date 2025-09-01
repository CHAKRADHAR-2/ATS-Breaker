
import { ExternalLink } from "lucide-react";
import { ResumeData } from "./types";
import { formatDate } from "./utils";

interface ResumeProjectsProps {
  projects: ResumeData["projects"];
}

const ResumeProjects = ({ projects }: ResumeProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        KEY PROJECTS
      </h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {project.link ? (
                    <a 
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 flex items-center gap-1"
                    >
                      {project.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    project.name
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
  );
};

export default ResumeProjects;
