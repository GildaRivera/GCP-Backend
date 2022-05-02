const { uploadFileToBucket } = require('../../config/storage');
const Picture = require("../models/picture.model");

const uploadImage = async (req,res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  try {
    const myFile = req.file
    const imageUrl = await uploadFileToBucket(myFile)
    const picture = [
      imageUrl,
      req.body.description || ' ',
      req.body.user_id
    ]
    Picture.create(picture, (err, data) => {
      if (err)
        return res.status(500).json({message:err.message,data:null})
      else {     
        return res.status(200).json({message:null,data:data})
      }
    });  
  } catch (error) {
    console.error(error)
  }  
}

// Create and Save a Picture
const createPicture = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  const picture = new Picture({
    url: req.body.url,
    username: req.body.description,
  });
  // Save user in the database
  Picture.create(picture, (err, data) => {
    if (err)
      return res.status(500).json({message:err.message,data:null})
    else {     
      return res.status(200).json({message:null,data:data})
    }
  }); 
};

// Retrieve all Albums
const getPicturesWithoutAlbum = (req, res) => {
  
  const userId = req.query.userId 
  Picture.getAll(userId, (err, data) => {
    if (err)
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving users", data:null
      });
    else {
      if (data.length == 0) {
        return res.status(403).json({
          message: "Not users found",
          data:null
        });
      }
      return res.status(200).json({message:null,data:data});
    }
  }); 
};

// Retrieve all Albums
const getPicturesFromAlbum = (req, res) => {
  console.log(req.query)
  const albumId = req.query.albumId 
  Picture.getImagesFromAlbum(albumId, (err, data) => {
    if (err)
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving users", data:null
      });
    else {
      if (data.length == 0) {
        return res.status(403).json({
          message: "Not users found",
          data:null
        });
      }
      return res.status(200).json({message:null,data:data});
    }
  }); 
};

const addImageToAlbum = (req,res) => {
  const imageAlbum = [
    req.body.album,
    req.body.image
  ]
  Picture.addToAlbum(imageAlbum,(err,data) => {
    if(err){
      return res.status(500).json({
        message:err,
        data:null
      })
    }
    return res.status(200).json({
      message:null,
      data:data
    })
  })
}

const deleteImageFromAlbum = (req,res) => {
  const imageAlbum = {
    album:req.body.album,
    image:req.body.image
  }
  Picture.deleteFromAlbum(imageAlbum,(err,data) => {
    if(err){
      return res.status(500).json({
        message:err,
        data:null
      })
    }
    return res.status(200).json({
      message:null,
      data:data
    })
  })
} 
module.exports = {
    createPicture,
    getPicturesWithoutAlbum,
    getPicturesFromAlbum,
    addImageToAlbum,
    deleteImageFromAlbum,
    uploadImage
}