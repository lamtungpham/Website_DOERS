import { Check } from 'lucide-react';
import { PathId } from '@/src/pages/Register';

interface RegisterFormProps {
  activePath: PathId;
  pathLabel: string;
}

export function RegisterForm({ activePath, pathLabel }: RegisterFormProps) {
  return (
    <div className="w-full lg:w-2/3 p-8 md:p-12 bg-surface">
      <div className="mb-8">
        <h3 className="font-space text-4xl font-bold uppercase mb-2">
          {pathLabel}
        </h3>
        <p className="font-be text-base text-on-surface-variant font-medium">
          Sáng tạo đi đôi với hành động. Hãy cho chúng tôi biết điều gì thúc đẩy bạn và bạn dự định sẽ làm chấn động mọi thứ như thế nào.
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label className="block font-bold uppercase text-on-background mb-2 text-sm">Họ và tên</label>
            <input 
              type="text" 
              placeholder="TÊN CỦA BẠN" 
              className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all"
            />
          </div>
          
          {activePath === 'doers' && (
            <div className="w-full md:w-1/3">
              <label className="block font-bold uppercase mb-2 text-sm">Tuổi</label>
              <input type="number" placeholder="TUỔI" className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all" />
            </div>
          )}
          {activePath === 'business' && (
            <div className="w-full">
              <label className="block font-bold uppercase mb-2 text-sm">Tên doanh nghiệp/Sản phẩm</label>
              <input type="text" placeholder="TÊN DỰ ÁN CỦA BẠN" className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all" />
            </div>
          )}
          {activePath === 'mentors' && (
            <div className="w-full">
              <label className="block font-bold uppercase mb-2 text-sm">Công ty & Vai trò</label>
              <input type="text" placeholder="CÔNG TY & VAI TRÒ CỦA BẠN" className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all" />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label className="block font-bold uppercase mb-2 text-sm">Email</label>
            <input type="email" placeholder="ĐỊA CHỈ EMAIL CỦA BẠN" className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all" />
          </div>
          <div className="w-full">
            <label className="block font-bold uppercase mb-2 text-sm">Số điện thoại</label>
            <input type="tel" placeholder="SỐ ĐIỆN THOẠI CỦA BẠN" className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all" />
          </div>
        </div>

        <div className="w-full">
          <label className="block font-bold uppercase mb-2 text-sm">Vị trí</label>
          <input type="text" placeholder="BẠN ĐANG SỐNG Ở ĐÂU? (THÀNH PHỐ, QUỐC GIA)" className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all" />
        </div>

        <div className="w-full">
          <label className="block font-bold uppercase mb-2 text-sm">
            {activePath === 'doers' && "Đam mê của bạn"}
            {activePath === 'business' && "Doanh nghiệp của bạn"}
            {activePath === 'mentors' && "Chuyên môn của bạn"}
          </label>
          <textarea 
            rows={3} 
            placeholder={
              activePath === 'doers' ? "HÃY GIỚI THIỆU NGẮN GỌN VỀ BẢN THÂN BẠN?" :
              activePath === 'business' ? "DOANH NGHIỆP HOẶC SẢN PHẨM CỦA BẠN LÀ GÌ?" :
              "NHỮNG LĨNH VỰC CHUYÊN MÔN VÀ KỸ NĂNG BẠN SẼ MANG LẠI CHO CỘNG ĐỒNG LÀ GÌ?"
            }
            className="w-full p-4 bg-surface-container border-4 border-black font-be font-medium text-lg focus:outline-none focus:border-primary-container focus:-translate-y-1 focus:-translate-x-1 shadow-neo transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex items-start gap-4 mt-4">
          <div className="relative flex items-center h-8">
            <input type="checkbox" id="commit" className="peer appearance-none w-8 h-8 bg-surface-container border-4 border-black checked:bg-primary-container cursor-pointer shrink-0" />
            <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 peer-checked:opacity-100" size={20} strokeWidth={4} />
          </div>
          <label htmlFor="commit" className="font-be text-base cursor-pointer pt-1 font-medium">
            <span className="font-bold uppercase block mb-1">Cam kết hành động</span>
            Tôi hiểu rằng cộng đồng này yêu cầu sự tham gia và đồng hành, không chỉ để quan sát. Tôi đã sẵn sàng hành động.
          </label>
        </div>

        <div className="mt-8">
          <button 
            type="submit" 
            className="cursor-pointer w-full py-5 bg-secondary-container border-4 border-black font-space font-bold text-xl uppercase shadow-neo hover:-translate-y-1 hover:-translate-x-1 active:translate-y-1 active:translate-x-1 active:shadow-neo-active transition-all group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-surface-container transition-colors">
              ĐĂNG KÝ VỚI VAI TRÒ {
                activePath === 'doers' ? 'DOER' :
                activePath === 'business' ? 'BUSINESS OWNER' :
                'MENTOR'
              }
            </span>
            <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
          </button>
        </div>
      </form>
    </div>
  );
}
