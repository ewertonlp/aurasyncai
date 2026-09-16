export const PlanSelector = () => {
  return (
    <div className="space-y-4">
      <p className="text-gray-400 text-sm">
        Select a plan to see details
      </p>
      <div className="flex flex-col space-y-3">
        <div className="glass-container p-4">
          <h3 className="font-medium text-white mb-2">Free</h3>
          <p className="text-gray-400 text-sm">$0/month</p>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">10 credits/month</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Basic features</span>
          </div>
          <button className="w-full btn-accent-blue mt-4 px-4 py-2">
            Select Plan
          </button>
        </div>

        <div className="glass-container p-4">
          <h3 className="font-medium text-white mb-2">Pro</h3>
          <p className="text-gray-400 text-sm">$29/month</p>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">500 credits/month</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">All features</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Priority support</span>
          </div>
          <button className="w-full btn-accent-green mt-4 px-4 py-2">
            Select Plan
          </button>
        </div>

        <div className="glass-container p-4">
          <h3 className="font-medium text-white mb-2">Enterprise</h3>
          <p className="text-gray-400 text-sm">Custom pricing</p>
          <div className="flex items-center space-x-2 mt-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Custom credits</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Advanced features</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm">Dedicated account manager</span>
          </div>
          <button className="w-full btn-accent-gold mt-4 px-4 py-2">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};