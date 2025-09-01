import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduation: string;
  gpa?: string;
  percentage?: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduation: "",
      gpa: "",
      percentage: ""
    };
    onChange([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Education
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Add your educational background, certifications, and relevant coursework
          </p>
        </div>
        <Button onClick={addEducation} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No education added</h3>
          <p className="text-gray-600 mb-4">Start by adding your highest degree or most recent education</p>
          <Button onClick={addEducation}>Add Education</Button>
        </Card>
      ) : (
        data.map((education, index) => (
          <Card key={education.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">
                Education #{index + 1}
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`institution-${education.id}`}>Institution/University *</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="Stanford University"
                />
              </div>
              
              <div>
                <Label htmlFor={`degree-${education.id}`}>Degree Type *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              
              <div>
                <Label htmlFor={`field-${education.id}`}>Field of Study *</Label>
                <Input
                  id={`field-${education.id}`}
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              
              <div>
                <Label htmlFor={`graduation-${education.id}`}>Graduation Date</Label>
                <Input
                  id={`graduation-${education.id}`}
                  type="month"
                  value={education.graduation}
                  onChange={(e) => updateEducation(education.id, "graduation", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                />
              </div>

              <div>
                <Label htmlFor={`percentage-${education.id}`}>Percentage (Optional)</Label>
                <Input
                  id={`percentage-${education.id}`}
                  value={education.percentage}
                  onChange={(e) => updateEducation(education.id, "percentage", e.target.value)}
                  placeholder="85%"
                />
              </div>
            </div>
          </Card>
        ))
      )}

      {/* Education tips */}
      <Card className="p-6 bg-green-50 border-green-200">
        <h4 className="font-medium text-green-900 mb-2">📚 Education Section Tips</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• List education in reverse chronological order (most recent first)</li>
          <li>• Include relevant coursework, honors, or achievements if space allows</li>
          <li>• For new graduates, education can be placed before work experience</li>
          <li>• Include certifications and professional development courses</li>
          <li>• Only include GPA if it's 3.5 or higher</li>
        </ul>
      </Card>
    </div>
  );
};

export default EducationForm;
