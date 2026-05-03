import { X } from 'lucide-react';
import DOMPurify from 'dompurify';

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  tag: string;
  day: string;
  authorId: string;
}

interface DiaryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: DiaryEntry | null;
}

export function DiaryDetailModal({ isOpen, onClose, entry }: DiaryDetailModalProps) {
  if (!isOpen || !entry) return null;

  // Simple video embed generator
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // Check for YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    
    // Check for Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    return null;
  };

  const embedUrl = getEmbedUrl(entry.videoUrl || '');
  const isDirectVideo = entry.videoUrl && !embedUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-8 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white border-4 border-black w-full max-w-4xl shadow-neo max-h-[90vh] flex flex-col relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b-4 border-black bg-primary-container text-on-primary shrink-0">
          <h2 className="font-space font-bold text-xl uppercase truncate pr-4">{entry.title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-full transition-colors cursor-pointer shrink-0"><X size={24} /></button>
        </div>
        
        <div className="flex-grow overflow-y-auto bg-surface">
          {entry.thumbnailUrl && !entry.videoUrl && (
            <div className="w-full h-48 md:h-80 border-b-4 border-black">
              <img src={entry.thumbnailUrl} alt={entry.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 md:p-10 flex flex-col gap-6">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="font-bold border-2 border-black px-3 py-1 bg-surface-variant text-sm uppercase">{entry.day}</span>
              <span className="font-bold border-2 border-black px-3 py-1 bg-secondary-container text-on-background text-sm uppercase">{entry.tag}</span>
            </div>

            <h1 className="font-space text-3xl md:text-5xl font-black uppercase leading-tight">{entry.title}</h1>

            {embedUrl && (
              <div className="w-full aspect-video border-4 border-black shadow-neo mt-4 relative bg-black">
                <iframe 
                  src={embedUrl} 
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            {isDirectVideo && (
              <div className="w-full aspect-video border-4 border-black shadow-neo mt-4 relative bg-black flex items-center justify-center">
                <video 
                  src={entry.videoUrl} 
                  controls 
                  playsInline
                  autoPlay={false}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            )}

            <div 
              className="mt-4 font-be text-lg leading-relaxed whitespace-pre-wrap prose prose-lg prose-p:font-be max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(entry.content, { 
                  ADD_TAGS: ['iframe'], 
                  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'style', 'target'] 
                }) 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
