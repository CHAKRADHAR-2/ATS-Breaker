import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Camera, Download, AlertCircle } from "lucide-react";
import { ResumeData } from "./types";
import { templates } from "./templates/templateDefinitions";

interface PhotoExportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
  selectedTemplate: string;
  onExport: (includePhoto: boolean) => void;
}

const PhotoExportDialog = ({ 
  isOpen, 
  onOpenChange, 
  resumeData, 
  selectedTemplate, 
  onExport 
}: PhotoExportDialogProps) => {
  const [includePhotoInExport, setIncludePhotoInExport] = useState(
    resumeData.personalInfo.includePhoto || false
  );

  const hasPhoto = resumeData.personalInfo.photo && resumeData.personalInfo.includePhoto;
  const currentTemplate = templates.find(t => t.id === selectedTemplate);
  const isPhotoTemplate = currentTemplate?.supportsPhoto || false;

  const handleExport = () => {
    onExport(includePhotoInExport);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Resume
          </DialogTitle>
          <DialogDescription>
            Configure your resume export settings before downloading
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Photo Status */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-sm">Photo Settings</span>
            </div>
            
            {hasPhoto ? (
              <div className="flex items-center gap-3">
                <img
                  src={resumeData.personalInfo.photo}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-full border"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-700">Photo Available</p>
                  <p className="text-xs text-gray-500">
                    Template: {isPhotoTemplate ? 'Photo-optimized' : 'Standard'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">No photo uploaded</span>
              </div>
            )}
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-photo-export" className="text-sm font-medium">
                  Include photo in PDF export
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  {hasPhoto 
                    ? "Your photo will be included in the exported resume"
                    : "Enable this to include photo if you upload one later"
                  }
                </p>
              </div>
              <Switch
                id="include-photo-export"
                checked={includePhotoInExport}
                onCheckedChange={setIncludePhotoInExport}
                disabled={!hasPhoto}
              />
            </div>

            {includePhotoInExport && !isPhotoTemplate && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Template Recommendation</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Consider switching to a photo-optimized template for better photo placement and visual balance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!includePhotoInExport && hasPhoto && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Photo Excluded</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Your resume will be exported without the photo. Perfect for ATS systems and certain industries.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleExport} className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoExportDialog;