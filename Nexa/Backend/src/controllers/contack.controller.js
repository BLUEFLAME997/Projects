import userModel from "../models/user.model.js";
import contactModel from "../models/contact.model.js";

export async function addUserContactController(req, res) {
  const { userId } = req.params;
  const ownerId = req.user.id;

  if (!userId) {
    return res.status(400).json({
      Message: "UserId not provided",
      success: false
    })
  }

  const isUserExist = await userModel.findById(userId)
  if (!isUserExist) {
    return res.status(404).json({
      Message: "User not found",
      success: false
    })
  }

  if (ownerId === userId) {
    return res.status(400).json({
      Message: "You cannot add yourself as a contact"
    })
  }

  const alreadyContact = await contactModel.findOne({
    owner: ownerId,
    contactUser: userId
  })
  if (alreadyContact) {
    return res.status(409).json({
      Message: "User already in a contact",
      success: false
    })
  }

  const contactUser = await contactModel.create({
    owner: ownerId,
    contactUser: userId,
  })

  res.status(201).json({
    Message: "User added to contact list",
    success: true,
    contactUser
  })
}

export async function searchUserController(req, res) {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({
      Message: "Username not provided",
      success: false
    })
  }

  const isUserExist = await userModel.findOne({
    username:username
  })
  if (!isUserExist) {
    return res.status(404).json({
      Message:"User not found with provided id",
      success:false
    })
  }

  res.status(200).json({
    Message: "User data fetched successfully",
    success: true,
    isUserExist
  })
}

export async function listUserContactController(req, res) {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({
      Message: "UserId not provided",
      success: false
    })
  }

  const contactList = await contactModel
    .find({ owner: userId })
    .populate('contactUser', '-password');
  res.status(200).json({
    Message: "User contact details fetched successfully",
    success: true,
    contactList
  })
}

export async function deleteUserContactController(req,res){
  const {userId} = req.params;
  const ownerId = req.user.id;

  if(!userId){
    return res.status(400).json({
      Message:"UserId not provided",
      success:false
    })
  }

  const isUserExist = await contactModel.findById(userId);
  if(!isUserExist){
    return res.status(404).json({
      Message:"User is not in a contact list",
      success:false
    })
  }

  const deleteUser = await contactModel.findOneAndDelete({
    owner:ownerId,
    contactUser:userId
  })

  res.status(200).json({
    Message:"User removed from contact successfully",
    success:true
  })
}