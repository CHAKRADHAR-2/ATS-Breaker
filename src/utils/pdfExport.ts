
export const handlePDFExport = (activeSection: string, setActiveSection: (section: string) => void) => {
  // First switch to preview mode if not already there
  if (activeSection !== "preview") {
    setActiveSection("preview");
  }
  
  // Wait for the component to render, then trigger the export from ResumePreview
  setTimeout(() => {
    const exportButton = document.querySelector('[data-export="pdf"]') as HTMLButtonElement;
    if (exportButton) {
      exportButton.click();
    } else {
      // Fallback to the original export logic
      const resumeElement = document.querySelector('.print-area');
      
      if (resumeElement) {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Resume</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                @page {
                  margin: 0.5in;
                  size: A4;
                  @top-left { content: ""; }
                  @top-center { content: ""; }
                  @top-right { content: ""; }
                  @bottom-left { content: ""; }
                  @bottom-center { content: ""; }
                  @bottom-right { content: ""; }
                }
                
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  -webkit-print-color-adjust: exact !important;
                  color-adjust: exact !important;
                }
                
                html, body {
                  font-family: system-ui, -apple-system, sans-serif;
                  background: white;
                  color: black;
                  font-size: 12px;
                  line-height: 1.4;
                  width: 100%;
                  height: auto;
                }
                
                .resume-section {
                  page-break-inside: avoid;
                  break-inside: avoid;
                  margin-bottom: 16px;
                }
                
                h1 { font-size: 18px; font-weight: bold; margin: 0 0 8px 0; }
                h2 { font-size: 14px; font-weight: 600; margin: 16px 0 8px 0; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px; }
                h3 { font-size: 13px; font-weight: 600; margin: 8px 0 4px 0; }
                p, li { margin: 4px 0; }
                ul { margin: 0; padding-left: 16px; }
                
                .text-center { text-align: center; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .items-center { align-items: center; }
                .items-start { align-items: flex-start; }
                .gap-1 { gap: 4px; }
                .gap-2 { gap: 8px; }
                .gap-3 { gap: 12px; }
                .gap-4 { gap: 16px; }
                .flex-wrap { flex-wrap: wrap; }
                .flex-wrap > * { margin-right: 8px; margin-bottom: 2px; }
                .flex-wrap > *:last-child { margin-right: 0; }
                
                /* Template-specific spacing */
                .template-compact-photo-executive .flex-wrap > *,
                .template-compact-photo-modern .flex-wrap > *,
                .template-compact-photo-sidebar .flex-wrap > *,
                .template-compact-photo-minimal .flex-wrap > *,
                .template-compact-photo-professional .flex-wrap > * {
                  margin-right: 6px;
                  margin-bottom: 1px;
                }
                .mb-2 { margin-bottom: 8px; }
                .mb-3 { margin-bottom: 12px; }
                .mb-6 { margin-bottom: 24px; }
                .pb-1 { padding-bottom: 4px; }
                .pb-6 { padding-bottom: 24px; }
                .ml-2 { margin-left: 8px; }
                .space-y-1 > * + * { margin-top: 4px; }
                .space-y-2 > * + * { margin-top: 8px; }
                .space-y-3 > * + * { margin-top: 12px; }
                .space-y-4 > * + * { margin-top: 16px; }
                .border-b { border-bottom: 1px solid #e5e5e5; }
                .text-sm { font-size: 11px; }
                .text-xs { font-size: 10px; }
                .text-base { font-size: 12px; }
                .text-lg { font-size: 14px; }
                .text-xl { font-size: 16px; }
                .text-2xl { font-size: 18px; }
                .font-semibold { font-weight: 600; }
                .font-medium { font-weight: 500; }
                .font-bold { font-weight: 700; }
                .text-gray-600 { color: #666; }
                .text-gray-700 { color: #555; }
                .text-gray-900 { color: #000; }
                .bg-gray-100 { background-color: #f5f5f5; }
                .px-2 { padding-left: 8px; padding-right: 8px; }
                .py-1 { padding-top: 4px; padding-bottom: 4px; }
                .rounded { border-radius: 4px; }
                .flex-wrap { flex-wrap: wrap; }
                .justify-center { justify-content: center; }
                .text-right { text-align: right; }
                .leading-relaxed { line-height: 1.6; }
                .list-disc { list-style-type: disc; }
                .list-inside { list-style-position: inside; }
                .border-gray-200 { border-color: #e5e5e5; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                .col-span-2 { grid-column: span 2 / span 2; }
                
                .w-3 { width: 12px; }
                .h-3 { height: 12px; }
                
                svg {
                  display: inline-block;
                  vertical-align: middle;
                  width: 12px;
                  height: 12px;
                }

                a {
                  color: inherit;
                  text-decoration: none;
                }
                
                /* Photo styles */
                img {
                  max-width: 100%;
                  height: auto;
                  display: block;
                }
                .w-16 { width: 64px; }
                .h-16 { height: 64px; }
                .w-20 { width: 80px; }
                .h-20 { height: 80px; }
                .w-24 { width: 96px; }
                .h-24 { height: 96px; }
                .w-28 { width: 112px; }
                .h-28 { height: 112px; }
                .w-32 { width: 128px; }
                .h-32 { height: 128px; }
                .w-40 { width: 160px; }
                .h-40 { height: 160px; }
                .rounded-full { border-radius: 50%; }
                .rounded-lg { border-radius: 8px; }
                .rounded-none { border-radius: 0; }
                .object-cover { object-fit: cover; }
                .border-2 { border-width: 2px; }
                .border-gray-200 { border-color: #e5e7eb; }
                .flex-shrink-0 { flex-shrink: 0; }
              </style>
            </head>
            <body>
              ${resumeElement.innerHTML}
              <script>
                window.onload = function() {
                  setTimeout(function() {
                    window.print();
                    setTimeout(function() {
                      window.close();
                    }, 100);
                  }, 100);
                };
              </script>
            </body>
            </html>
          `);
          
          printWindow.document.close();
          printWindow.focus();
        }
      } else {
        window.print();
      }
    }
  }, 200);
};
