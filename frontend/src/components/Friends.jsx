import { Ban, EllipsisVertical, Search, Share2, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

const randomNames = [
  "Aarav", "Rohan", "Kavya", "Meera", "Arjun", "Nisha", "Vihaan", "Sanjay",
  "Anika", "Ishaan", "Priya", "Yash", "Sneha", "Rahul", "Tanvi", "Vikram",
  "Neha", "Aditya", "Simran", "Kabir", "Aarav", "Rohan", "Kavya", "Meera", "Arjun", "Nisha", "Vihaan", "Sanjay",
  "Anika", "Ishaan", "Priya", "Yash", "Sneha", "Rahul", "Tanvi", "Vikram",
  "Neha", "Aditya", "Simran", "Kabir"
];

// Group names by first letter
const groupedNames = {};
randomNames.forEach((name) => {
  const firstLetter = name[0];
  if (!groupedNames[firstLetter]) {
    groupedNames[firstLetter] = [];
  }
  groupedNames[firstLetter].push(name);
});

const Friends = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle dropdown (only one at a time)
  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mt-10 px-4">
        <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">Friends</p>
        <UserPlus className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
      </div>

      {/* Search Bar */}
      <div className="relative mt-8 px-4">
        <Search className="size-5 text-omilo-text-secondary dark:text-omilo-dark-text-secondary absolute top-1/2 -translate-y-1/2 ml-2" />
        <input
          type="text"
          placeholder="Search friends"
          className="px-8 py-2 w-full rounded-full text-omilo-text-primary dark:text-white text-sm border border-black/10 dark:border-white/10 outline-none"
        />
      </div>

      {/* Friends List */}
      <div className="h-[500px] mt-5 overflow-auto scrollbar-none space-y-5 px-4 pb-20">
        {Object.keys(groupedNames).sort().map((letter ) => (
          <div key={letter}>
            <h1 className="text-omilo-primary font-semibold">{letter}</h1>
            <ul className="space-y-6 pl-4 mt-4">
              {groupedNames[letter].sort().map((name,index) => (
                <div key={index} className="flex items-center justify-between cursor-pointer relative">
                  <p className="text-omilo-text-primary dark:text-white text-sm tracking-tighter">{name}</p>

                  {/* Actions Dropdown */}
                  <div className="relative inline-block">
                    {/* Ellipsis Button */}
                    <EllipsisVertical
                      className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full p-1"
                      onClick={() => toggleDropdown(name)}
                    />

                    {/* Dropdown Menu */}
                    {openDropdown === name && (
                      <div className="absolute top-1/2 right-10 w-40 flex flex-col gap-4 px-4 py-3 rounded-md shadow-lg 
                        text-omilo-text-secondary dark:text-omilo-dark-text-secondary bg-white dark:bg-gray-800 z-50">
                        <button className="flex items-center gap-4 cursor-pointer">
                          <p className="text-sm">Share</p>
                          <Share2 className="size-4" />
                        </button>
                        <button className="flex items-center gap-4 cursor-pointer">
                          <p className="text-sm">Block</p>
                          <Ban className="size-4" />
                        </button>
                        <button className="flex items-center gap-4 cursor-pointer">
                          <p className="text-sm">Remove</p>
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
