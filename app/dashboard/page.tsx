import { CreditCounter } from '@/components/business/CreditCounter';
import { PlanSelector } from '@/components/business/PlanSelector';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="glass-container">
        <h2 className="text-2xl font-bold text-white mb-4">Dashboard</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-container p-6">
            <h3 className="font-semibold text-white mb-3">Your Credits</h3>
            <CreditCounter />
          </div>
          <div className="glass-container p-6">
            <h3 className="font-semibold text-white mb-3">Your Plan</h3>
            <PlanSelector />
          </div>
        </div>
      </div>

      <div className="glass-container">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/studio" className="btn-accent-blue flex-1 px-6 py-3">
            Create New Media
          </a>
          <a href="/gallery" className="btn-accent-green flex-1 px-6 py-3">
            View Gallery
          </a>
        </div>
      </div>
    </div>
  );
}