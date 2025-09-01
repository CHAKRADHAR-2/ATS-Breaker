
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Code, Users, Globe, Monitor, Server, Database, Cloud, Wrench } from "lucide-react";

interface TechnicalSkills {
  frontend: string[];
  backend: string[];
  databases: string[];
  cloud: string[];
  tools: string[];
  other: string[];
}

interface Skills {
  technical: TechnicalSkills;
  soft: string[];
  languages: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState({
    frontend: "",
    backend: "",
    databases: "",
    cloud: "",
    tools: "",
    other: "",
    soft: "",
    languages: ""
  });

  const addTechnicalSkill = (category: keyof TechnicalSkills, skill: string) => {
    if (skill.trim() && !data.technical[category].includes(skill.trim())) {
      onChange({
        ...data,
        technical: {
          ...data.technical,
          [category]: [...data.technical[category], skill.trim()]
        }
      });
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeTechnicalSkill = (category: keyof TechnicalSkills, skillToRemove: string) => {
    onChange({
      ...data,
      technical: {
        ...data.technical,
        [category]: data.technical[category].filter(skill => skill !== skillToRemove)
      }
    });
  };

  const addSkill = (category: 'soft' | 'languages', skill: string) => {
    if (skill.trim() && !data[category].includes(skill.trim())) {
      onChange({
        ...data,
        [category]: [...data[category], skill.trim()]
      });
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeSkill = (category: 'soft' | 'languages', skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof typeof newSkill) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (['soft', 'languages'].includes(category)) {
        addSkill(category as 'soft' | 'languages', newSkill[category]);
      } else {
        addTechnicalSkill(category as keyof TechnicalSkills, newSkill[category]);
      }
    }
  };

  const technicalCategories = [
    {
      key: "frontend" as keyof TechnicalSkills,
      title: "Frontend",
      icon: Monitor,
      placeholder: "e.g., React, Vue.js, Angular, HTML, CSS",
      suggestions: ["React", "Vue.js", "Angular", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      key: "backend" as keyof TechnicalSkills,
      title: "Backend",
      icon: Server,
      placeholder: "e.g., Node.js, Python, Java, .NET",
      suggestions: ["Node.js", "Python", "Java", "C#", "PHP", "Ruby", "Go", "Express.js"]
    },
    {
      key: "databases" as keyof TechnicalSkills,
      title: "Databases",
      icon: Database,
      placeholder: "e.g., MySQL, MongoDB, PostgreSQL",
      suggestions: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite", "Oracle", "SQL Server"]
    },
    {
      key: "cloud" as keyof TechnicalSkills,
      title: "Cloud & DevOps",
      icon: Cloud,
      placeholder: "e.g., AWS, Azure, Docker, Kubernetes",
      suggestions: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "GitLab CI"]
    },
    {
      key: "tools" as keyof TechnicalSkills,
      title: "Tools & Frameworks",
      icon: Wrench,
      placeholder: "e.g., Git, VS Code, Figma, Postman",
      suggestions: ["Git", "VS Code", "Figma", "Postman", "Jira", "Slack", "Adobe Creative Suite"]
    },
    {
      key: "other" as keyof TechnicalSkills,
      title: "Other Technologies",
      icon: Code,
      placeholder: "e.g., Machine Learning, Blockchain, IoT",
      suggestions: ["Machine Learning", "AI/ML", "Blockchain", "IoT", "Mobile Development", "Game Development"]
    }
  ];

  const skillCategories = [
    {
      key: "soft" as const,
      title: "Soft Skills",
      icon: Users,
      placeholder: "e.g., Leadership, Communication, Problem Solving",
      description: "Interpersonal and professional skills",
      suggestions: ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Project Management", "Critical Thinking"]
    },
    {
      key: "languages" as const,
      title: "Languages",
      icon: Globe,
      placeholder: "e.g., English (Native), Spanish (Fluent)",
      description: "Spoken languages and proficiency levels",
      suggestions: ["English (Native)", "Spanish (Fluent)", "French (Conversational)", "Mandarin (Basic)"]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills & Competencies</h3>
        <p className="text-sm text-gray-600">
          Add relevant skills that match your target job requirements. Technical skills are organized by category for better presentation.
        </p>
      </div>

      {/* Technical Skills */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-medium text-gray-900">Technical Skills</h4>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">Organize your technical skills by category for better readability</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technicalCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.key} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <Label className="text-sm font-medium text-gray-700">{category.title}</Label>
                </div>
                
                {/* Add new skill */}
                <div className="flex gap-2">
                  <Input
                    value={newSkill[category.key]}
                    onChange={(e) => setNewSkill({ ...newSkill, [category.key]: e.target.value })}
                    onKeyPress={(e) => handleKeyPress(e, category.key)}
                    placeholder={category.placeholder}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={() => addTechnicalSkill(category.key, newSkill[category.key])}
                    disabled={!newSkill[category.key].trim()}
                    size="sm"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Quick suggestions */}
                {data.technical[category.key].length === 0 && (
                  <div className="flex flex-wrap gap-1">
                    {category.suggestions.slice(0, 4).map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => addTechnicalSkill(category.key, suggestion)}
                        className="text-xs h-6"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Current skills */}
                {data.technical[category.key].length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {data.technical[category.key].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1 text-xs"
                      >
                        {skill}
                        <button
                          onClick={() => removeTechnicalSkill(category.key, skill)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Soft Skills and Languages */}
      {skillCategories.map((category) => {
        const Icon = category.icon;
        return (
          <Card key={category.key} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-medium text-gray-900">{category.title}</h4>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{category.description}</p>

            {/* Add new skill */}
            <div className="flex gap-2 mb-4">
              <Input
                value={newSkill[category.key]}
                onChange={(e) => setNewSkill({ ...newSkill, [category.key]: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, category.key)}
                placeholder={category.placeholder}
                className="flex-1"
              />
              <Button
                onClick={() => addSkill(category.key, newSkill[category.key])}
                disabled={!newSkill[category.key].trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick suggestions */}
            {data[category.key].length === 0 && (
              <div className="mb-4">
                <Label className="text-xs text-gray-500 mb-2 block">Quick suggestions:</Label>
                <div className="flex flex-wrap gap-2">
                  {category.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(category.key, suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Current skills */}
            {data[category.key].length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current {category.title.toLowerCase()} ({data[category.key].length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {data[category.key].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(category.key, skill)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        );
      })}

      {/* Skills optimization tips */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">🎯 ATS Optimization Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use exact keywords from job descriptions</li>
          <li>• Include both abbreviations and full forms (e.g., "AI" and "Artificial Intelligence")</li>
          <li>• Organize technical skills by category for better readability</li>
          <li>• Keep skills relevant to your target role</li>
          <li>• Update skills regularly based on current market demands</li>
        </ul>
      </Card>
    </div>
  );
};

export default SkillsForm;
