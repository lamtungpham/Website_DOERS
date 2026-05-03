import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const end = value;
      const duration = 2000;
      let startTime: number | null = null;
      let animationFrameId: number;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setDisplayValue(Math.floor(currentProgress * end));
        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setDisplayValue(end);
        }
      };
      
      animationFrameId = window.requestAnimationFrame(step);
      
      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsSection() {
  return (
    <section id="stats-section" className="bg-secondary-container py-16 px-8 border-b-4 border-black text-on-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-2 md:w-1/3 text-center md:text-left">
          <h2 className="font-space text-4xl md:text-5xl font-bold uppercase">CỘNG ĐỒNG<br/>ĐANG LỚN MẠNH</h2>
          <p className="font-be text-lg font-medium">Những con số biết nói từ những con người hành động.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-2/3">
          <div className="border-4 border-black bg-white p-6 shadow-neo text-center">
            <span className="font-space text-5xl font-black block text-primary-container"><AnimatedNumber value={87} /></span>
            <span className="font-space font-bold uppercase text-lg mt-2 block">DOER (TEEN)</span>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-neo text-center">
            <span className="font-space text-5xl font-black block text-primary-container"><AnimatedNumber value={5} /></span>
            <span className="font-space font-bold uppercase text-lg mt-2 block">BUSINESS OWNER</span>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-neo text-center">
            <span className="font-space text-5xl font-black block text-primary-container"><AnimatedNumber value={8} /></span>
            <span className="font-space font-bold uppercase text-lg mt-2 block">MENTOR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
