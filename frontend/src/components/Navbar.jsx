import { Link } from "react-router-dom"
import ThemeToggler from "./ui/ThemeToggler"

const Navbar = () => {


    return (
        <header className="py-4 md:py-6 bg-omilo-light-bg dark:bg-omilo-dark-bg dark:text-white">
            <nav className="w-[90%] mx-auto flex items-center justify-between">
                {/* logo */}
                <Link className='flex items-center gap-2'>
                    <div className='size-8 rounded-full bg-omilo-primary'></div>
                    <span className="text-2xl font-bold logo text-glow">Omilo</span>
                </Link>

                {/* action button */}
                <div className="flex items-center gap-10">

                    <ThemeToggler />

                    <Link to='/login' className="hidden md:inline">
                        <button className="cursor-pointer text-sm tracking-tight px-5 py-2.5 rounded-md hover:border hover:border-omilo-primary hover:text-omilo-primary">Sign In</button>
                    </Link>

                    <Link to='/signUp'>
                        <button className="cursor-pointer text-sm tracking-tight px-5 py-2.5 rounded-md bg-omilo-primary text-white">Get Started</button>
                    </Link>


                </div>


            </nav>
        </header>
    )
}

export default Navbar