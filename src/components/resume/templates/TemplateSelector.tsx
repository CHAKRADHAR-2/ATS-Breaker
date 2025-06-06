import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Palette } from "lucide-react";
import { templates } from './templateDefinitions';
import { Template } from './types';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Choose Template</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            
            <div className="text-center mb-2">
              <div className="text-2xl mb-1">{template.preview}</div>
              <h4 className="font-medium text-sm text-gray-900">{template.name}</h4>
            </div>
            
            <p className="text-xs text-gray-600 text-center mb-2">
              {template.description}
            </p>
            
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="secondary" className="text-xs">
                {template.fontStyle}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {template.spacing}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;