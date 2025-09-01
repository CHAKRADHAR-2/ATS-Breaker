import { useState, useEffect, useCallback } from "react";
import { ResumeData } from "@/components/resume/types";

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    github: "",
    summary: "",
    photo: undefined,
    includePhoto: false,
    photoSize: 'medium'
  },
  experience: [],
  skills: {
    technical: {
      frontend: [],
      backend: [],
      databases: [],
      cloud: [],
      tools: [],
      other: []
    },
    soft: [],
    languages: []
  },
  education: [],
  projects: [],
  certificates: []
};

const STORAGE_KEY = "resumeBuilderData";
const STORAGE_VERSION_KEY = "resumeBuilderVersion";
const CURRENT_VERSION = "1.0";

// Enhanced localStorage operations with error handling and validation
const saveToStorage = (data: ResumeData) => {
  try {
    if (typeof window === 'undefined') return false;
    
    const dataToSave = {
      data,
      version: CURRENT_VERSION,
      timestamp: Date.now()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    console.log("Resume data saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving resume data:", error);
    return false;
  }
};

// Migration function to convert old skills format to new format
const migrateSkillsData = (data: any): ResumeData => {
  if (!data || !data.skills) {
    return { ...initialResumeData };
  }

  // If technical skills is already in new format, return as is
  if (data.skills.technical && typeof data.skills.technical === 'object' && !Array.isArray(data.skills.technical)) {
    return { ...initialResumeData, ...data };
  }

  // If technical skills is in old format (array), migrate it
  const oldTechnicalSkills = Array.isArray(data.skills.technical) ? data.skills.technical : [];
  
  return {
    ...initialResumeData,
    ...data,
    skills: {
      ...data.skills,
      technical: {
        frontend: [],
        backend: [],
        databases: [],
        cloud: [],
        tools: [],
        other: oldTechnicalSkills // Put all old skills in 'other' category
      }
    }
  };
};

const loadFromStorage = (): ResumeData => {
  try {
    if (typeof window === 'undefined') return initialResumeData;
    
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (!savedData) {
      console.log("No saved data found");
      return initialResumeData;
    }
    
    const parsed = JSON.parse(savedData);
    
    // Check if it's the new format with version
    if (parsed.data && parsed.version) {
      if (parsed.version === CURRENT_VERSION && parsed.data.personalInfo) {
        console.log("Loaded resume data from storage");
        return migrateSkillsData(parsed.data);
      }
    }
    
    // Handle old format data
    if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
      console.log("Migrating old format data");
      return migrateSkillsData(parsed);
    }
    
    console.log("Invalid data format, using initial data");
    return initialResumeData;
  } catch (error) {
    console.error("Error loading resume data:", error);
    return initialResumeData;
  }
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => loadFromStorage());

  // Debounced save function to avoid too frequent saves
  const debouncedSave = useCallback((data: ResumeData) => {
    const timeoutId = setTimeout(() => {
      saveToStorage(data);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    const cleanup = debouncedSave(resumeData);
    return cleanup;
  }, [resumeData, debouncedSave]);

  // Listen for storage events (in case user has multiple tabs open)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed.data && parsed.data.personalInfo) {
            setResumeData(migrateSkillsData(parsed.data));
            console.log("Data synchronized from another tab");
          }
        } catch (error) {
          console.error("Error syncing data from another tab:", error);
        }
      }
    };

    // Listen for visibility changes (when user comes back from sleep/background)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const freshData = loadFromStorage();
        setResumeData(freshData);
        console.log("Data refreshed after visibility change");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const updateResumeData = useCallback((section: keyof ResumeData, data: any) => {
    setResumeData(prev => {
      const updated = {
        ...prev,
        [section]: data
      };
      console.log(`Updated ${section} section`);
      return updated;
    });
  }, []);

  const clearResumeData = useCallback(() => {
    setResumeData(initialResumeData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_VERSION_KEY);
        console.log("Resume data cleared");
      } catch (error) {
        console.error("Error clearing resume data:", error);
      }
    }
  }, []);

  return {
    resumeData,
    updateResumeData,
    clearResumeData
  };
};
