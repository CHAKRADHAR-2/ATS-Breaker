
import { Template } from './types';

export const templates: Template[] = [
  // Standard templates without photo
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
  },
  // Photo-enabled compact templates (5)
  {
    id: 'compact-photo-executive',
    name: 'Executive Compact Photo',
    description: 'Professional compact layout with large photo',
    preview: '👔',
    headerStyle: 'two-column',
    sectionLayout: 'compact',
    colorScheme: 'natural',
    fontStyle: 'elegant',
    spacing: 'compact',
    supportsPhoto: true,
    photoStyle: 'square',
    photoSize: 'xlarge'
  },
  {
    id: 'compact-photo-modern',
    name: 'Modern Compact Photo',
    description: 'Clean modern compact with circular photo',
    preview: '🎯',
    headerStyle: 'left-aligned',
    sectionLayout: 'compact',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'compact',
    supportsPhoto: true,
    photoStyle: 'circular',
    photoSize: 'xlarge'
  },
  {
    id: 'compact-photo-sidebar',
    name: 'Sidebar Compact Photo',
    description: 'Two-column compact with large sidebar photo',
    preview: '📊',
    headerStyle: 'left-aligned',
    sectionLayout: 'two-column',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'compact',
    supportsPhoto: true,
    photoStyle: 'rounded',
    photoSize: 'xxlarge'
  },
  {
    id: 'compact-photo-minimal',
    name: 'Minimal Compact Photo',
    description: 'Minimalist compact with centered photo',
    preview: '🔷',
    headerStyle: 'centered',
    sectionLayout: 'compact',
    colorScheme: 'natural',
    fontStyle: 'minimal',
    spacing: 'compact',
    supportsPhoto: true,
    photoStyle: 'circular',
    photoSize: 'xlarge'
  },
  {
    id: 'compact-photo-professional',
    name: 'Professional Compact Photo',
    description: 'Traditional compact with rounded photo',
    preview: '💎',
    headerStyle: 'left-aligned',
    sectionLayout: 'compact',
    colorScheme: 'natural',
    fontStyle: 'classic',
    spacing: 'compact',
    supportsPhoto: true,
    photoStyle: 'rounded',
    photoSize: 'xlarge'
  },
  // Photo-enabled normal templates (5)
  {
    id: 'normal-photo-executive',
    name: 'Executive Premium Photo',
    description: 'Premium executive with prominent photo',
    preview: '🏆',
    headerStyle: 'two-column',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'elegant',
    spacing: 'normal',
    supportsPhoto: true,
    photoStyle: 'square',
    photoSize: 'xxlarge'
  },
  {
    id: 'normal-photo-modern',
    name: 'Modern Professional Photo',
    description: 'Contemporary design with large circular photo',
    preview: '💼',
    headerStyle: 'centered',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'normal',
    supportsPhoto: true,
    photoStyle: 'circular',
    photoSize: 'xxlarge'
  },
  {
    id: 'normal-photo-creative',
    name: 'Creative Showcase Photo',
    description: 'Creative two-column with large sidebar photo',
    preview: '🎨',
    headerStyle: 'left-aligned',
    sectionLayout: 'two-column',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'normal',
    supportsPhoto: true,
    photoStyle: 'rounded',
    photoSize: 'xxlarge'
  },
  {
    id: 'normal-photo-elegant',
    name: 'Elegant Classic Photo',
    description: 'Classic elegant with refined photo placement',
    preview: '✨',
    headerStyle: 'centered',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'elegant',
    spacing: 'relaxed',
    supportsPhoto: true,
    photoStyle: 'rounded',
    photoSize: 'xxlarge'
  },
  {
    id: 'normal-photo-bold',
    name: 'Contemporary Bold Photo',
    description: 'Bold contemporary with striking photo',
    preview: '⚡',
    headerStyle: 'left-aligned',
    sectionLayout: 'single-column',
    colorScheme: 'natural',
    fontStyle: 'modern',
    spacing: 'normal',
    supportsPhoto: true,
    photoStyle: 'square',
    photoSize: 'xxlarge'
  }
];

// Filter templates by photo support
export const getTemplatesByPhotoSupport = (hasPhoto: boolean) => {
  return templates.filter(template => hasPhoto ? template.supportsPhoto : !template.supportsPhoto);
};

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
