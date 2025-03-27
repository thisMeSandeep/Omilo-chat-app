import { ChevronDown, User, UserCircle } from "lucide-react"
// import { user } from "../data/data"
import { useState } from "react"
import useUserStore from "../store/userStore";

const Profile = () => {

    const [dropdown, setDropdown] = useState(false);

    const user = useUserStore((state) => state.user);

    return (
        <div>

            {/* header */}
            <div className="flex items-center justify-between mt-10">
                <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">My Profile</p>
                <User className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
            </div>

            {/* user details */}
            <div className="flex flex-col items-center justify-center gap-5 mt-10">
                {/* picture */}
                <div className="size-24 rounded-full flex items-center justify-center">
                    <img src={user.profilePic} alt="profile" className="size-full rounded-full object-cover" />
                </div>
                {/* info*/}
                <div className="flex flex-col items-center text-center">
                    <p className="text-omilo-text-primary dark:text-white font-semibold capitalize">{user.name}</p>
                    <span className="flex items-center gap-2">
                        <span className="size-2 bg-green-500 rounded-full"></span>
                        <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">{user.status}</p>
                    </span>
                </div>
            </div>

            <div className="mt-5 bg-gray-300/70 dark:bg-gray-800 h-[1px] w-full" />


            <div className="pb-20 mt-5 ">

                {/* bio */}
                <p className="text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary">{user.bio}</p>

                {/*About  */}
                <div className="border border-black/10 dark:border-white/10 rounded-md mt-5">

                    <div onClick={() => setDropdown(prev => !prev)} className="flex items-center justify-between rounded-t-md  bg-gray-100 dark:bg-gray-800 p-4  cursor-pointer">
                        <div className="flex items-center gap-2 text-sm">
                            <UserCircle className="size-5 text-omilo-text-primary dark:text-white" />
                            <p className="text-omilo-text-primary dark:text-white">About</p>
                        </div>
                        <ChevronDown className={`size-5 text-omilo-text-primary dark:text-white ${dropdown ? 'rotate-180' : ''} transition-all duration-300 ease-in-out`} />
                    </div>

                    {/* about details */}
                    <div className={` ${dropdown ? 'h-[200px] pt-4' : 'h-0'}  px-4 overflow-y-scroll scrollbar-none space-y-5 transition-all duration-500 ease-in-out tracking-tight`}>
                        <div className="space-y-1">
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">Username</p>
                            <p className="text-omilo-text-primary dark:text-white">{user.username}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">Email</p>
                            <p className="text-omilo-text-primary dark:text-white">{user.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">Name</p>
                            <p className="text-omilo-text-primary dark:text-white capitalize">{user.name}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">Gender</p>
                            <p className="text-omilo-text-primary dark:text-white capitalize">{user.gender}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">DOB</p>
                            <p className="text-omilo-text-primary dark:text-white">{user.dob.date || 'Not Provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary">Location</p>
                            <p className="text-omilo-text-primary dark:text-white capitalize">{user.country || 'Not Provided'}</p>
                        </div>
                    </div>
                    {/* about details ends here */}
                </div>


            </div>


        </div >
    )
}

export default Profile