
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
    query1 = "SELECT * FROM picture WHERE user_id=${id} EXCEPT SELECT t1.id, t1.url, t1.description, t1.user_id FROM picture AS t1 JOIN album_has_picture AS t2 ON t2.picture_id = t1.id WHERE t1.user_id = ${id};"

    sql.query(`SELECT * FROM picture WHERE user_id=${id}`,(err,data)=>{
        if(err) return result(err,null)
        return result(null, data)
    })
}

Picture.getImagesFromAlbum = (album,result) => {
  sql.query(`SELECT * FROM gcpBackend.album_has_picture INNER JOIN gcpBackend.picture ON album_has_picture.picture_id = picture.id WHERE album_has_picture.album_id = ${album}`,(err,data)=>{
    if(err) return result(err,null)
    return result(null,data)
  })
}

Picture.deletePicture = (id,result)=>{
  sql.query(`DELETE FROM picture WHERE id=${id}`,(err, data) => {
    if (err) {
      return result(err,null)
    }
    return result(null,data)
  })
}

Picture.deleteFromAlbum = (imageAlbum, result) => {
  sql.query(`DELETE FROM album_has_picture WHERE picture_id = ${imageAlbum.image} && album_id = ${imageAlbum.album}`,(err, res) => {
    if (err) {
     return result(err, null);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = Picture;