import { Search, Users } from "lucide-react"
import { groups } from "../data/data"

const Group = () => {
  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mt-10">
        <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">Groups</p>
        <Users className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
      </div>

      {/* search bar */}
      <div className="relative mt-8">
        <Search className="size-5 text-omilo-text-secondary dark:text-omilo-dark-text-secondary absolute top-1/2 -translate-y-1/2 ml-2" />
        <input type="text" placeholder="Search Groups" className="px-8 py-2 w-full rounded-full text-omilo-text-primary dark:text-white text-sm border border-black/10 dark:border-white/10 outline-none" />
      </div>

      {/* list of groups */}
      <div className="h-[500px]  pb-20 mt-5 overflow-y-scroll scrollbar-none space-y-5">
        {groups.map((group, index) => (
          <div key={index} className="flex items-center gap-4  rounded-md px-2 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
            <div className="size-10 rounded-full"><img src={group.image} alt="group image" className="size-full rounded-full object-cover" /></div>
            <p className="capitalize text-omilo-text-primary dark:text-white text-sm font-medium tracking-tight">#{group.name}</p>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Group