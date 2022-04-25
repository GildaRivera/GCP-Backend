const sql = require("../../config/connection");
// constructor
const Picture = function(picture) {
    this.url = picture.url
    this.description = picture.description
};
Picture.create = (newPicture, result) => {
  
  sql.query("INSERT INTO picture SET ?", newPicture, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...newPicture});
  });
};
Picture.addToAlbum = (albumPicture, result) => {
    
    sql.query("INSERT INTO album_has_picture SET ? ", albumPicture, (err, res) => {
      if (err) {
        return result(err, null);
      }
      return result(null, { id: res.insertId, ...newPicture});
    });
};
Picture.getAll = (id, result) => {
    sql.query("SELECT * FROM picture WHERE user_id = ? ", id , (err,data)=>{
        if(err) return result(err,null)
        return result(null, data)
    })
}

Picture.remove = (id, result) => {
  sql.query("DELETE FROM album_has_picture WHERE picture_id = ?", id, (err, res) => {
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