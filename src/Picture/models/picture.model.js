
const sql = require("../../config/connection");
// constructor
const Picture = function(picture) {
    this.url = picture.url
    this.description = picture.description
};

Picture.create = (newPicture, result) => {
  sql.query("INSERT INTO picture (url, description, user_id) VALUES (?,?,?)", newPicture, (err, res) => {
    if (err) {
      return result(err.message, null);
    }
    return result(null, { id: res.insertId, ...newPicture});
  });
};
Picture.addToAlbum = (albumPicture, result) => {  
    sql.query("INSERT INTO album_has_picture (album_id, picture_id) VALUES (?,?)", albumPicture, (err, res) => {
      if (err) {
        return result(err, null);
      }
      return result(null, { id: res.insertId, ...albumPicture});
    });
};

Picture.getAll = (id, result) => {
    sql.query("SELECT * FROM picture LEFT JOIN album_has_picture ON album_has_picture.picture_id != picture.id WHERE user_id = ?", id , (err,data)=>{
        if(err) return result(err,null)
        return result(null, data)
    })
}

Picture.getImagesFromAlbum = (album,result) => {
  console.log("Album id: ",album)
  sql.query(`SELECT * FROM gcpBackend.album_has_picture INNER JOIN gcpBackend.picture ON album_has_picture.picture_id = picture.id WHERE album_has_picture.album_id = ${album}`,(err,data)=>{
    if(err) return result(err,null)
    return result(null,data)
  })
}

Picture.deleteFromAlbum = (imageAlbum, result) => {
  sql.query(`DELETE FROM album_has_picture WHERE picture_id = ${imageAlbum.image} && almbum_id = ${imageAlbum.album}`,(err, res) => {
    if (err) {
     return result(null, err);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = Picture;