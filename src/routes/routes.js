module.exports = routes => {
    const user= require("../User/controllers/user.controllers")
    const album = require("../Album/controllers/album.controller")
    const picture = require("../Picture/controllers/picture.controllers")
    var router = require("express").Router();
    // USER
    // Create a new user
    router.post("/user", user.createUser);
    // Retrieve all user
    router.get("/user", user.getAllUsers);
    // Retrieve a single user with id
    router.get("/user/:id", user.getUser);
    // Update a user with id
    router.put("/user/:id", user.updateUser);
    // Delete a user with id
    router.delete("/user/:id", user.deleteUser);
    // Login user
    router.post("/login", user.loginUser);

    //Album
    //Post album
    router.post('/album',album.createAlbum)

    //Get albumes
    router.get('/album',album.getAlbum)

    //Delete Album
    router.delete('/album',album.deleteAlbum)
    
    //Picture
    //Create a new picture
    router.post("/picture", picture.createPicture);
   
    //Retrieve all pictures
    router.get("/picture", picture.getPicturesWithoutAlbum);
    
    //Add image to album
    router.post("/addImageToAlbum",picture.addImageToAlbum);
    
    //Delete Picture
    router.delete("picture",picture.deleteImageFromAlbum)





    routes.use('/api', router);
  };