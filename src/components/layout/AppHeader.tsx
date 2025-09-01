
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface AppHeaderProps {
  onExportPDF: () => void;
  onLivePreview: () => void;
}

const AppHeader = ({ onExportPDF, onLivePreview }: AppHeaderProps) => {
  

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ATS Resume Breaker</h1>
            <p className="text-gray-600 mt-1">Create a resume that beats tracking systems and impresses recruiters</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={onExportPDF}
            >
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={onLivePreview}
            >
              <Eye className="w-4 h-4" />
              Live Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
