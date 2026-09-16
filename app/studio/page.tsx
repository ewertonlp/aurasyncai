import { ImageGeneratorForm } from '@/components/business/ImageGeneratorForm';
import { ResultComparison } from '@/components/business/ResultComparison';

export default function Studio() {
  return (
    <div className="space-y-8">
      <div className="glass-container">
        <h2 className="text-2xl font-bold text-white mb-4">AI Media Studio</h2>
        <ImageGeneratorForm />
      </div>

      <div className="glass-container">
        <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
        <ResultComparison
          originalUrl="https://via.placeholder.com/800x600/666666/ffffff?text=Original+Product"
          generatedImageUrl="https://via.placeholder.com/800x600/0066cc/ffffff?text=Generated+Image"
          generatedVideoUrl="https://via.placeholder.com/800x600/00aa44/ffffff?text=Generated+Video"
        />
      </div>
    </div>
  );
}