
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Target } from "lucide-react";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduation: string;
    gpa?: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  certificates: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    url?: string;
  }>;
}

interface ATSScoreCheckerProps {
  data: ResumeData;
}

const ATSScoreChecker = ({ data }: ATSScoreCheckerProps) => {
  const [score, setScore] = useState(0);
  const [checks, setChecks] = useState<Array<{ label: string; passed: boolean; weight: number }>>([]);

  useEffect(() => {
    calculateATSScore();
  }, [data]);

  const calculateATSScore = () => {
    const scoreChecks = [
      {
        label: "Contact Information Complete",
        passed: !!(data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.phone),
        weight: 15
      },
      {
        label: "Professional Summary Present",
        passed: data.personalInfo.summary.length >= 100,
        weight: 15
      },
      {
        label: "Work Experience Added",
        passed: data.experience.length > 0,
        weight: 25
      },
      {
        label: "Technical Skills Listed",
        passed: data.skills.technical.length >= 5,
        weight: 15
      },
      {
        label: "Education Information",
        passed: data.education.length > 0,
        weight: 10
      },
      {
        label: "Projects Showcased",
        passed: data.projects.length > 0,
        weight: 12
      },
      {
        label: "Relevant Certifications",
        passed: data.certificates.length > 0,
        weight: 8
      }
    ];

    setChecks(scoreChecks);
    
    const totalScore = scoreChecks.reduce((acc, check) => {
      return acc + (check.passed ? check.weight : 0);
    }, 0);
    
    setScore(totalScore);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <Card className="p-4 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">ATS Score</h3>
      </div>
      
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </div>
        <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>
          {getScoreStatus(score)}
        </Badge>
      </div>
      
      <Progress value={score} className="mb-4" />
      
      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {check.passed ? (
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span className={check.passed ? "text-gray-700" : "text-gray-500"}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
      
      {score < 80 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Tips to improve your ATS score:</p>
              <ul className="space-y-1">
                {!checks[0]?.passed && <li>• Complete all contact information</li>}
                {!checks[1]?.passed && <li>• Add a detailed professional summary (100+ chars)</li>}
                {!checks[2]?.passed && <li>• Add work experience entries with detailed achievements</li>}
                {!checks[3]?.passed && <li>• List at least 5 technical skills</li>}
                {!checks[4]?.passed && <li>• Add education information</li>}
                {!checks[5]?.passed && <li>• Showcase key projects with technologies</li>}
                {!checks[6]?.passed && <li>• Add relevant certifications</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ATSScoreChecker;
