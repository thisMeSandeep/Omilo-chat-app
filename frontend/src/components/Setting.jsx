import { Check, ChevronDown, Pencil, Settings } from "lucide-react"
import { useState } from "react";
import { user } from "../data/data";
import EditableField from "./ui/EditableField";


const Setting = () => {

  const [formData, setFormData] = useState({
    name: user.name,
    profilePic: null,
    gender: user.gender,
    dob: "",
    dobVisible: true,
    country: user.country,
    bio: user.bio,
    lastSeenVisible: true,
    privateAccount: false,
  });

  const [isEdit, setIsEdit] = useState(false);
  const [showDropDown, setShowDropdown] = useState(false)


  const handleSave = (e) => {
    e.preventDefault()
  }


  return (
    <div>

      {/* header */}
      <div className="flex items-center justify-between mt-10">
        <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">Settings</p>
        <Settings className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
      </div>

      <div className="mt-8  h-[500px] flex flex-col  gap-5 overflow-y-scroll scrollbar-none">

        {/* profile photo*/}
        <div className="size-24 rounded-full mx-auto">
          <label htmlFor="profile" className="size-full rounded-full cursor-pointer">
            <div className="relative">
              <img src={user.profilePic} alt="profile" className="size-24 rounded-full object-cover" />
              <div className="absolute bottom-2 right-0 rounded-full bg-gray-200 dark:bg-gray-800 p-2 z-10">
                <Pencil className="size-4 text-omilo-text-primary dark:text-white " />
              </div>
            </div>
          </label>
          <input type="file" id="profile" className="hidden" />
        </div>

        {/* display name */}
        <p className="capitalize text-center  text-omilo-text-primary dark:text-white">{user.name}</p>


        {/* bio Edit */}
        <div>
          {
            isEdit ? (
              <textarea
                maxLength={160}
                placeholder="Write your bio"
                value={formData.bio}
                className="w-full border border-black/10 dark:border-white/10 outline-none text-omilo-text-secondary dark:text-omilo-dark-text-secondary px-4 py-2 rounded-md text-sm"
              />
            ) : (
              <p className="w-full border border-black/10 dark:border-white/10 outline-none text-omilo-text-secondary dark:text-omilo-dark-text-secondary px-4 py-2 rounded-md text-sm">
                {user.bio}
              </p>
            )
          }
          <div className="flex justify-end">
            <button onClick={(e) => isEdit ? handleSave(e) : setIsEdit(true)} className="text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary  cursor-pointer  mt-1">
              {isEdit ? (<p className="flex items-center gap-1">Save <Check className="size-4 text-green-500" /></p>)
                :
                (
                  <span className="flex items-center gap-1">
                    <p>Edit</p>
                    <Pencil className="size-3 text-omilo-text-secondary dark:text-omilo-dark-text-secondary " />
                  </span>
                )
              }
            </button>
          </div>
        </div>


        {/* personal-Information dropdown*/}
        <div className="border border-black/10 dark:border-white/10 rounded-md">
          {/* Dropdown Menu */}
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center justify-between text-omilo-text-primary dark:text-white rounded-t-md bg-gray-100 dark:bg-gray-800 p-4 cursor-pointer"
          >
            <h3 className="font-medium tracking-tighter">Personal Information</h3>
            <ChevronDown className={`size-4 transition-transform duration-300 ${showDropDown ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown Content */}
          <div
            className={`transition-all duration-500 overflow-hidden ${showDropDown ? "max-h-[500px] py-4 px-4" : "max-h-0 p-0"}`}
          >
            {/* Name Edit */}
            <EditableField label="Name" type="text" value={formData.name} onSave={(val) => handleSave("name", val)} />

            {/* Gender Edit */}
            <EditableField label="Gender" value={formData.gender} type="select" options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} onSave={(val) => handleSave("gender", val)} />

            {/* DOB Edit */}
            <EditableField label="DOB" value={formData.dob} type="date" onSave={(val) => handleSave("dob", val)} />

            {/* Country Edit */}
            <EditableField label="Location" type="text" value={formData.country} onSave={(val) => handleSave("country", val)} />
          </div>
        </div>
        {/* personal information dropdown ends here */}


 


      </div >
    </div >
  )
}

export default Setting