import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uplodaOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

  // get user details from frontend
  // validation ->
  // Not empty
  // check if already exists: username && email
  // files should be there, avatar, coveer

  //upload to cloudinary
  //avatar check

  //create user object -> create entry in db
  //remove password and refresh token field from response
  //check for user creation
  // return response

  const { fullName, email, username, password } = req.body;
  console.log(fullName, email);

  // if(fullName===""){
  //     throw new ApiError(400,"fullName required");
  // }  but this is too lengthy so instead I will use..

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar files is requred");
  }

  const avatar = await uplodaOnCloudinary(avatarLocalPath);
  const cover = await uplodaOnCloudinary(coverLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName, 
    avatar: avatar.url,
    coverImage: cover?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered successfully")
  )
});

 
export {registerUser}
