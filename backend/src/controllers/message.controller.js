import Message from "../models/message.model.js"
import User from "../models/user.model.js"

import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId, io } from "../lib/socket.js";

export const getUsersforsidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
       res.status(200).json(filteredUsers)
    } catch (error) {
          console.log("error in etUsersforsidebar ", error)
          res.status(500).json({message:"Internal server error"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userTochatId}=req.params
        const myId = req.user._id

        const messages = await Message.find({
          $or:[
            {senderId:myId,reciverId:userTochatId},

             {senderId:userTochatId,reciverId:myId}

          ]

        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getmesssage",error.message)
        res.status(500).json({error:"internal server error"})
    }
}


export const SendMessage =  async (req,res)=>{
    try {

        const {text,image}  =req.body
        const {id:reciverId} = req.params
        const senderId = req.user._id

        let imageUrl;
        if (image){
            //upload image

            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;

        }
          
        const newMessage = new Message( {
            senderId,
            reciverId,
            text,
            image:imageUrl
        })
       await newMessage.save();

       const recevierSocketId = getReciverSocketId(reciverId)
       if(recevierSocketId){
        io.to(recevierSocketId).emit("newMessage",newMessage)
       }
       //
    res.status(201).json(newMessage)



    } catch (error) {
        console.log("error in SendMesage controller",error.message)
        res.status(500).json({error:"internal server error"})
    }
}