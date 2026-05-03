import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Menu, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/src/lib/AuthContext';

export function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  const links = [
    { name: 'TRANG CHỦ', path: '/' },
    { name: 'NHẬT KÝ', path: '/diary' },
    { name: 'ĐĂNG KÝ', path: '/register' },
  ];

  return (
    <header className="bg-white border-b-4 border-black shadow-neo flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
      <Link to="/" className="cursor-pointer text-3xl font-black italic tracking-tighter">
        DOERS
      </Link>
      
      <nav className="hidden md:flex gap-6 font-space font-bold uppercase tracking-tighter items-center">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={cn(
              "cursor-pointer hover:text-secondary-container hover:-translate-y-[1px] hover:-translate-x-[1px] transition-all",
              pathname === link.path ? "text-primary-container underline decoration-4 underline-offset-8" : "text-black"
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <span className="font-bold font-space uppercase text-sm border-2 border-black px-2 py-1 bg-surface-variant max-w-[150px] truncate" title={user.displayName || "User"}>
              {user.displayName || "User"}
            </span>
            <button
              onClick={logout}
              className="cursor-pointer border-4 border-black p-2 shadow-neo active:translate-x-1 active:translate-y-1 active:shadow-neo-active hover:-translate-y-1 hover:-translate-x-1 transition-all bg-secondary-container"
              title="Đăng xuất"
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="cursor-pointer border-4 border-black p-2 shadow-neo active:translate-x-1 active:translate-y-1 active:shadow-neo-active hover:-translate-y-1 hover:-translate-x-1 transition-all bg-secondary-container flex items-center gap-2 font-bold uppercase"
            title="Đăng nhập"
          >
            <LogIn size={20} />
          </button>
        )}
        <Link 
          to="/register"
          className="cursor-pointer bg-primary-container text-on-primary font-bold px-6 py-3 border-4 border-black shadow-neo hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-neo-active transition-all block text-center uppercase"
        >
          THAM GIA NGAY
        </Link>
      </div>

      <button 
        className="cursor-pointer md:hidden border-4 border-black p-2 shadow-neo active:translate-x-1 active:translate-y-1 active:shadow-neo-active bg-surface-container-lowest"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="text-black block" />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-4 border-black shadow-neo flex flex-col p-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer py-3 font-space font-bold uppercase text-lg border-b-2 border-transparent hover:border-black"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="cursor-pointer text-left py-3 font-space font-bold uppercase text-lg border-b-2 border-transparent hover:border-black flex gap-2 items-center text-secondary-container"
            >
              <LogOut size={20} /> ĐĂNG XUẤT
            </button>
          ) : (
             <button
              onClick={() => { signInWithGoogle(); setMenuOpen(false); }}
              className="cursor-pointer text-left py-3 font-space font-bold uppercase text-lg border-b-2 border-transparent hover:border-black flex gap-2 items-center text-secondary-container"
            >
              <LogIn size={20} /> ĐĂNG NHẬP
            </button>
          )}
          <Link 
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer mt-4 bg-primary-container text-on-primary font-bold px-6 py-3 border-4 border-black shadow-neo block text-center uppercase"
          >
            THAM GIA NGAY
          </Link>
        </div>
      )}
    </header>
  );
}
