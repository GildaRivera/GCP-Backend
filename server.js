
const express = require("express");
const cors = require("cors");
const app = express();
const multerMid = require('./multer')
const sql = require('./src/config/connection')

require("dotenv").config();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// App initialize the multer
app.disable('x-powered-by')
app.use(multerMid.single('file')) 

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  sql.query('SHOW COLUMNS FROM gcpBackend.picture',(err, data) => {
    console.log(data)
    if (err) {
      return res.status(500).json(err.message, null);
    }
    return res.status(200).json({data});
  })
})
app.get("/pictures", (req, res) => {
  sql.query('SELECT * FROM picture',(err, data) => {
    console.log(data)
    if (err) {
      return res.status(500).json(err.message, null);
    }
    return res.status(200).json({data});
  })
})
app.get("/drop", (req, res) => {
  sql.query('ALTER TABLE picture DROP COLUMN description',(err, data) => {
    console.log(data)
    if (err) {
      return res.status(500).json(err.message, null);
    }
    return res.status(200).json({data});
  })
})
app.get("/add", (req, res) => {
  sql.query('ALTER TABLE picture ADD description varchar(255)',(err, data) => {
    console.log(data)
    if (err) {
      return res.status(500).json(err.message, null);
    }
    return res.status(200).json({data});
  })
})


require("./src/routes/routes")(app)

// set port, listen for requests
const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
