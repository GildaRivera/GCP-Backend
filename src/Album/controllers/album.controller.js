const Album = require("../models/album.models");

const createAlbum = (req, res) => {
  // Validate request
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      error: "Bad request",
    });
  }

  const album = new Album({
    name: req.body.name
  });
  Album.create(album, (err, data) => {
    if (err)
      return res.status(500).json({message:err.message,data:null})
    else {     
      return res.status(200).json({message:null,data:data})
    }
  });
};

// Retrieve all Albums
const getAlbum = (req, res) => {
  const userId = req.body.userId 
  Album.getAll(userId, (err, data) => {
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



const deleteAlbum = (req,res) => {
  const album_id = req.body.id   
  Album.delete(album_id,(err,data) => {
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
    createAlbum,
    getAlbum,
    deleteAlbum
}