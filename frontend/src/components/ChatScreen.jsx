import React from 'react'
import ThemeToggler from './ui/ThemeToggler'
import { AlignLeft, AlignRight } from 'lucide-react'

const ChatScreen = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <main className='w-full'>
            {/* top header */}
            <div className='w-full flex items-center justify-between px-10 py-2 border-b border-b-black/10 dark:border-b-white/10'>
                {/* toogle button */}
                <button className='rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800  cursor-pointer text-omilo-text-secondary' onClick={toggleSidebar}>
                    {isSidebarOpen ? <AlignLeft /> : <AlignRight />}
                </button>
                {/* theme toggle */}
                <ThemeToggler />
            </div >

            {/* chat component */}

        </main >
    )
}

export default ChatScreen