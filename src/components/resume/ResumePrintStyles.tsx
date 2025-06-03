const ResumePrintStyles = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
            /* Hide headers and footers completely */
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
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
          }

          /* Remove browser default headers and footers */
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Ensure proper page breaks */
          .resume-section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Hide any browser UI elements */
          .no-print {
            display: none !important;
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
        }
      `
    }} />
  );
};

export default ResumePrintStyles;
