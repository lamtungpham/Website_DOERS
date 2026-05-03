import { useState } from 'react';
import { RegisterSidebar, PATHS } from '@/src/components/register/RegisterSidebar';
import { RegisterForm } from '@/src/components/register/RegisterForm';

export type PathId = 'doers' | 'business' | 'mentors';

export function Register() {
  const [activePath, setActivePath] = useState<PathId>('doers');

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 p-8 md:p-12">
      {/* Headline */}
      <div className="text-center">
        <h1 className="font-space text-5xl md:text-6xl font-bold uppercase mb-4 tracking-tighter border-b-4 border-black inline-block pb-2">
          Tham gia cùng DOERS
        </h1>
        <p className="font-be text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium mt-4">
          Bắt đầu hành động ngay bằng cách điền form bên dưới nhé cả nhà!
        </p>
      </div>

      {/* Registration Module */}
      <div className="bg-surface border-4 border-black p-0 shadow-neo-lg flex flex-col lg:flex-row overflow-hidden">
        <RegisterSidebar activePath={activePath} setActivePath={setActivePath} />
        <RegisterForm activePath={activePath} pathLabel={PATHS.find(p => p.id === activePath)?.label || ''} />
      </div>
    </div>
  );
}
