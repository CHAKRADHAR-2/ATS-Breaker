
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Palette, Camera } from "lucide-react";
import { templates, getTemplatesByPhotoSupport } from './templateDefinitions';
import { Template } from './types';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  hasPhoto?: boolean;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, hasPhoto = false }: TemplateSelectorProps) => {
  const standardTemplates = getTemplatesByPhotoSupport(false);
  const photoTemplates = getTemplatesByPhotoSupport(true);

  const renderTemplateGrid = (templateList: Template[]) => (
    <div className="grid grid-cols-2 gap-3">
      {templateList.map((template) => (
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
            {template.supportsPhoto && (
              <Badge variant="default" className="text-xs bg-green-600">
                <Camera className="w-3 h-3 mr-1" />
                Photo
              </Badge>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Choose Template</h3>
      </div>
      
      <Tabs defaultValue={hasPhoto ? "photo" : "standard"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="photo" className="gap-2">
            <Camera className="w-4 h-4" />
            With Photo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="mt-4">
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              Clean, professional templates without photo support
            </p>
          </div>
          {renderTemplateGrid(standardTemplates)}
        </TabsContent>
        
        <TabsContent value="photo" className="mt-4">
          <div className="mb-3">
            <p className="text-sm text-gray-600">
              Professional templates with enhanced photo layouts (5 compact + 5 normal)
            </p>
          </div>
          {renderTemplateGrid(photoTemplates)}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TemplateSelector;
