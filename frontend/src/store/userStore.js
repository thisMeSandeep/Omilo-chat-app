import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  message: null,

  // Register user
  registerUser: async (formData) => {
    set({ loading: true, message: null });

    try {
      const { data } = await axiosInstance.post("/user/register", formData);

      if (data.success) {
        set({ user: data.user, message: null });
        toast.success(data.message);
        return true;
      }
    } catch (err) {
      console.error("Error in register:", err);
      set({
        message: err.response?.data?.message || "Something went wrong!",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // Register user
  loginUser: async (formData) => {
    set({ loading: true, message: null });
    try {
      const { data } = await axiosInstance.post("/user/login", formData);
      if (data.success) {
        set({ user: data.user, message: null });
        toast.success(data.message);
        return true;
      }
    } catch (err) {
      console.error("Error in login:", err);
      set({
        message: err.response?.data?.message || "Something went wrong!",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // get user data
  getUserData: async () => {
    try {
      const { data } = await axiosInstance.get("/user/get-user-data");
      if (data.success) {
        set({ user: data.user, message: null });
        return true;
      }
    } catch (err) {
      console.error("Error in getUserData:", err);
      return false;
    }
  },

  // Logout user
  logoutUser: async () => {
    try {
      const { data } = await axiosInstance.post("/user/logout");
      if (data.success) {
        set({ user: null, message: null });
        toast.success(data.message);
        return true;
      }
    } catch (err) {
      console.error("Error in logout:", err);
      return false;
    }
  },

  // Update user
  updateUser: async (formData) => {
    try {
      const { data } = await axiosInstance.put("/user/update-user", formData);
      if (data.success) {
        set({ user: data.user });
        toast.success(data.message);
        return true;
      }
    } catch (err) {
      console.error("Error in updateUser:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
      return false;
    }
  },
}));

export default useUserStore;
