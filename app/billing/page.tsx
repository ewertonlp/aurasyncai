export default function Billing() {
  return (
    <div className="glass-container">
      <h2 className="text-2xl font-bold text-white mb-4">Billing & Settings</h2>
      <div className="space-y-6">
        <div className="glass-container p-6">
          <h3 className="font-semibold text-white mb-3">Current Plan</h3>
          <p className="text-gray-400 mb-4">Pro Plan • $29/month</p>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
        </div>

        <div className="glass-container p-6">
          <h3 className="font-semibold text-white mb-3">Usage This Month</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-400">
              <span>Images Generated</span>
              <span>142/500</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2.5 mb-2">
              <div className="bg-blue-600 h-2.5 rounded-full w-[56%]"></div>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Videos Generated</span>
              <span>23/50</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full w-[46%]"></div>
            </div>
          </div>
        </div>

        <div className="glass-container p-6">
          <h3 className="font-semibold text-white mb-3">Billing History</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-400">
              <span>Oct 2026</span>
              <span>$29.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Sep 2026</span>
              <span>$29.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Aug 2026</span>
              <span>$29.00</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="btn-accent-blue px-6 py-2">
            Update Payment Method
          </a>
        </div>
      </div>
    </div>
  );
}