export const CreditCounter = () => {
  // In a real app, this would come from a hook or context
  const credits = 142; // Example value

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-gray-400">
        <span>Available Credits</span>
        <span className="text-2xl font-bold text-white">{credits}</span>
      </div>
      <div className="bg-gray-800/50 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full w-[71%]"></div> {/* 142/200 */}
      </div>
      <p className="text-xs text-gray-500">
        {credits}/200 credits used this month
      </p>
    </div>
  );
};