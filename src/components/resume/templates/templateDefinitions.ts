import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'modern-gray',
    name: 'Modern Professional',
    description: 'Clean and modern design with natural tones',
    preview: '📄',
    headerStyle: 'centered',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'normal'
  },
  {
    id: 'classic-gray',
    name: 'Classic Executive',
    description: 'Traditional layout with professional styling',
    preview: '📋',
    headerStyle: 'left-aligned',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'classic',
    spacing: 'normal'
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Clean',
    description: 'Minimalist design with clean lines',
    preview: '📃',
    headerStyle: 'minimal',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'minimal',
    spacing: 'relaxed'
  },
  {
    id: 'two-column-gray',
    name: 'Two Column Layout',
    description: 'Efficient two-column design',
    preview: '📰',
    headerStyle: 'left-aligned',
    sectionLayout: 'two-column',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'compact'
  },
  {
    id: 'executive-gray',
    name: 'Executive Elite',
    description: 'Premium executive design',
    preview: '🗂️',
    headerStyle: 'centered',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'elegant',
    spacing: 'normal'
  },
  {
    id: 'compact-gray',
    name: 'Compact Professional',
    description: 'Space-efficient design for detailed resumes',
    preview: '📑',
    headerStyle: 'two-column',
    sectionLayout: 'compact',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'compact'
  }
];

export const getColorScheme = (colorScheme: string) => {
  // All templates now use natural/grayscale colors only
  return {
    primary: '#1f2937',
    secondary: '#f9fafb',
    accent: '#374151',
    text: '#111827',
    border: '#e5e7eb'
  };
};