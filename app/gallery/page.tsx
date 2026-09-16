import { GalleryGrid } from '@/components/business/GalleryGrid';

export default function Gallery() {
  return (
    <div className="glass-container">
      <h2 className="text-2xl font-bold text-white mb-4">Your Media Gallery</h2>
      <GalleryGrid />
    </div>
  );
}