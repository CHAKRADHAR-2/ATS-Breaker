
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
      current: false
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      const project = data.find(p => p.id === projectId);
      if (project && !project.technologies.includes(tech)) {
        updateProject(projectId, 'technologies', [...project.technologies, tech]);
        setNewTech(prev => ({ ...prev, [projectId]: '' }));
      }
    }
  };

  const removeTechnology = (projectId: string, tech: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(t => t !== tech));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-600">Showcase your key projects and technical achievements</p>
        </div>
        <Button onClick={addProject} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <Button onClick={addProject} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Project
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {data.map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-900">Project Details</h4>
                <Button
                  onClick={() => removeProject(project.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`project-name-${project.id}`}>Project Name *</Label>
                  <Input
                    id={`project-name-${project.id}`}
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Website"
                  />
                </div>

                <div>
                  <Label htmlFor={`project-link-${project.id}`}>Project Link</Label>
                  <div className="relative">
                    <Input
                      id={`project-link-${project.id}`}
                      value={project.link}
                      onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="pr-10"
                    />
                    {project.link && (
                      <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`project-start-${project.id}`}>Start Date</Label>
                  <Input
                    id={`project-start-${project.id}`}
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`project-end-${project.id}`}>End Date</Label>
                  <div className="space-y-2">
                    <Input
                      id={`project-end-${project.id}`}
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                      disabled={project.current}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`project-current-${project.id}`}
                        checked={project.current}
                        onChange={(e) => updateProject(project.id, 'current', e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`project-current-${project.id}`} className="text-sm">
                        Currently working on this project
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor={`project-description-${project.id}`}>Description *</Label>
                <textarea
                  id={`project-description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Developed a full-stack e-commerce platform with user authentication, payment integration, and inventory management. Achieved 40% faster load times and 25% increase in user engagement."
                />
              </div>

              <div className="mt-4">
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        onClick={() => removeTechnology(project.id, tech)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTech[project.id] || ''}
                    onChange={(e) => setNewTech(prev => ({ ...prev, [project.id]: e.target.value }))}
                    placeholder="Add technology (e.g., React, Node.js)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology(project.id);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addTechnology(project.id)}
                    variant="outline"
                    size="sm"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
