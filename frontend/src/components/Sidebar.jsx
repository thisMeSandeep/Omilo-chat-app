import { MessageCircle, MessageCircleDashed, Settings, UserPlus, UserRoundPen, Users } from "lucide-react"
import Chat from "./Chat";
import Friends from "./Friends";
import Group from "./Group";
import Profile from "./Profile";
import Setting from "./Setting";
import User from "./User";
import { assets } from "../assets/assets";


// tabs
const tabs = [
    { key: "chats", icon: MessageCircle, component: Chat },
    { key: "friends", icon: UserPlus, component: Friends },
    { key: "group", icon: Users, component: Group },
    { key: "profile", icon: UserRoundPen, component: Profile },
    { key: "setting", icon: Settings, component: Setting },
];

const Sidebar = () => {
    return (
        <div>

            {/* left nav */}
            <div className="w-[20%] h-screen border-r border-r-black/10 dark:border-r-white/10 overflow-y-scroll scrollbar-none">

                {/* logo */}
                <div className="border-b border-b-black/10 dark:border-b-white/10  flex items-center justify-center py-4">
                    <div className='size-8 rounded-full bg-omilo-primary flex items-center justify-center p-1'>
                        <MessageCircleDashed className="size-5 text-white" />
                    </div>
                </div>
                {/* tabs */}
                <nav className="mt-10 flex flex-col items-center justify-center gap-15">
                    {tabs.map(tab => (
                        <div key={tab.key} className="relative group cursor-pointer">
                            <tab.icon className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary" />
                            <span className="hidden lg:inline tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">{tab.key}</span>
                        </div>
                    ))}
                </nav>

                {/* user profile */}
                <div className="flex items-center justify-center mt-20">
                    <div className="size-8 rounded-full ">
                        <img src={assets.user1} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
            </div >

            {/* right components */}

        </div >
    )
}

export default Sidebar