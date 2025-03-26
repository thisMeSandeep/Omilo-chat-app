import { Plus, Search } from "lucide-react"
import { homeScreenProfiles } from "../data/data"

const Chat = () => {
  return (
    <div>

      {/* header */}
      <div className="flex items-center justify-between mt-10">
        <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">Chats</p>
        <Plus className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
      </div>

      {/* search bar */}
      <div className="relative mt-8">
        <Search className="size-5 text-omilo-text-secondary dark:text-omilo-dark-text-secondary absolute top-1/2 -translate-y-1/2 ml-2" />
        <input type="text" placeholder="Search friends" className="px-8 py-2 w-full rounded-full text-omilo-text-primary dark:text-white text-sm border border-black/10 dark:border-white/10 outline-none" />
      </div>

      {/* recent */}
      <p className="mt-5 text-omilo-text-secondary dark:text-omilo-dark-text-secondary text-lg">Recent</p>

      {/* users */}
      <div className=" h-[500px]  pb-20 mt-5 overflow-y-scroll scrollbar-none space-y-5">

        {homeScreenProfiles.map((item) => (
          <button key={item.id} className="w-full flex items-center gap-5  rounded-md px-2 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
            {/* image */}
            <div className="size-10 rounded-full relative">
              <img src={item.image} alt="user" className="size-full rounded-full object-cover" />
              {item.online && <div className="size-3 absolute rounded-full bg-white p-[1px] -right-0.5 bottom-0 flex items-center justify-center ">
                <div className="size-2 rounded-full bg-green-500" />
              </div>}
            </div>
            {/* text content */}

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-omilo-text-primary dark:text-white">{item.username}</p>
                <p className="text-xs text-omilo-text-secondary dark:text-omilo-dark-text-secondary">{item.lastSeen}</p>
              </div>
              <p className="text-left text-xs text-omilo-text-secondary dark:text-omilo-dark-text-secondary">{item.status}</p>
            </div>
          </button>
        ))}

      </div>

    </div>
  )
}

export default Chat