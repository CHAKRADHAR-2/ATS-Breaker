import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Code, Users, Globe } from "lucide-react";

interface Skills {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState({
    technical: "",
    soft: "",
    languages: ""
  });

  const addSkill = (category: keyof Skills, skill: string) => {
    if (skill.trim() && !data[category].includes(skill.trim())) {
      onChange({
        ...data,
        [category]: [...data[category], skill.trim()]
      });
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeSkill = (category: keyof Skills, skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category, newSkill[category]);
    }
  };

  const skillCategories = [
    {
      key: "technical" as keyof Skills,
      title: "Technical Skills",
      icon: Code,
      placeholder: "e.g., JavaScript, Python, React, AWS",
      description: "Programming languages, frameworks, tools, and technologies",
      suggestions: ["JavaScript", "Python", "React", "Node.js", "AWS", "Docker", "SQL", "Git"]
    },
    {
      key: "soft" as keyof Skills,
      title: "Soft Skills",
      icon: Users,
      placeholder: "e.g., Leadership, Communication, Problem Solving",
      description: "Interpersonal and professional skills",
      suggestions: ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Project Management", "Critical Thinking"]
    },
    {
      key: "languages" as keyof Skills,
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
          Add relevant skills that match your target job requirements. Use keywords from job descriptions for better ATS matching.
        </p>
      </div>

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
          <li>• Mix hard and soft skills for a well-rounded profile</li>
          <li>• Keep skills relevant to your target role</li>
          <li>• Update skills regularly based on current market demands</li>
        </ul>
      </Card>
    </div>
  );
};

export default SkillsForm;