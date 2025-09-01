import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResumeData } from "./types";

interface PDFImportProps {
  onImportComplete: (data: ResumeData) => void;
}

const PDFImport = ({ onImportComplete }: PDFImportProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          
          // Simple PDF text extraction (basic implementation)
          const text = await extractPDFText(uint8Array);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const extractPDFText = async (pdfData: Uint8Array): Promise<string> => {
    try {
      // Try to use PDF.js if available (browser environment)
      if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
        const pdfjsLib = (window as any).pdfjsLib;
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        
        return fullText;
      }
    } catch (error) {
      console.warn('PDF.js extraction failed, falling back to basic extraction');
    }
    
    // Fallback: Basic PDF text extraction
    const decoder = new TextDecoder('latin1');
    const pdfString = decoder.decode(pdfData);
    
    // Extract text using multiple patterns
    const patterns = [
      /\(([^)]+)\)\s*Tj/g,
      /\[([^\]]+)\]\s*TJ/g,
      /BT\s*([^E]*?)\s*ET/gs
    ];
    
    let extractedText = '';
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(pdfString)) !== null) {
        let text = match[1];
        if (text) {
          // Clean up the text
          text = text
            .replace(/\\[nrt]/g, ' ')
            .replace(/\\\(/g, '(')
            .replace(/\\\)/g, ')')
            .replace(/\s+/g, ' ')
            .trim();
          
          if (text.length > 1) {
            extractedText += text + ' ';
          }
        }
      }
    });
    
    if (!extractedText.trim()) {
      throw new Error('No readable text found in PDF. Please ensure the PDF contains selectable text.');
    }
    
    return extractedText.trim();
  };

  const parseResumeText = (text: string): ResumeData => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    // Initialize resume data
    const resumeData: ResumeData = {
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
        github: "",
        summary: "",
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

    // Extract email
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      resumeData.personalInfo.email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) {
      resumeData.personalInfo.phone = phoneMatch[0];
    }

    // Extract name with better patterns
    const namePatterns = [
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/m,
      /([A-Z][a-z]+\s+[A-Z][a-z]+)(?=\s|$|\n)/,
      /^\s*([A-Z][A-Za-z\s]{2,30})(?=\n|\s{2,})/m
    ];
    
    for (const pattern of namePatterns) {
      const nameMatch = text.match(pattern);
      if (nameMatch && nameMatch[1].length > 3 && nameMatch[1].length < 50) {
        resumeData.personalInfo.fullName = nameMatch[1].trim();
        break;
      }
    }

    // Extract location
    const locationMatch = text.match(/([A-Z][a-z]+,\s*[A-Z]{2}|[A-Z][a-z]+\s*,\s*[A-Z][a-z]+)/);
    if (locationMatch) {
      resumeData.personalInfo.location = locationMatch[1];
    }

    // Extract LinkedIn
    const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|@)([\w-]+)/i);
    if (linkedinMatch) {
      resumeData.personalInfo.linkedin = `linkedin.com/in/${linkedinMatch[1]}`;
    }

    // Extract GitHub
    const githubMatch = text.match(/(?:github\.com\/|@github\/)([\w-]+)/i);
    if (githubMatch) {
      resumeData.personalInfo.github = `github.com/${githubMatch[1]}`;
    }

    // Extract portfolio
    const websiteMatch = text.match(/(?:portfolio|website|site):\s*([\w.-]+\.[a-z]{2,})/i);
    if (websiteMatch) {
      resumeData.personalInfo.portfolio = websiteMatch[1];
    }

    // Enhanced skills extraction by category
    const skillCategories = {
      frontend: ['React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
      backend: ['Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel'],
      databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite'],
      cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
      tools: ['Git', 'Jenkins', 'Webpack', 'Jest', 'Figma']
    };
    
    Object.entries(skillCategories).forEach(([category, skills]) => {
      skills.forEach(skill => {
        if (text.toLowerCase().includes(skill.toLowerCase())) {
          (resumeData.skills.technical as any)[category].push(skill);
        }
      });
    });

    // Extract summary with better patterns
    const summaryPatterns = [
      /(?:summary|objective|profile|about)\s*:?\s*([^\n]{50,300})/i,
      /^\s*([A-Z][^.!?]*[.!?]\s*[A-Z][^.!?]*[.!?])/m
    ];
    
    for (const pattern of summaryPatterns) {
      const summaryMatch = text.match(pattern);
      if (summaryMatch && summaryMatch[1].length > 50) {
        resumeData.personalInfo.summary = summaryMatch[1].trim().substring(0, 500);
        break;
      }
    }

    return resumeData;
  };

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF file",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select a PDF smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const extractedText = await extractTextFromPDF(file);
      const parsedData = parseResumeText(extractedText);
      
      onImportComplete(parsedData);
      
      toast({
        title: "PDF imported successfully",
        description: "Resume data has been extracted and populated",
      });
    } catch (error) {
      console.error('PDF import error:', error);
      toast({
        title: "Import failed",
        description: "Could not extract data from PDF. Please try a different file or enter details manually.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">Import from PDF</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload your existing resume PDF to automatically extract and populate your information
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload your resume PDF
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supports PDF files up to 10MB
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload PDF
              </>
            )}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="text-xs text-gray-500 space-y-1">
          <p>📄 <strong>Import Tips:</strong></p>
          <ul className="pl-4 space-y-1">
            <li>• Use a clear, well-formatted PDF resume</li>
            <li>• Ensure text is selectable (not scanned images)</li>
            <li>• Review and edit extracted data for accuracy</li>
            <li>• Some formatting may need manual adjustment</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PDFImport;