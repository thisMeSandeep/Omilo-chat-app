import { useState } from "react"
import ChatScreen from "../components/ChatScreen"
import Sidebar from "../components/Sidebar"
import { AlignLeft } from "lucide-react";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main className="relative flex items-start h-screen bg-omilo-light-bg dark:bg-omilo-dark-bg">

      {/* sidebar */}
      <aside className={`absolute  md:relative  z-50 ${isSidebarOpen ? 'w-full md:w-[30%] bg-omilo-light-bg dark:bg-omilo-dark-bg' : 'w-0'} h-full overflow-hidden border-r border-r-black/10 dark:border-r-white/10 transition-all duration-500`}>

        {/* mobile toggle */}
        <AlignLeft className=" md:hidden absolute right-5 top-4 text-omilo-text-secondary dark:text-omilo-dark-text-secondary" onClick={() => setIsSidebarOpen(prev => !prev)} />
        <Sidebar />
      </aside>


      {/* chat screen */}
      <section className="flex-1">
        <ChatScreen isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      </section>


    </main >
  )
}

export default Dashboard