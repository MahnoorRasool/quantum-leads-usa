
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import WhyChooseUsPage from './components/WhyChooseUsPage';
import ContactPage from './components/ContactPage';
import ServiceDetailsPage from './components/ServiceDetailsPage';
import LoginPage from './components/LoginPage';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const target = e.target as HTMLElement;

            if (target.closest('a, button, input, textarea, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }

            if (cursorDotRef.current && cursorOutlineRef.current) {
                cursorDotRef.current.style.left = `${clientX}px`;
                cursorDotRef.current.style.top = `${clientY}px`;

                cursorOutlineRef.current.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };
        
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const outlineSize = isHovering ? 44 : 36;
    const outlineScale = isClicking ? 1.2 : 1;
    const outlineBorderWidth = isHovering ? '2px' : '1px';
    const outlineBorderColor = isHovering ? 'rgba(52, 211, 153, 0.7)' : 'rgba(100, 116, 139, 0.5)';
    const outlineBackground = isHovering ? 'rgba(52, 211, 153, 0.1)' : 'transparent';
    
    const dotSize = 10;
    const dotScale = isHovering ? 0 : 1;
    const dotOpacity = isHovering ? 0 : 1;

    return (
        <>
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-300 ease-out"
                style={{
                    zIndex: 9999,
                    width: `${outlineSize}px`,
                    height: `${outlineSize}px`,
                    transform: `translate(-50%, -50%) scale(${outlineScale})`,
                    border: `${outlineBorderWidth} solid ${outlineBorderColor}`,
                    backgroundColor: outlineBackground,
                }}
            />
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 rounded-full bg-emerald-400 pointer-events-none transition-transform,opacity duration-200"
                style={{
                    zIndex: 9999,
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    transform: `translate(-50%, -50%) scale(${dotScale})`,
                    opacity: dotOpacity,
                    boxShadow: '0 0 12px rgba(52, 211, 153, 0.9)',
                }}
            />
        </>
    );
};

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const AppContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/login';
    const isHomePage = location.pathname === '/';

    return (
        <div className="relative z-10 flex flex-col min-h-screen">
            {!isLoginPage && <Header />}
            
            {/* Global Back Button */}
            {!isHomePage && !isLoginPage && (
                <button
                    onClick={() => navigate(-1)}
                    className="fixed top-24 left-6 z-[60] text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label="Go back to previous page"
                >
                    <div className="p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/70 backdrop-blur-md border border-zinc-700/50 shadow-lg">
                        <BackArrowIcon />
                    </div>
                </button>
            )}

            <main key={location.pathname} className="flex-grow page-enter">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/why-us" element={<WhyChooseUsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/service-details" element={<ServiceDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
            {!isLoginPage && <Footer />}
        </div>
    );
};

const BackgroundLines: React.FC = () => (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
            <div className="grid grid-cols-4 w-full h-full">
                <div className="border-r border-zinc-800/50"></div>
                <div className="border-r border-zinc-800/50"></div>
                <div className="border-r border-zinc-800/50"></div>
                <div></div>
            </div>
        </div>
    </div>
);

const Particles: React.FC = () => {
    const particles = Array.from({ length: 50 });
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {particles.map((_, i) => (
                <div key={i}
                    className="absolute bg-white/10 rounded-full"
                    style={{
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100 + 100}%`, // Start below the viewport
                        animation: `particle-ascend ${Math.random() * 20 + 15}s linear ${Math.random() * 10}s infinite`,
                    }}
                />
            ))}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <div className="relative bg-zinc-900 text-slate-300 min-h-screen flex flex-col overflow-x-hidden">
      <Particles />
      <CustomCursor />
      <BackgroundLines />
      <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden">
        <div className="blob bg-gradient-to-br from-emerald-600 to-sky-500 opacity-20 -top-10 -left-20 w-72 h-72 animate-[animate-blob_8s_ease-in-out_infinite]" style={{animationDelay: '0s', filter: 'blur(100px)'}}></div>
        <div className="blob bg-gradient-to-br from-green-600 to-teal-500 opacity-20 -top-20 -right-20 w-80 h-80 animate-[animate-blob_8s_ease-in-out_infinite]" style={{animationDelay: '2s', filter: 'blur(100px)'}}></div>
        <div className="blob bg-gradient-to-br from-teal-600 to-emerald-500 opacity-10 bottom-0 left-1/4 w-60 h-60 animate-[animate-blob_8s_ease-in-out_infinite]" style={{animationDelay: '4s', filter: 'blur(100px)'}}></div>
      </div>
      <AppContent />
    </div>
  );
};

export default App;
