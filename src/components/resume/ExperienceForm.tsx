
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      achievements: [""]
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, "achievements", [...experience.achievements, ""]);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(id, "achievements", newAchievements);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience && experience.achievements.length > 1) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(id, "achievements", newAchievements);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Work Experience
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your work experience with quantified achievements and relevant keywords
          </p>
        </div>
        <Button onClick={addExperience} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience added</h3>
          <p className="text-gray-600 mb-4">Start by adding your most recent position</p>
          <Button onClick={addExperience}>Add Your First Job</Button>
        </Card>
      ) : (
        data.map((experience, index) => (
          <Card key={experience.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">
                Position #{index + 1}
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor={`company-${experience.id}`}>Company Name *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Google Inc."
                />
              </div>
              
              <div>
                <Label htmlFor={`position-${experience.id}`}>Job Title *</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
              
              <div>
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                  placeholder="Mountain View, CA"
                />
              </div>
              
              <div>
                <Label htmlFor={`startDate-${experience.id}`}>Start Date *</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => updateExperience(experience.id, "current", checked)}
                />
                <Label htmlFor={`current-${experience.id}`}>Currently working here</Label>
              </div>
              
              {!experience.current && (
                <div>
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Key Achievements & Responsibilities</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addAchievement(experience.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Achievement
                </Button>
              </div>
              
              <div className="space-y-3">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex gap-2">
                    <Textarea
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achievementIndex, e.target.value)}
                      placeholder="• Increased system performance by 40% through implementation of advanced caching strategies and database optimization"
                      className="resize-none"
                      rows={2}
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(experience.id, achievementIndex)}
                        className="text-red-600 hover:text-red-700 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Start with action verbs, include numbers/percentages, and use relevant keywords for your industry
              </p>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ExperienceForm;
