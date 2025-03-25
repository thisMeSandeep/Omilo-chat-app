import { Link } from "react-router-dom"
import ThemeToggler from "./ui/ThemeToggler"
import { useEffect, useState } from "react"

const NavbarMini = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);




    return (
        <header className={`fixed top-0 left-0 right-0 z-50 py-4 md:py-6  dark:text-white border-b-[1px] border-gray-100 dark:border-white/10 ${scrolled ? 'backdrop-blur-lg' : ''}`}>
            <nav className="w-[90%] mx-auto flex items-center justify-between">
                {/* logo */}
                <Link to="/" className='flex items-center gap-2'>
                    <div className='size-8 rounded-full bg-omilo-primary'></div>
                    <span className="text-2xl font-bold logo text-glow">Omilo</span>
                </Link>

                {/* action button */}
                <div className="flex items-center gap-10">

                    <ThemeToggler />

                </div>


            </nav>
        </header>
    )
}

export default NavbarMini