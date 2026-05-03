import { Link } from 'react-router-dom';
import heroImage from '@/src/assets/images/regenerated_image_1777806687192.jpg';

export function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row w-full border-b-4 border-black">
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center gap-8 bg-surface">
        <div className="bg-secondary-container border-4 border-black p-4 shadow-neo hover:-translate-x-1 hover:-translate-y-1 transition-transform inline-block w-max transform rotate-1">
          <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight transform -rotate-1">
            DOERS - LÀM THẬT,<br />HỌC THẬT!
          </h1>
        </div>
        
        <p className="font-be text-lg md:text-xl max-w-md mt-4 font-medium">
          không phải là đi cho vui, mà là nơi bọn mình có thể trải nghiệm thật và cùng các cô chú hoc làm thương hiệu, tạo kênh bán hàng để tạo ra kết quả thật.
        </p>
        
        <div className="flex flex-wrap gap-6 mt-8">
          <Link 
            to="/register" 
            className="cursor-pointer bg-primary-container text-on-primary font-bold px-8 py-4 border-4 border-black shadow-neo hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-neo-active transition-all uppercase text-lg"
          >
            BẮT ĐẦU NGAY
          </Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="cursor-pointer bg-secondary-container text-on-background font-bold px-8 py-4 border-4 border-black shadow-neo hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-neo-active transition-all uppercase text-lg"
          >
            TÌM HIỂU THÊM
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 border-l-0 md:border-l-4 border-black border-t-4 md:border-t-0 bg-primary-container p-6 relative min-h-[400px]">
        <div className="absolute inset-0 bg-primary-container opacity-20 mix-blend-multiply z-10"></div>
        <img 
          src={heroImage} 
          alt="Team working" 
          className="w-full h-full object-cover border-4 border-black transition-all duration-700"
        />
      </div>
    </section>
  );
}
