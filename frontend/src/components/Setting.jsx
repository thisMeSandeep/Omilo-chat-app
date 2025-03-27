import { Check, ChevronDown, Pencil, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { user } from "../data/data";
import EditableField from "./ui/EditableField";

const Dropdown = ({ title, isOpen, onToggle, children }) => (
  <div className="border border-black/10 dark:border-white/10 rounded-md">
    <div
      onClick={onToggle}
      className="flex items-center justify-between text-omilo-text-primary dark:text-white rounded-t-md bg-gray-100 dark:bg-gray-800 px-4 py-2 cursor-pointer"
    >
      <h3 className="font-medium tracking-tighter">{title}</h3>
      <ChevronDown className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </div>
    <div className={`transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[500px] py-4 px-4" : "max-h-0 p-0"}`}>{children}</div>
  </div>
);

const Setting = () => {
  const [formData, setFormData] = useState({
    name: user.name,
    profilePic: user.profilePic,
    gender: user.gender,
    dob: { date: "", visible: true },
    country: user.country,
    bio: user.bio,
    lastSeenVisible: true,
    privateAccount: false,
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleFieldSave = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mt-10">
        <p className="text-2xl font-semibold text-omilo-text-primary dark:text-white">Settings</p>
        <Settings className="text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer" />
      </div>

      <div className="mt-8 h-[500px] flex flex-col gap-5 overflow-y-scroll scrollbar-none">
        {/* Profile Photo */}
        <div className="size-24 rounded-full mx-auto relative cursor-pointer">
          <img src={formData.profilePic} alt="Profile" className="size-24 rounded-full object-cover" />
          <div className="absolute bottom-2 right-0 rounded-full bg-gray-200 dark:bg-gray-800 p-2">
            <Pencil className="size-4 text-omilo-text-primary dark:text-white" />
          </div>
          <input type="file" className="hidden" />
        </div>

        {/* Display Name */}
        <p className="capitalize text-center text-omilo-text-primary dark:text-white">{formData.name}</p>

        {/* Bio */}
        <div>
          {isEditingBio ? (
            <textarea
              maxLength={160}
              placeholder="Write your bio"
              value={formData.bio}
              onChange={(e) => handleFieldSave("bio", e.target.value)}
              className="w-full border border-black/10 dark:border-white/10 outline-none px-4 py-2 rounded-md text-sm"
            />
          ) : (
            <p className="border border-black/10 dark:border-white/10 px-4 py-2 rounded-md text-sm">{formData.bio}</p>
          )}
          <div className="flex justify-end mt-1">
            <button onClick={() => setIsEditingBio(!isEditingBio)} className="text-sm flex items-center gap-1">
              {isEditingBio ? "Save" : "Edit"}
              {isEditingBio ? <Check className="size-4 text-green-500" /> : <Pencil className="size-3" />}
            </button>
          </div>
        </div>

        {/* Personal Information Dropdown */}
        <Dropdown title="Personal Information" isOpen={showPersonalInfo} onToggle={() => setShowPersonalInfo((prev) => !prev)}>
          <EditableField label="Name" type="text" value={formData.name} onSave={(val) => handleFieldSave("name", val)} />
          <EditableField label="Gender" type="select" value={formData.gender} options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]} onSave={(val) => handleFieldSave("gender", val)} />
          <EditableField label="DOB" type="date" value={formData.dob.date} onSave={(val) => handleFieldSave("dob", { ...formData.dob, date: val })} />
          <EditableField label="Location" type="text" value={formData.country} onSave={(val) => handleFieldSave("country", val)} />
        </Dropdown>


        {/* Privacy Dropdown */}
        <Dropdown title="Privacy" isOpen={showPrivacy} onToggle={() => setShowPrivacy((prev) => !prev)}>
          <div className="flex items-center justify-between">
            <p className="text-sm  dark:text-white">Hide DOB</p>
            <button onClick={() => handleFieldSave("dob", { ...formData.dob, visible: !formData.dob.visible })}>
              {formData.dob.visible ? <ToggleLeft className="size-6 text-red-500" /> : <ToggleRight className="size-6 text-green-500" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm dark:text-white">Hide Last Seen</p>
            <button onClick={() => handleFieldSave("lastSeenVisible", !formData.lastSeenVisible)}>
              {formData.lastSeenVisible ? <ToggleLeft className="size-6 text-red-500" /> : <ToggleRight className="size-6 text-green-500" />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm dark:text-white">Private Account</p>
            <button onClick={() => handleFieldSave("privateAccount", !formData.privateAccount)}>
              {formData.privateAccount ? <ToggleLeft className="size-6 text-red-500" /> : <ToggleRight className="size-6 text-green-500" />}
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Setting;
