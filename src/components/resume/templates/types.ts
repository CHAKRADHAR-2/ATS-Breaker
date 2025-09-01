
export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  headerStyle: 'centered' | 'left-aligned' | 'two-column' | 'minimal';
  sectionLayout: 'single-column' | 'two-column' | 'compact';
  colorScheme: 'natural';
  fontStyle: 'modern' | 'classic' | 'elegant' | 'minimal';
  spacing: 'compact' | 'normal' | 'relaxed';
  supportsPhoto?: boolean; // Whether this template supports photos
  photoStyle?: 'circular' | 'square' | 'rounded'; // Style of photo display
  photoSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'; // Size of photo
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
}
