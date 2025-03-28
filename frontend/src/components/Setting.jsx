import { Check, ChevronDown, Pencil, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import EditableField from "./ui/EditableField";
import useUserStore from "../store/userStore";

const Setting = () => {
  const updateUser = useUserStore((state) => state.updateUser);
  const user = useUserStore((state) => state.user);

  // States for user data
  const [name, setName] = useState(user.name);
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState(user.gender);
  const [dob, setDob] = useState(user.dob);
  const [dobVisible, setDobVisible] = useState(user.dobVisible);
  const [country, setCountry] = useState(user.country);
  const [bio, setBio] = useState(user.bio);
  const [lastSeenVisible, setLastSeenVisible] = useState(user.lastSeenVisible);
  const [privateAccount, setPrivateAccount] = useState(user.privateAccount);

  const [isEdit, setIsEdit] = useState(false);
  const [showPersonalInfoDropDown, sethowPersonalInfoDropDown] = useState(false);
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

  // Handle save
  const handleSave = (field, value) => {
    updateUser({ [field]: value });
    setIsEdit(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mt-10">
        <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">Settings</p>
        <Settings className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
      </div>

      <div className="mt-8 h-[500px] flex flex-col gap-5 overflow-y-scroll scrollbar-none">

        {/* Profile photo */}
        <div className="size-24 rounded-full mx-auto">
          <label htmlFor="profile" className="size-full rounded-full cursor-pointer">
            <div className="relative">
              <img src={user?.profilePic} alt="profile" className="size-24 rounded-full object-cover" />
              <div className="absolute bottom-2 right-0 rounded-full bg-gray-200 dark:bg-gray-800 p-2 z-10">
                <Pencil className="size-4 text-omilo-text-primary dark:text-white" />
              </div>
            </div>
          </label>
          <input type="file" id="profile" className="hidden" />
        </div>

        {/* Display name */}
        <p className="capitalize text-center text-omilo-text-primary dark:text-white">{user.name}</p>

        {/* Bio Edit */}
        <div>
          {isEdit ? (
            <textarea
              maxLength={160}
              placeholder="Write your bio"
              value={bio}
              name="bio"
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-black/10 dark:border-white/10 outline-none text-omilo-text-secondary dark:text-omilo-dark-text-secondary px-4 py-2 rounded-md text-sm"
            />
          ) : (
            <p className="w-full border border-black/10 dark:border-white/10 outline-none text-omilo-text-secondary dark:text-omilo-dark-text-secondary px-4 py-2 rounded-md text-sm">
              {user.bio || "Add Bio"}
            </p>
          )}
          <div className="flex justify-end">
            <button onClick={() => (isEdit ? handleSave('bio', bio) : setIsEdit(true))} className="text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer mt-1">
              {isEdit ? (
                <p className="flex items-center gap-1">Save <Check className="size-4 text-green-500" /></p>
              ) : (
                <span className="flex items-center gap-1">
                  <p>Edit</p>
                  <Pencil className="size-3 text-omilo-text-secondary dark:text-omilo-dark-text-secondary" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Personal Information Dropdown */}
        <div className="border border-black/10 dark:border-white/10 rounded-md">
          <div onClick={() => sethowPersonalInfoDropDown((prev) => !prev)} className="flex items-center justify-between text-omilo-text-primary dark:text-white rounded-t-md bg-gray-100 dark:bg-gray-800 px-4 py-2 cursor-pointer">
            <h3 className="font-medium tracking-tighter">Personal Information</h3>
            <ChevronDown className={`size-4 transition-transform duration-300 ${showPersonalInfoDropDown ? 'rotate-180' : ''}`} />
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${showPersonalInfoDropDown ? "max-h-[500px] py-4 px-4" : "max-h-0 p-0"}`}>
            <EditableField label="Name" type="text" value={name} onSave={(val) => handleSave("name", val)} />
            <EditableField label="Gender" value={gender} type="select" options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} onSave={(val) => handleSave("gender", val)} />
            <EditableField label="DOB" value={dob} type="date" onSave={(val) => handleSave("dob", val)} />
            <EditableField label="Location" type="text" value={country} onSave={(val) => handleSave("country", val)} />
          </div>
        </div>

        {/* Privacy Dropdown */}
        <div className="border border-black/10 dark:border-white/10 rounded-md">
          <div onClick={() => setShowPrivacyDropdown((prev) => !prev)} className="flex items-center justify-between text-omilo-text-primary dark:text-white rounded-t-md bg-gray-100 dark:bg-gray-800 px-4 py-2 cursor-pointer">
            <h3 className="font-medium tracking-tighter">Privacy</h3>
            <ChevronDown className={`size-4 transition-transform duration-300 ${showPrivacyDropdown ? 'rotate-180' : ''}`} />
          </div>

          <div className={`transition-all duration-500 overflow-hidden space-y-2 ${showPrivacyDropdown ? "max-h-[500px] py-4 px-4" : "max-h-0 p-0"}`}>

            {/* Hide DOB */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-omilo-text-primary dark:text-omilo-dark-text-secondary">Hide DOB</p>
              <button className="cursor-pointer" onClick={() => {
                setDobVisible((prev) => !prev);
                updateUser({ dobVisible: !dobVisible });
              }}>
                {dobVisible ? <ToggleLeft className="size-6 text-red-500" /> : <ToggleRight className="size-6 text-green-500" />}
              </button>
            </div>

            {/* Hide Last Seen */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-omilo-text-primary dark:text-omilo-dark-text-secondary">Hide Last Seen</p>
              <button className="cursor-pointer" onClick={() => {
                setLastSeenVisible((prev) => !prev);
                updateUser({ lastSeenVisible: !lastSeenVisible });
              }}>
                {lastSeenVisible ? <ToggleLeft className="size-6 text-red-500" /> : <ToggleRight className="size-6 text-green-500" />}
              </button>
            </div>

            {/* Private Account */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-omilo-text-primary dark:text-omilo-dark-text-secondary">Private Account</p>
              <button className="cursor-pointer" onClick={() => {
                setPrivateAccount((prev) => !prev);
                updateUser({ privateAccount: !privateAccount });
              }}>
                {privateAccount ? <ToggleLeft className="size-6 text-red-500" /> : <ToggleRight className="size-6 text-green-500" />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
