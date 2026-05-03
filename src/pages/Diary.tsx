import { DiaryFeatured } from '@/src/components/diary/DiaryFeatured';
import { DiaryGrid } from '@/src/components/diary/DiaryGrid';

export function Diary() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-16">
      <DiaryFeatured />
      <DiaryGrid />
    </div>
  );
}
