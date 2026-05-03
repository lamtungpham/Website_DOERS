import { HeroSection } from '@/src/components/home/HeroSection';
import { StatsSection } from '@/src/components/home/StatsSection';
import { StepsSection } from '@/src/components/home/StepsSection';
import { DiarySection } from '@/src/components/home/DiarySection';

export function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <StepsSection />
      <DiarySection />
    </div>
  );
}
