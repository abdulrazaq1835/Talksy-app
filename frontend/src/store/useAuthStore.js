import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import {io} from "socket.io-client"
import { Socket } from "socket.io-client";
// import { ReceiptSwissFranc } from "lucide-react";

const BASE_URL =import.meta.env.MODE === "development" ? "http://localhost:5001": "/"


export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers:[],
   socket: null,
  

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
        get().connectSocket()
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningup: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created Successfully");
       get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket()

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
        const res  =  axiosInstance.put("/auth/update-profile",data)
        set({authUser: res.data})
        toast.success("Proflie updated successfully")
    } catch (error) {
        toast.error("Erorr in updating profile",error)
    }
  },


  connectSocket:()=>{
    const {authUser} = get()
    if(!authUser ||  get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query:{
        userId:authUser._id,
      }
    })
        socket.connect();
        set({ socket: socket });


  socket.on("getOnlineUsers",(userIds)=>{
    set({onlineUsers:userIds})
  }) 

  },
    disconnectSocket:()=>{
       if (get().socket?.connected) get().socket.disconnect();
    }
}));
