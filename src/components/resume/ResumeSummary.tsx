
interface ResumeSummaryProps {
  summary: string;
}

const ResumeSummary = ({ summary }: ResumeSummaryProps) => {
  if (!summary) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
        PROFESSIONAL SUMMARY
      </h2>
      <p className="text-gray-700 leading-relaxed">
        {summary}
      </p>
    </div>
  );
};

export default ResumeSummary;
