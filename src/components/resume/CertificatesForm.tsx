import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink, Award } from "lucide-react";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  url?: string;
}

interface CertificatesFormProps {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

const CertificatesForm = ({ data, onChange }: CertificatesFormProps) => {
  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      url: ""
    };
    onChange([...data, newCertificate]);
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertificate = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
          <p className="text-sm text-gray-600">Add your professional certifications and credentials</p>
        </div>
        <Button onClick={addCertificate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Certificate
        </Button>
      </div>

      {data.length === 0 ? (
        <Card className="p-8 text-center">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No certifications added yet</p>
          <Button onClick={addCertificate} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Certification
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {data.map((certificate) => (
            <Card key={certificate.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-gray-900">Certificate Details</h4>
                <Button
                  onClick={() => removeCertificate(certificate.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`cert-name-${certificate.id}`}>Certificate Name *</Label>
                  <Input
                    id={`cert-name-${certificate.id}`}
                    value={certificate.name}
                    onChange={(e) => updateCertificate(certificate.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div>
                  <Label htmlFor={`cert-issuer-${certificate.id}`}>Issuing Organization *</Label>
                  <Input
                    id={`cert-issuer-${certificate.id}`}
                    value={certificate.issuer}
                    onChange={(e) => updateCertificate(certificate.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div>
                  <Label htmlFor={`cert-issue-date-${certificate.id}`}>Issue Date *</Label>
                  <Input
                    id={`cert-issue-date-${certificate.id}`}
                    type="month"
                    value={certificate.issueDate}
                    onChange={(e) => updateCertificate(certificate.id, 'issueDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`cert-credential-${certificate.id}`}>Credential ID</Label>
                  <Input
                    id={`cert-credential-${certificate.id}`}
                    value={certificate.credentialId}
                    onChange={(e) => updateCertificate(certificate.id, 'credentialId', e.target.value)}
                    placeholder="ABC123XYZ789"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor={`cert-url-${certificate.id}`}>Certificate URL</Label>
                  <div className="relative">
                    <Input
                      id={`cert-url-${certificate.id}`}
                      value={certificate.url}
                      onChange={(e) => updateCertificate(certificate.id, 'url', e.target.value)}
                      placeholder="https://www.credly.com/badges/..."
                      className="pr-10"
                    />
                    {certificate.url && (
                      <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {data.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 ATS Optimization Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include relevant industry certifications that match job requirements</li>
            <li>• Use full certificate names rather than abbreviations</li>
            <li>• Include credential IDs to verify authenticity</li>
            <li>• List certifications in reverse chronological order</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CertificatesForm;
