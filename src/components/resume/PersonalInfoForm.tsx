
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  github: string;
  summary: string;
  photo?: string;
  includePhoto?: boolean;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  console.log('PersonalInfoForm render - data.photo:', data.photo ? 'present (length: ' + data.photo.length + ')' : 'not present');
  console.log('PersonalInfoForm render - data.includePhoto:', data.includePhoto);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handlePhotoChange = (photo?: string) => {
    console.log('=== PersonalInfoForm handlePhotoChange ===');
    console.log('Received photo:', photo ? `YES (${photo.length} chars)` : 'NO');
    const updatedData = {
      ...data,
      photo,
      includePhoto: photo ? true : data.includePhoto // Auto-enable when photo is added
    };
    console.log('Updated data photo:', !!updatedData.photo);
    console.log('Updated data includePhoto:', updatedData.includePhoto);
    console.log('Calling onChange with updated data');
    onChange(updatedData);
    console.log('========================================');
  };

  const handleIncludePhotoChange = (includePhoto: boolean) => {
    console.log('=== PersonalInfoForm handleIncludePhotoChange ===');
    console.log('Received includePhoto:', includePhoto);
    const updatedData = {
      ...data,
      includePhoto
    };
    console.log('Updated data photo exists:', !!updatedData.photo);
    console.log('Updated data includePhoto:', updatedData.includePhoto);
    console.log('Calling onChange with updated data');
    onChange(updatedData);
    console.log('===============================================');
  };

  const handlePhotoSizeChange = (photoSize: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge') => {
    const updatedData = {
      ...data,
      photoSize
    };
    onChange(updatedData);
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <PhotoUpload
        photo={data.photo}
        includePhoto={data.includePhoto}
        photoSize={data.photoSize}
        onPhotoChange={handlePhotoChange}
        onIncludePhotoChange={handleIncludePhotoChange}
        onPhotoSizeChange={handlePhotoSizeChange}
      />

      {/* Basic Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john.doe@email.com"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Phone Number *
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="San Francisco, CA"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/johndoe"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="github" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub Profile
            </Label>
            <Input
              id="github"
              value={data.github}
              onChange={(e) => handleChange("github", e.target.value)}
              placeholder="github.com/johndoe"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <Globe className="w-4 h-4" />
              Portfolio/Website
            </Label>
            <Input
              id="portfolio"
              value={data.portfolio}
              onChange={(e) => handleChange("portfolio", e.target.value)}
              placeholder="johndoe.com"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Professional Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Professional Summary
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Write a compelling 3-4 sentence summary that highlights your key achievements and value proposition. 
          Include relevant keywords for ATS optimization.
        </p>
        
        <Textarea
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Experienced software engineer with 5+ years developing scalable web applications. Proven track record of leading cross-functional teams and delivering high-quality solutions that increased user engagement by 40%. Expertise in React, Node.js, and cloud technologies with a passion for creating innovative user experiences."
          className="min-h-[120px] resize-none"
          maxLength={1000}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {data.summary.length}/1000 characters
        </div>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;
