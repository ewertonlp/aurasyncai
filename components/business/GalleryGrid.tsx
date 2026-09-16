export const GalleryGrid = () => {
  // Mock data - in real app this would come from Supabase
  const galleryItems = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/400x300/0066cc/ffffff?text=Product+1',
      createdAt: '2026-09-01',
      type: 'image'
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/400x300/00aa44/ffffff?text=Product+2',
      createdAt: '2026-09-02',
      type: 'video'
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/400x300/cc6600/ffffff?text=Product+3',
      createdAt: '2026-09-03',
      type: 'image'
    },
    {
      id: 4,
      imageUrl: 'https://via.placeholder.com/400x300/6600cc/ffffff?text=Product+4',
      createdAt: '2026-09-04',
      type: 'image'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map(item => (
          <div key={item.id} className="glass-container p-4 flex flex-col items-center">
            <div className="w-full h-32 mb-3">
              <img
                src={item.imageUrl}
                alt={`Product ${item.id}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5l11 7L8 19z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="text-center w-full">
              <p className="text-xs text-gray-500">{item.createdAt}</p>
              <p className="text-sm font-medium text-white">{item.type === 'image' ? 'Generated Image' : 'Generated Video'}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="btn-accent-blue px-6 py-2">
          Load More
        </button>
      </div>
    </div>
  );
};