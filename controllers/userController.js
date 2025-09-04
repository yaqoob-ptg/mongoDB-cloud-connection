const User = require("../models/userModel");
const mongoose=require('mongoose')

// Create a new user
exports.createUser=async (req,res)=>{
    try{
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "This Email has already been registered" });
        }
        const user=new User(req.body);
        await user.save();
        res.status(201).json({message:"User Created successfully!",User: user});
    
    }catch(e){
        res.status(500).json({errror:e.message});
    }
}

// Get all users
exports.getAllUsers= async (req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json({message:'fetched Users successfully' ,Users:users});

    }catch(e){
        res.status(500).json({message:e.message})
    }
}


exports.getUserById= async (req,res)=>{
    try{
        const {id}=req.params;
         // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User fetched successfully by id",user} );
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}

exports.deleteUser= async (req,res)=>{
   try{
        const {id}=req.params;
         // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const result= await User.deleteOne({_id:id})
        if(result.deletedCount===0){
            return res.status(404).json({message:`User not found with the id:${id}`})
        }
        res.status(200).json({message:`User Deleted Successfully id:${id}`})
   }
   catch(e){
    res.status(500).json({message:e.message});
   }  
}  

exports.updateUser=async (req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid User ID format"})
        }
        const user =await User.findById(id)
        if(!user){
           return res.status(404).json({message:"user not found"})
        }
        const {name}=req.body;
       if (name) user.name = name;
        user.save()
        res.status(200).json({message:`User updated`,user })
    }catch(e){
        res.status(500).json({message:e.message})
    }
}