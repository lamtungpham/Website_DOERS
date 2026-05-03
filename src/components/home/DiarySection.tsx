import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
const day1Image = "https://scontent.fhan2-5.fna.fbcdn.net/v/t51.82787-15/598696524_17869402215492032_196568958758583279_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=R-TNyvGjTuAQ7kNvwHY-CJ4&_nc_oc=AdqMc89eRaUE6qE-bShtoX89PawR1P83k5BLmdNx5Jc4MsqbsioMVAi3b6fwUF5bXSRwEoLU3M3tpQiQsPk6IdaY&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=T9AQ1Qa_xH_N0NtyFwerNA&_nc_ss=7b2a8&oh=00_Af5Y7nqB_rF6-CyodyxVnZfH6_CjXQP3PWp1XBjlBsfmPg&oe=69FD0E27";
const dataReviewImage = "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/474897015_122141191604553991_907753041860819748_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yJOK1PKn728Q7kNvwHlJAeZ&_nc_oc=AdqB09T8wqF_hGApKB2HdMi4vyqkmPo0sPUSLoSgFSmOPUs365cgDM9nvezBPQkC_WOCG_JBjyTBhgeTDA8ZYYxE&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=xqc8_6yb2HWzQ_IAXDCdcQ&_nc_ss=7b2a8&oh=00_Af4daaH0ZiOPJzxtwSnsyCYQEvZQKDVx4QPL51bngJfeqw&oe=69FD15F2";
const thucChienSaleImage = "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/473321233_122137274840553991_8588906438658723514_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=9Wt9EBbfb90Q7kNvwEbXpmn&_nc_oc=AdqgGyOT1qeysu_EZs9fHaYt_vvxoMaLtZgywXuSP6Z8eRvvjQ_LJrXQre5S2YOH-gZrmtDP95GfGRr5Lw8RaMNq&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=HHcf9wpExKC865wY-yGLnQ&_nc_ss=7b2a8&oh=00_Af6seM9hPE0L6s9DP3QoXHbi84JDgdN_vkOu-kj4po9Sdg&oe=69FD1D74";

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
              <h3 className="font-bold text-white text-2xl uppercase">CHIA SẺ & HƯỚNG DẪN</h3>
              <PlayCircle className="text-white w-10 h-10 group-hover:text-secondary-container transition-colors" />
            </div>
          </motion.div>

          <motion.div 
            className="border-4 border-black relative group cursor-pointer overflow-hidden shadow-neo bg-black transition-all border-b-8 h-[250px]"
          >
            <img src={dataReviewImage} alt="Data Review" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-secondary-container mix-blend-color opacity-30"></div>
            <div className="absolute bottom-0 w-full p-4 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-white text-lg uppercase">DỰ ÁN THẬT</h3>
              <PlayCircle className="text-white w-6 h-6 group-hover:text-primary-container transition-colors" />
            </div>
          </motion.div>
          
          <div className="border-4 border-black bg-surface-container flex items-center justify-center p-8 shadow-neo hover:-translate-x-1 hover:-translate-y-1 transition-transform border-b-8 h-[250px]">
            <h3 className="font-space font-bold text-3xl text-center uppercase text-black leading-tight">HƠN 120 GIỜ<br/>THỰC HÀNH</h3>
          </div>

          <motion.div 
            className="md:col-span-2 border-4 border-black relative group cursor-pointer overflow-hidden shadow-neo bg-black transition-all border-b-8 h-[250px]"
          >
            <img src={thucChienSaleImage} alt="Làm thực chiến tại doanh nghiệp" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-0 w-full p-6 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bold text-white text-2xl uppercase">DOANH NGHIỆP THẬT</h3>
              <PlayCircle className="text-white w-10 h-10 group-hover:text-secondary-container transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
