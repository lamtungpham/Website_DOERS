import { useState, useRef, useEffect } from 'react';
import { X, Image as ImageIcon, Video, Code } from 'lucide-react';
import { useAuth } from '@/src/lib/AuthContext';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { DiaryEntry } from './DiaryGrid';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface DiaryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  entryToEdit?: DiaryEntry | null;
}

export function DiaryFormModal({ isOpen, onClose, entryToEdit }: DiaryFormModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState(entryToEdit?.title || '');
  const [content, setContent] = useState(entryToEdit?.content || '');
  const [tag, setTag] = useState(entryToEdit?.tag || '');
  const [thumbnailBase64, setThumbnailBase64] = useState(entryToEdit?.thumbnailUrl || '');
  const [videoUrl, setVideoUrl] = useState(entryToEdit?.videoUrl || '');
  const [loading, setLoading] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (entryToEdit) {
      setTitle(entryToEdit.title);
      setContent(entryToEdit.content);
      setTag(entryToEdit.tag);
      setThumbnailBase64(entryToEdit.thumbnailUrl || '');
      setVideoUrl(entryToEdit.videoUrl || '');
    } else {
      setTitle('');
      setContent('');
      setTag('');
      setThumbnailBase64('');
      setVideoUrl('');
    }
  }, [entryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Truncate if too huge to avoid firestore limits, but we let user be careful
      if (base64String.length > 800000) {
        alert("Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn (dưới 500KB) để tránh giới hạn dữ liệu.");
        return;
      }
      setThumbnailBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!content.trim() || content === '<p><br></p>') {
      alert("Vui lòng nhập nội dung!");
      return;
    }
    setLoading(true);

    try {
      if (entryToEdit) {
        await updateDoc(doc(db, 'diaries', entryToEdit.id), {
          title,
          content,
          thumbnailUrl: thumbnailBase64,
          videoUrl,
          tag: tag || 'General',
          updatedAt: serverTimestamp(),
        });
      } else {
        const d = new Date();
        const formattedDate = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        
        await addDoc(collection(db, 'diaries'), {
          title,
          content,
          thumbnailUrl: thumbnailBase64,
          videoUrl,
          tag: tag || 'General',
          day: formattedDate,
          authorId: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      onClose();
      // Reset form
      setTitle(''); setContent(''); setThumbnailBase64(''); setVideoUrl(''); setTag('');
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Đã xảy ra lỗi khi lưu bài viết. Chi tiết trong console.");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white border-4 border-black w-full max-w-4xl shadow-neo max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b-4 border-black bg-primary-container text-on-primary shrink-0">
          <h2 className="font-space font-bold text-xl uppercase">{entryToEdit ? "Sửa bài viết" : "Viết nhật ký mới"}</h2>
          <button type="button" onClick={onClose} className="p-1 hover:bg-black/20 rounded-full transition-colors"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 overflow-y-auto">
          <div>
            <label className="block font-bold uppercase mb-2 text-sm">Tiêu đề</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full p-3 bg-surface-container border-4 border-black font-be font-medium focus:outline-none focus:border-primary-container shadow-neo" placeholder="Nhập tiêu đề" />
          </div>
          
          <div>
            <label className="block font-bold uppercase mb-2 text-sm">Tag</label>
            <input value={tag} onChange={e => setTag(e.target.value)} type="text" className="w-full md:w-1/2 p-3 bg-surface-container border-4 border-black font-be font-medium focus:outline-none focus:border-primary-container shadow-neo" placeholder="VD: Tech, Leadership..." />
          </div>

          <div>
            <label className="block font-bold uppercase mb-2 text-sm">Ảnh Thumbnail / Ảnh bìa</label>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-secondary-container border-4 border-black px-4 py-2 font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-neo active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
                <ImageIcon size={20} /> Chọn ảnh (dưới 500KB)
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
              {thumbnailBase64 && <span className="font-bold text-sm text-green-600">Đã chọn ảnh!</span>}
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase mb-2 text-sm">Video bìa (YouTube/Vimeo URL hoặc link MP4)</label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" size={20} />
              <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} type="text" className="w-full p-3 pl-10 bg-surface-container border-4 border-black font-be font-medium focus:outline-none focus:border-primary-container shadow-neo" placeholder="Nhập địa chỉ video..." />
            </div>
          </div>

          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-end mb-2">
              <label className="block font-bold uppercase text-sm">Nội dung</label>
              <button 
                type="button" 
                onClick={() => setIsHtmlMode(!isHtmlMode)}
                className="text-xs font-bold border-2 border-black px-2 py-1 bg-surface-variant hover:-translate-y-[1px] hover:shadow-neo transition-all flex items-center gap-1 cursor-pointer"
              >
                <Code size={14} />
                {isHtmlMode ? "Chuyển sang soạn thảo" : "Chỉnh sửa mã HTML / Mã nhúng"}
              </button>
            </div>
            <div className={`border-4 border-black shadow-neo bg-surface-container ${isHtmlMode ? 'p-0' : ''}`}>
              {isHtmlMode ? (
                <textarea 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  className="w-full h-[300px] p-4 font-mono text-sm focus:outline-none resize-none bg-surface-container-lowest"
                  placeholder="<p>Nhập hoặc dán mã HTML / Iframe / Mã nhúng của bạn vào đây...</p>"
                />
              ) : (
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={modules}
                  className="h-[300px] font-be flex flex-col"
                />
              )}
            </div>
          </div>

          <button disabled={loading} type="submit" className="mt-12 md:mt-4 bg-primary-container text-on-primary font-space font-bold text-xl px-6 py-4 border-4 border-black shadow-neo hover:-translate-x-1 hover:-translate-y-1 transition-all active:translate-x-1 active:translate-y-1 active:shadow-neo-active uppercase disabled:opacity-50 shrink-0">
            {loading ? "Đang lưu..." : (entryToEdit ? "Lưu thay đổi" : "Đăng bài")}
          </button>
        </form>
      </div>
    </div>
  );
}
