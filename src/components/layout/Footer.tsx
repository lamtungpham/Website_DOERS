import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary-container border-t-4 border-black flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 gap-6 mt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center w-full justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-black text-black">DOERS</div>
        
        <div className="text-sm font-bold uppercase w-48 text-center md:text-left">
          DỰ ÁN MIỄN PHÍ & TỰ NGUYỆN.
        </div>

        <div className="text-black font-space font-bold uppercase text-center md:text-right">
          © 2026 DOERS. HÀNH ĐỘNG ĐỂ KIẾN TẠO.
        </div>
      </div>
    </footer>
  );
}
