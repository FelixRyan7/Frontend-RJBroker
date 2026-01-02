import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import '../styles/styles.css';
import DefaultHeader from "../components/Headers/DefaultHeader";




export default function MainLayout() {
    const { pathname } = useLocation();

    // --- Rutas que no deben mostrar Header/Footer ---
    const hideHeaderFooter = [
    "/auth",
    ];
    const shouldHideLayout = hideHeaderFooter.includes(pathname);
    const isHome = location.pathname === '/';

    return (
    <>
    
        {!shouldHideLayout ? (
            <div className={`relative flex flex-col ${isHome ? 'bg-home-video min-h-screen' : 'bg-white2'}`}>
            <>
                <DefaultHeader />

                <main className="flex-1">
                    {isHome && (
                        <div className="w-full">
                            <video
                                src="src\assets\videos\homeVideo.mp4"
                                autoPlay
                                muted
                                loop
                                className="absolute brightness-75 top-0 left-0 w-full h-full object-cover -z-10"
                            />
                        </div>
                    )}
                    <Outlet />
                </main>

                <Footer />
            </>
            </div>
        ) : (
            <main className="flex-1">
                <Outlet />
            </main>
        )}
    </>
    );
}
