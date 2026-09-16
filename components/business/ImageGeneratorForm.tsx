'use client';

import { useState } from 'react';
import { UploadZone } from './UploadZone';
import { ResultComparison } from './ResultComparison';

export const ImageGeneratorForm = () => {
  const [url, setUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ imageUrl: string; videoUrl: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setProcessing(true);
    // TODO: Implement actual AI generation API call
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock result - in real app this would come from API
    setResult({
      imageUrl: 'https://via.placeholder.com/800x600/0066cc/ffffff?text=Generated+Image',
      videoUrl: 'https://via.placeholder.com/800x600/00aa44/ffffff?text=Generated+Video'
    });

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Product URL
        </label>
        <div className="flex items-center gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="https://example.com/product-url"
            required
          />
          <button
            type="submit"
            disabled={processing || !url.trim()}
            className={`btn-accent-blue px-6 py-2 ${processing ? 'opacity-70' : ''}`}
          >
            {processing ? 'Generating...' : 'Generate Media'}
          </button>
        </div>
        {processing && (
          <p className="text-xs text-gray-400 mt-2">
            AI is analyzing your product and generating optimized media...
          </p>
        )}
      </div>

      <UploadZone
        alternateLabel="Or drop product images here to enhance"
        onFileUpload={(files) => {
          // Handle file upload logic
          console.log('Files uploaded:', files);
        }}
      />

      {result && (
        <div className="mt-8">
          <ResultComparison
            originalUrl="https://via.placeholder.com/800x600/666666/ffffff?text=Original+Product"
            generatedImageUrl={result.imageUrl}
            generatedVideoUrl={result.videoUrl}
          />
        </div>
      )}
    </form>
  );
};