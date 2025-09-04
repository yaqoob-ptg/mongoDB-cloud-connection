const User = require("../models/userModel");

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
        res.status(201).json(user);
    
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
    
}