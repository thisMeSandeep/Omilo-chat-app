import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon } from "lucide-react"

const ThemeToggler = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`cursor-pointer ${theme === 'light' ? 'hover:bg-gray-200 ' : ''}  rounded-full p-3`}>
            {theme === "light" ? <Moon className='size-5 text-omilo-text-secondary' /> : <Sun className='size-5 text-yellow-400' />}
        </button>
    );
};

export default ThemeToggler;