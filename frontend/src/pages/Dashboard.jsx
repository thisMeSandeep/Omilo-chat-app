import { useState } from "react"
import ChatScreen from "../components/ChatScreen"
import Sidebar from "../components/Sidebar"


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <main className="flex items-start h-screen bg-omilo-light-bg dark:bg-omilo-dark-bg">

      {/* sidebar */}
      <aside className={`${isSidebarOpen ? 'w-[30%]' : 'w-0'} h-full overflow-hidden border-r border-r-black/10 dark:border-r-white/10 transition-all duration-500`}>
        <Sidebar />
      </aside>


      {/* chat screen */}
      <section className="flex-1">
        <ChatScreen isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      </section>


    </main>
  )
}

export default Dashboard