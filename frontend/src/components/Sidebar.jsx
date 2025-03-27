import { MessageCircle, MessageCircleDashed, Settings, UserPlus, UserRoundPen, Users } from "lucide-react";
import Chat from "./Chat";
import Friends from "./Friends";
import Group from "./Group";
import Profile from "./Profile";
import Setting from "./Setting";
import { assets } from "../assets/assets";
import { useState } from "react";
import ThemeToggler from "./ui/ThemeToggler";
import useUserStore from "../store/userStore";

// Tabs 
const tabs = [
    { key: "chats", icon: MessageCircle, component: Chat },
    { key: "friends", icon: UserPlus, component: Friends },
    { key: "group", icon: Users, component: Group },
    { key: "profile", icon: UserRoundPen, component: Profile },
    { key: "setting", icon: Settings, component: Setting },
];

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState("chats");

    const user = useUserStore((state) => state.user);
    console.log("user:", user)

    // Find the active component based on the selected tab
    const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component;

    return (
        <div className="flex">
            {/* Left Sidebar */}
            <div className="w-[20%]  h-screen border-r border-r-black/10 dark:border-r-white/10 overflow-y-scroll scrollbar-none">
                {/* Logo */}
                <div className="border-b border-b-black/10 dark:border-b-white/10 flex items-center justify-center py-4">
                    <div className="size-8 rounded-full bg-omilo-primary flex items-center justify-center p-1">
                        <MessageCircleDashed className="size-5 text-white" />
                    </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="mt-10 px-4 flex flex-col items-center justify-center gap-15">
                    {tabs.map(tab => (
                        <div
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative group cursor-pointer p-2 rounded-md 
                                ${activeTab === tab.key ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                        >
                            <tab.icon className={`size-6   ${activeTab === tab.key ? "text-omilo-primary" : "text-omilo-text-secondary dark:text-omilo-dark-text-secondary"}`} />
                            <span className="hidden lg:inline tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                {tab.key}
                            </span>
                        </div>
                    ))}
                </nav>

                {/* theme toggler */}
                <div className="flex items-center justify-center mt-10">
                    <ThemeToggler />
                </div>

                {/* User Profile */}
                <div className="flex items-center justify-center mt-5">
                    <div className="size-8 rounded-full">
                        <img src={user.profilePic} alt="user" className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Right Panel - Render Active Component */}
            <div className="p-4 w-full">{ActiveComponent && <ActiveComponent />}</div>
        </div>
    );
};

export default Sidebar;
