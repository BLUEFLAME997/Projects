import imagekit from "../config/imagekit.js";

export async function uploadImageService(filename,fileBuffer){
  const result = await imagekit.upload({
    file:fileBuffer,
    fileName:filename,
    folder:'Nexa/groupAvatar'
  })

  return result.url;
}