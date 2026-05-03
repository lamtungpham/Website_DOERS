function StepCard({ phase, title, desc, icon, bg = "bg-white" }: { phase: string, title: string, desc: string, icon: string, bg?: string }) {
  return (
    <div className={`border-4 border-black p-8 ${bg} shadow-neo hover:-translate-x-2 hover:-translate-y-2 transition-all cursor-pointer relative overflow-hidden group min-h-[320px] flex flex-col`}>
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-black/5 rounded-full z-0 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary-container/20 rounded-full z-0 group-hover:scale-150 transition-transform duration-500 delay-75 mix-blend-multiply"></div>
      
      <div className="relative z-10 flex flex-col items-start gap-4 h-full flex-grow">
        <div className="border-4 border-black bg-primary-container p-3 shadow-neo bg-opacity-100">
          <span className="material-symbols-outlined text-white text-4xl block">{icon}</span>
        </div>
        
        <div className="mt-auto pt-10 flex flex-col gap-3">
          <span className="bg-black text-white text-xs font-bold px-3 py-1 uppercase w-max tracking-wider">{phase}</span>
          <h3 className="font-space font-bold uppercase text-2xl leading-tight">{title}</h3>
          <p className="text-base font-medium">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function StepsSection() {
  return (
    <section className="bg-surface-container py-24 px-8 border-b-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <h2 className="font-space text-4xl md:text-5xl font-bold uppercase inline-block border-b-4 border-black pb-2 w-max">
          HÀNH TRÌNH 3 BƯỚC
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          <StepCard 
            phase="GIAI ĐOẠN 1"
            title="ONLINE - HỌC TẬP"
            desc="Xây dựng nền tảng, nắm bắt công cụ AI để bứt phá hiệu suất."
            icon="laptop_mac"
          />
          <StepCard 
            phase="GIAI ĐOẠN 2"
            title="OFFLINE - TRẢI NGHIỆM"
            desc="Lao vào thực tế, cọ xát thị trường, đúc rút kinh nghiệm xương máu."
            icon="handshake"
            bg="bg-secondary-container"
          />
          <StepCard 
            phase="GIAI ĐOẠN 3"
            title="ONLINE - TRIỂN KHAI"
            desc="Thực thi chiến lược, tối ưu hóa quy trình và tạo ra doanh thu thật."
            icon="trending_up"
          />
        </div>
      </div>
    </section>
  );
}
