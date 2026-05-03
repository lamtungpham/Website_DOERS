import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import day1Image from '@/src/assets/images/regenerated_image_1777806689389.jpg';
import dataReviewImage from '@/src/assets/images/regenerated_image_1777806691268.jpg';
import thucChienSaleImage from '@/src/assets/images/regenerated_image_1777806692873.jpg';

export function DiarySection() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-black pb-8">
          <div className="flex flex-col gap-6">
            <h2 className="font-space text-4xl md:text-5xl font-bold uppercase">NHẬT KÝ DỰ ÁN</h2>
            <Link to="/diary" className="cursor-pointer bg-secondary-container border-4 border-black px-6 py-3 shadow-neo font-bold text-xl inline-block w-max hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-neo-active transition-all uppercase">
              Xem toàn bộ nhật ký
            </Link>
          </div>
          
          <div className="flex flex-col gap-6 w-full md:max-w-sm shrink-0">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-bold text-sm uppercase">
                <span>DỰ ÁN PILOT</span>
                <span>70%</span>
              </div>
              <div className="h-6 border-4 border-black bg-surface-container relative w-full overflow-hidden shadow-neo">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="absolute top-0 left-0 h-full bg-secondary-container border-r-4 border-black"
                ></motion.div>
              </div>
            </div>
            <div className="flex flex-col gap-2 opacity-60">
              <div className="flex justify-between font-bold text-sm uppercase">
                <span>CÁC DỰ ÁN KHÁC</span>
                <span>Sắp diễn ra</span>
              </div>
              <div className="h-6 border-4 border-black bg-white relative w-full overflow-hidden shadow-neo">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #e5e7eb 10px, #e5e7eb 20px)' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_auto] gap-8 pb-8">
          <motion.div 
            className="md:col-span-1 md:row-span-2 border-4 border-black relative group cursor-pointer overflow-hidden shadow-neo-lg bg-black transition-all border-b-8"
          >
            <img src={day1Image} alt="Day 1" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 min-h-[400px]" />
            <div className="absolute inset-0 bg-primary-container mix-blend-color opacity-30"></div>
            <div className="absolute bottom-0 w-full p-6 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-white text-2xl uppercase">DAY 1: KHỞI ĐỘNG</h3>
              <PlayCircle className="text-white w-10 h-10 group-hover:text-secondary-container transition-colors" />
            </div>
          </motion.div>

          <motion.div 
            className="border-4 border-black relative group cursor-pointer overflow-hidden shadow-neo bg-black transition-all border-b-8 h-[250px]"
          >
            <img src={dataReviewImage} alt="Data Review" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-secondary-container mix-blend-color opacity-30"></div>
            <div className="absolute bottom-0 w-full p-4 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-white text-lg uppercase">DATA REVIEW</h3>
              <PlayCircle className="text-white w-6 h-6 group-hover:text-primary-container transition-colors" />
            </div>
          </motion.div>
          
          <div className="border-4 border-black bg-surface-container flex items-center justify-center p-8 shadow-neo hover:-translate-x-1 hover:-translate-y-1 transition-transform border-b-8 h-[250px]">
            <h3 className="font-space font-bold text-3xl text-center uppercase text-black leading-tight">HƠN 120 GIỜ<br/>THỰC HÀNH</h3>
          </div>

          <motion.div 
            className="md:col-span-2 border-4 border-black relative group cursor-pointer overflow-hidden shadow-neo bg-black transition-all border-b-8 h-[250px]"
          >
            <img src={thucChienSaleImage} alt="Thực chiến sale" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-0 w-full p-6 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-white text-2xl uppercase">THỰC CHIẾN SALE</h3>
              <PlayCircle className="text-white w-10 h-10 group-hover:text-secondary-container transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
