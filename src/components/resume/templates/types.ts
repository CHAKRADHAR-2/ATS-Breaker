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
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
}
