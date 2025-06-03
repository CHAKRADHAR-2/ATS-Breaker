const ResumePrintStyles = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
            /* Completely remove headers and footers */
            @top-left { content: "" !important; }
            @top-center { content: "" !important; }
            @top-right { content: "" !important; }
            @bottom-left { content: "" !important; }
            @bottom-center { content: "" !important; }
            @bottom-right { content: "" !important;
          }
          
          /* Hide everything except the resume */
          body * {
            visibility: hidden !important;
          }
          
          .print-area, .print-area * {
            visibility: visible !important;
          }
          
          .print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-shadow: none !important;
            border: none !important;
            page-break-inside: auto !important;
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
          }

          /* Remove browser default headers and footers */
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            width: 100% !important;
            height: auto !important;
          }
          
          /* Allow natural page breaks based on content */
          .resume-section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Hide any browser UI elements */
          .no-print {
            display: none !important;
          }
          
          /* Remove any browser chrome */
          body::before,
          body::after,
          html::before,
          html::after {
            display: none !important;
            content: "" !important;
          }
          
          /* Optimize text for printing */
          * {
            font-size: 12px !important;
            line-height: 1.4 !important;
            color: black !important;
          }
          
          h1 {
            font-size: 18px !important;
            font-weight: bold !important;
          }
          
          h2 {
            font-size: 14px !important;
            font-weight: 600 !important;
          }
          
          h3 {
            font-size: 13px !important;
            font-weight: 600 !important;
          }

          /* Make sure links don't break in print */
          a {
            color: inherit !important;
            text-decoration: none !important;
          }
        }
      `
    }} />
  );
};

export default ResumePrintStyles;
