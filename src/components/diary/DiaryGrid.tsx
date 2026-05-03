import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { useAuth } from '@/src/lib/AuthContext';
import { DiaryFormModal } from './DiaryFormModal';
import { DiaryDetailModal } from './DiaryDetailModal';
import { Plus, Edit2, Trash2, X, Pin, PinOff } from 'lucide-react';

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  tag: string;
  day: string;
  authorId: string;
  isPinned?: boolean;
}

const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export function DiaryGrid() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [entryToEdit, setEntryToEdit] = useState<DiaryEntry | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'diaries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs: DiaryEntry[] = [];
      snapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() } as DiaryEntry);
      });
      setEntries(docs);
    }, (error) => {
      console.error("Firestore error: ", error);
    });

    return () => unsubscribe();
  }, []);

  const confirmDelete = async () => {
    if (!entryToDelete) return;
    try {
      await deleteDoc(doc(db, 'diaries', entryToDelete));
      setEntryToDelete(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `diaries/${entryToDelete}`);
    }
  };

  const togglePin = async (entry: DiaryEntry) => {
    try {
      if (!entry.isPinned) {
        // If we want to unpin others, we can do it here, but let's just allow marking multiple, and Featured shows the latest pinned.
        // Actually, if we only want 1 pinned at a time, we should probably unpin the current ones.
        // Since we may not want complex batch writes here unless needed. Let's just toggle the `isPinned` for this entry. The Featured queries newest pinned.
      }
      await updateDoc(doc(db, 'diaries', entry.id), {
        isPinned: !entry.isPinned
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `diaries/${entry.id}`);
    }
  };

  const filteredEntries = selectedTag 
    ? entries.filter(e => e.tag?.toLowerCase() === selectedTag.toLowerCase())
    : entries;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-end border-b-4 border-black pb-4 flex-wrap gap-4">
        <div>
          <h2 className="font-space text-3xl font-bold uppercase">Các bài viết gần đây</h2>
          {selectedTag && (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-bold">Đang xem thẻ:</span>
              <span className="font-bold border-2 border-black px-2 py-1 bg-secondary-container text-on-background text-sm flex items-center gap-2">
                {selectedTag}
                <button onClick={() => setSelectedTag(null)} className="hover:text-red-600 cursor-pointer">
                  <X size={16} />
                </button>
              </span>
            </div>
          )}
        </div>
        {user && (
          <button 
            onClick={() => { setEntryToEdit(null); setIsFormOpen(true); }}
            className="cursor-pointer bg-primary-container text-on-primary font-bold px-4 py-2 border-4 border-black shadow-neo hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-neo-active transition-all uppercase flex items-center gap-2"
          >
            <Plus size={20} />
            Viết bài
          </button>
        )}
      </div>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEntries.map(entry => (
          <ArticleCard 
            key={entry.id}
            entry={entry}
            onClick={() => setSelectedEntry(entry)}
            onEdit={(e) => { e.stopPropagation(); setEntryToEdit(entry); setIsFormOpen(true); }}
            onDelete={(e) => { e.stopPropagation(); setEntryToDelete(entry.id); }}
            onTogglePin={(e) => { e.stopPropagation(); togglePin(entry); }}
            onTagClick={(tag) => setSelectedTag(tag)}
            isOwner={user?.uid === entry.authorId}
          />
        ))}
        {filteredEntries.length === 0 && (
          <div className="col-span-full text-center py-12 text-on-background/60 font-bold uppercase border-4 border-dashed border-black">
            Chưa có bài viết nào
          </div>
        )}
      </section>

      {entryToDelete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white border-4 border-black p-6 shadow-neo max-w-sm w-full">
            <h3 className="font-space font-bold text-xl uppercase mb-4">Xác nhận xóa</h3>
            <p className="font-be mb-6">Bạn có chắc chắn muốn xóa bài viết này không?</p>
            <div className="flex gap-4">
              <button onClick={() => setEntryToDelete(null)} className="flex-1 px-4 py-2 border-4 border-black font-bold uppercase hover:bg-gray-100">Hủy</button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 px-4 py-2 border-4 border-black bg-red-400 text-white font-bold uppercase hover:bg-red-500 hover:-translate-y-1 hover:shadow-neo transition-all"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <DiaryFormModal 
          isOpen={isFormOpen} 
          onClose={() => { setIsFormOpen(false); setEntryToEdit(null); }} 
          entryToEdit={entryToEdit} 
        />
      )}
      <DiaryDetailModal isOpen={!!selectedEntry} onClose={() => setSelectedEntry(null)} entry={selectedEntry} />
    </div>
  );
}

function ArticleCard({ entry, onClick, onEdit, onDelete, onTogglePin, onTagClick, isOwner }: { entry: DiaryEntry, onClick?: () => void, onEdit: (e: React.MouseEvent) => void, onDelete: (e: React.MouseEvent) => void, onTogglePin: (e: React.MouseEvent) => void, onTagClick: (tag: string) => void, isOwner: boolean }) {
  return (
    <article onClick={onClick} className="flex flex-col border-4 border-black bg-surface-container-lowest shadow-neo hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all cursor-pointer group relative">
      {entry.isPinned && (
        <div className="absolute top-2 left-2 z-20 bg-primary-container px-2 py-1 border-2 border-black font-bold text-xs uppercase flex items-center gap-1">
          <Pin size={12} className="fill-black" />
          Ghim
        </div>
      )}
      <div className="h-64 border-b-4 border-black overflow-hidden relative">
        <img src={entry.thumbnailUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt={entry.title} className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500`} />
      </div>
      <div className="p-6 flex flex-col gap-4 flex-grow bg-surface relative">
        {isOwner && (
          <div className="absolute top-4 right-4 flex gap-2 z-10 flex-col items-end">
            <div className="flex gap-2">
              <button onClick={onTogglePin} className="p-2 bg-blue-300 border-2 border-black hover:-translate-y-1 hover:shadow-neo transition-all rounded-full" title={entry.isPinned ? "Bỏ ghim" : "Ghim bài viết"}>
                {entry.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
              </button>
              <button onClick={onEdit} className="p-2 bg-yellow-300 border-2 border-black hover:-translate-y-1 hover:shadow-neo transition-all rounded-full" title="Sửa bài">
                <Edit2 size={16} />
              </button>
              <button onClick={onDelete} className="p-2 bg-red-400 border-2 border-black hover:-translate-y-1 hover:shadow-neo transition-all rounded-full" title="Xóa bài">
                <Trash2 size={16} className="text-white" />
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center pr-16 text-sm mt-4">
          <span className="font-bold border-2 border-black px-2 py-1 bg-surface-variant max-w-[100px] truncate">{entry.day}</span>
          <span 
            className="font-bold border-2 border-black px-2 py-1 bg-secondary-container text-on-background max-w-[100px] truncate hover:bg-neutral-800 hover:text-white transition-colors" 
            title={entry.tag}
            onClick={(e) => { e.stopPropagation(); onTagClick(entry.tag); }}
          >
            {entry.tag}
          </span>
        </div>
        <h3 className="font-space text-2xl font-bold uppercase group-hover:text-primary-container transition-colors leading-tight h-16 line-clamp-2">{entry.title}</h3>
        <p className="font-be text-base text-on-surface-variant font-medium line-clamp-3 whitespace-pre-wrap">{stripHtml(entry.content)}</p>
      </div>
    </article>
  );
}


