
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    github: string;
    summary: string;
    photo?: string; // Base64 encoded photo or URL
    includePhoto?: boolean; // Whether to include photo in exports
    photoSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'; // User selected photo size
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
    technical: {
      frontend: string[];
      backend: string[];
      databases: string[];
      cloud: string[];
      tools: string[];
      other: string[];
    };
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
    percentage?: string;
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
    credentialId?: string;
    url?: string;
  }>;
}
