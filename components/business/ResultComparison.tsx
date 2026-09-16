export const ResultComparison = ({
  originalUrl,
  generatedImageUrl,
  generatedVideoUrl,
}: {
  originalUrl: string;
  generatedImageUrl: string;
  generatedVideoUrl: string;
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-container p-4">
          <h3 className="font-medium text-white mb-3">Original</h3>
          <img
            src={originalUrl}
            alt="Original product"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="glass-container p-4 space-y-4">
          <h3 className="font-medium text-white mb-3">Generated Media</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>Image</span>
              <a href={generatedImageUrl} target="_blank" rel="noopener noreferrer" className="btn-accent-blue px-3 py-1 text-xs">
                Download
              </a>
            </div>
            <img
              src={generatedImageUrl}
              alt="Generated image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-gray-400 text-sm">
              <span>Video</span>
              <a href={generatedVideoUrl} target="_blank" rel="noopener noreferrer" className="btn-accent-green px-3 py-1 text-xs">
                Download
              </a>
            </div>
            <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5l11 7L8 19z"></path>
              </svg>
              <span className="ml-2 text-gray-400">Generated Video Preview</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-container p-4">
        <h3 className="font-medium text-white mb-3">Improvements</h3>
        <div className="space-y-2 text-gray-400 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Background removal and enhancement</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Professional lighting and shadows</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Optimized aspect ratio for e-commerce</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Color correction and vibrance boost</span>
          </div>
        </div>
      </div>
    </div>
  );
};