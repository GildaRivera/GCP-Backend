const Picture = require("../models/picture.model");

// Create and Save a Picture
const createPicture = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }
  // Create a user
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
  const userId = req.body.userId  
  User.getAll(userId, (err, data) => {
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

module.exports = {
    createPicture,
    getPicturesWithoutAlbum,
}