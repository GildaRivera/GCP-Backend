const sql = require("../../config/connection");
// constructor
const Album = function(album) {
    this.name = album.name
};
Album.create = (newAlbum, result) => {

  sql.query("INSERT INTO album SET ?", newAlbum, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...newAlbum});
  });
};

Album.getAll = (id,result) => {
  sql.query("SELECT * FROM album WHERE user_id = ?", id ,(err,data)=>{
    if(err) return result(null,err)
    return result(null,data)
  })
}


Album.delete = (id, result) => {
  sql.query("DELETE FROM album WHERE id = ?", id, (err, res) => {
    if (err) {
     return result(null, err);
    }
    if (res.affectedRows == 0) {
     return result({ kind: "not_found" }, null);

    }
    return result(null, res);
  });
};

module.exports = Album;