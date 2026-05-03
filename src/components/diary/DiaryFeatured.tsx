import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';
import { DiaryEntry } from './DiaryGrid';
import { DiaryDetailModal } from './DiaryDetailModal';

export function DiaryFeatured() {
  const [featuredEntry, setFeaturedEntry] = useState<DiaryEntry | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'diaries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let newest: DiaryEntry | null = null;
      let pinned: DiaryEntry | null = null;
      
      let index = 0;
      snapshot.forEach(doc => {
        const data = { id: doc.id, ...doc.data() } as DiaryEntry;
        if (index === 0) newest = data;
        if (data.isPinned && !pinned) {
          pinned = data;
        }
        index++;
      });
      
      setFeaturedEntry(pinned || newest);
    });

    return () => unsubscribe();
  }, []);

  if (!featuredEntry) return null;

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <>
      <section className="flex flex-col md:flex-row border-4 border-black bg-surface-container-lowest shadow-neo transition-transform">
        <div className="w-full md:w-2/3 border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden relative min-h-[400px]">
          {featuredEntry.thumbnailUrl ? (
            <img 
              src={featuredEntry.thumbnailUrl} 
              alt={featuredEntry.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500" 
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-neutral-200 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Featured report image background" 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500" 
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 p-8 flex flex-col justify-between gap-8 bg-surface">
          <div className="flex flex-col gap-5">
            <span className="bg-secondary-container text-on-background font-bold px-3 py-1 border-2 border-black inline-block w-max shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-sm uppercase tracking-wide">
              {featuredEntry.day}
            </span>
            <h2 className="font-space text-4xl lg:text-3xl font-bold uppercase leading-tight line-clamp-3">
              {featuredEntry.title}
            </h2>
            <p className="font-be text-lg text-on-surface-variant font-medium line-clamp-4 whitespace-pre-wrap">
              {stripHtml(featuredEntry.content)}
            </p>
          </div>
          <button 
            onClick={() => setSelectedEntry(featuredEntry)}
            className="cursor-pointer w-full bg-primary-container text-on-primary font-space font-bold text-xl px-4 py-4 border-4 border-black shadow-neo hover:-translate-x-1 hover:-translate-y-1 transition-all active:translate-x-1 active:translate-y-1 active:shadow-neo-active uppercase"
          >
            Đọc bài viết đầy đủ
          </button>
        </div>
      </section>

      <DiaryDetailModal isOpen={!!selectedEntry} onClose={() => setSelectedEntry(null)} entry={selectedEntry} />
    </>
  );
}

