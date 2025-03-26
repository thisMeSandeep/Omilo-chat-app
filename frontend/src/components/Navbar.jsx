import { Link } from "react-router-dom"
import ThemeToggler from "./ui/ThemeToggler"
import { useEffect, useState } from "react"
import { LayoutDashboard, MessageCircleDashed } from "lucide-react";

const Navbar = () => {
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
                    <div className='size-8 rounded-full bg-omilo-primary flex items-center justify-center p-1'>
                        <MessageCircleDashed className="size-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold logo text-glow">Omilo</span>
                </Link>

                {/* action button */}
                <div className="flex items-center gap-5 md:gap-10">

                    <ThemeToggler />

                    <Link to='/login' className="hidden md:inline">
                        <button className="cursor-pointer text-sm tracking-tight px-5 py-2.5 rounded-md hover:border hover:border-omilo-primary text-omilo-text-secondary dark:text-omilo-dark-text-secondary hover:text-omilo-primary">Sign In</button>
                    </Link>

                    <Link to='/dashboard'><LayoutDashboard className="size-5"/></Link>

                    <Link to='/signUp'>
                        <button className="cursor-pointer text-sm tracking-tight px-5 py-2.5 rounded-md bg-omilo-primary text-white text-nowrap">Get Started</button>
                    </Link>


                </div>


            </nav>
        </header>
    )
}

export default Navbar