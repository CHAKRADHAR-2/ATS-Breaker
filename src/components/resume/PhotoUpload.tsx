import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, X, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  photo?: string;
  includePhoto?: boolean;
  photoSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  onPhotoChange: (photo?: string) => void;
  onIncludePhotoChange: (include: boolean) => void;
  onPhotoSizeChange: (size: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge') => void;
}

const PhotoUpload = ({ photo, includePhoto = false, photoSize = 'medium', onPhotoChange, onIncludePhotoChange, onPhotoSizeChange }: PhotoUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Enhanced debug logging
  console.log('=== PhotoUpload Debug ===');
  console.log('photo prop:', photo ? `present (${photo.length} chars, starts with: ${photo.substring(0, 50)}...)` : 'not present');
  console.log('includePhoto prop:', includePhoto);
  console.log('photo exists and includePhoto true:', !!(photo && includePhoto));
  console.log('========================');

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      console.log('=== FileReader Success ===');
      console.log('File type:', file.type);
      console.log('File size:', file.size);
      console.log('Result length:', result ? result.length : 0);
      console.log('Result preview:', result ? result.substring(0, 100) + '...' : 'null');
      console.log('Calling onPhotoChange with result');
      onPhotoChange(result);
      // Don't call onIncludePhotoChange here - let parent handle it
      console.log('========================');
      toast({
        title: "Photo uploaded",
        description: "Your photo has been added to your resume",
      });
    };
    reader.onerror = (e) => {
      console.error('FileReader error:', e);
      toast({
        title: "Upload failed",
        description: "Failed to process the image file",
        variant: "destructive"
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removePhoto = () => {
    onPhotoChange(undefined);
    onIncludePhotoChange(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Profile Photo</h3>
      </div>

      <div className="space-y-4">
        {/* Include Photo Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="include-photo" className="text-sm font-medium">
              Include photo in resume
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              Add a professional photo to personalize your resume
            </p>
          </div>
          <Switch
            id="include-photo"
            checked={includePhoto}
            onCheckedChange={onIncludePhotoChange}
          />
        </div>

        {/* Debug Info */}
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Debug:</strong> photo={photo ? 'YES' : 'NO'}, includePhoto={includePhoto ? 'YES' : 'NO'}, 
          photoLength={photo?.length || 0}
        </div>

        {/* Photo Size Selector */}
        {includePhoto && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="photo-size" className="text-sm font-medium">
                Photo Size
              </Label>
              <Select value={photoSize} onValueChange={onPhotoSizeChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="xlarge">X-Large</SelectItem>
                  <SelectItem value="xxlarge">XX-Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {photo && photo.length > 0 ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={photo}
                    alt="Profile"
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
                  />
                  <button
                    onClick={removePhoto}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Photo uploaded</p>
                  <p className="text-xs text-gray-500">Click the X to remove or upload a new one</p>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop your photo here, or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Recommended: Square photo, max 5MB (JPG, PNG)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            <div className="text-xs text-gray-500 space-y-1">
              <p>📸 <strong>Photo Tips:</strong></p>
              <ul className="pl-4 space-y-1">
                <li>• Use a professional headshot with good lighting</li>
                <li>• Maintain eye contact with the camera</li>
                <li>• Dress appropriately for your industry</li>
                <li>• Keep the background simple and clean</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PhotoUpload;