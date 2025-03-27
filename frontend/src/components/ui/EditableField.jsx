import { useState } from "react";
import { Check, Pencil } from "lucide-react";

const EditableField = ({ label, value, type = "text", options = [], onSave }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newValue, setNewValue] = useState(value);

    const handleSave = () => {
        onSave(newValue);
        setIsEdit(false);
    };

    return (
        <div className="mb-4">
            <h3 className="text-sm text-omilo-text-primary dark:text-white">{label}</h3>
            {isEdit ? (
                type === "select" ? (
                    <select
                        className="w-full border border-black/10 dark:border-white/10 outline-none text-omilo-text-secondary dark:text-omilo-dark-text-secondary py-2 rounded-md text-sm"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={type}
                        className="w-full border border-black/10 dark:border-white/10 outline-none text-omilo-text-secondary dark:text-omilo-dark-text-secondary p-2 rounded-md text-sm"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                )
            ) : (
                <p className="w-full text-omilo-text-secondary dark:text-omilo-dark-text-secondary py-2 rounded-md text-sm">
                    {value || "Not set"}
                </p>
            )}
            <div className="flex justify-end mt-1">
                <button
                    onClick={() => (isEdit ? handleSave() : setIsEdit(true))}
                    className="text-sm text-omilo-text-secondary dark:text-omilo-dark-text-secondary cursor-pointer flex items-center gap-1"
                >
                    {isEdit ? (
                        <>
                            Save <Check className="size-4 text-green-500" />
                        </>
                    ) : (
                        <>
                            <p>Edit</p>
                            <Pencil className="size-3" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditableField;
