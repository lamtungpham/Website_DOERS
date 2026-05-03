import { Zap, Store, GraduationCap } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PathId } from '@/src/pages/Register';

export const PATHS = [
  { id: 'doers' as PathId, label: 'DOERS (TEEN)', icon: Zap },
  { id: 'business' as PathId, label: 'BUSINESS OWNERS', icon: Store },
  { id: 'mentors' as PathId, label: 'MENTORS', icon: GraduationCap },
];

interface RegisterSidebarProps {
  activePath: PathId;
  setActivePath: (path: PathId) => void;
}

export function RegisterSidebar({ activePath, setActivePath }: RegisterSidebarProps) {
  return (
    <div className="w-full lg:w-1/3 bg-primary-container border-b-4 lg:border-b-0 lg:border-r-4 border-black p-6 flex flex-col gap-2">
      <h2 className="font-space text-2xl font-bold text-on-primary-container uppercase mb-6">Chọn vai trò của bạn</h2>
      
      {PATHS.map((path) => {
        const Icon = path.icon;
        const isActive = activePath === path.id;
        
        return (
          <button
            key={path.id}
            onClick={() => setActivePath(path.id)}
            className={cn(
              "w-full text-left p-4 font-bold uppercase transition-all flex items-center justify-between",
              isActive 
                ? "bg-surface border-4 border-black text-black shadow-neo -translate-y-1 -translate-x-1" 
                : "bg-transparent border-4 border-transparent text-on-primary hover:text-white hover:border-black/20",
              "cursor-pointer"
            )}
          >
            <span>{path.label}</span>
            <Icon className={isActive ? "text-black" : "text-on-primary-container"} size={20} />
          </button>
        )
      })}

      <div className="mt-auto pt-8">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
          alt="Action shot" 
          className="w-full h-48 object-cover border-4 border-black shadow-neo filter grayscale"
        />
      </div>
    </div>
  );
}
