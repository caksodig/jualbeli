// iniaili library
const express = require("express")
const BodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const bodyParser = require("body-parser")

// implementasi

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jual_beli"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// end-point akses data pelanggan
app.get("/pembeli", (req, res) => {
    // create sql query
    let sql = "select * from pelanggan"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                pelanggan: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data pelanggan berdasarkan id_pelanggan tertentu
app.get("/pembeli/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    // create sql query
    let sql = "select * from pelanggan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                pelanggan: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data pelanggan
app.post("/pembeli", (req, res) => {

    // prepare data
    let data = {
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat
    }

    // create sql query insert
    let sql = "insert into pelanggan set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data pelanggan
app.put("/pembeli", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_pelanggan: req.body.nama_pelanggan,
            alamat: req.body.alamat
        },

        // parameter (primary key)
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    // create sql query update
    let sql = "update pelanggan set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data pelanggan berdasarkan id_pelanggan
app.delete("/pembeli/:id", (req, res) => {
    // prepare data
    let data = {
        id_pelanggan: req.params.id
    }

    // create query sql delete
    let sql = "delete from pelanggan where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

//barang

// end-point akses data barang
app.get("/barang", (req, res) => {
    // create sql query
    let sql = "select * from barang"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                barang: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data barang berdasarkan id_barang tertentu
app.get("/barang/:id", (req, res) => {
    let data = {
        id_barang: req.params.id
    }
    // create sql query
    let sql = "select * from barang where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                barang: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data barang
app.post("/barang", (req, res) => {

    // prepare data
    let data = {
        nama_barang: req.body.nama_barang,
        kondisi_barang :req.body.kondisi_barang,
        stok: Number (req.body.stok)
    }

    // create sql query insert
    let sql = "insert into barang set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data barang
app.put("/barang", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_barang: req.body.nama_barang,
            kondisi_barang :req.body.kondisi_barang,
            stok: Number (req.body.stok)
        },

        // parameter (primary key)
        {
            id_barang: req.body.id_barang
        }
    ]

    // create sql query update
    let sql = "update barang set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data barang berdasarkan id_barang
app.delete("/barang/:id", (req, res) => {
    // prepare data
    let data = {
        id_barang: req.params.id
    }

    // create query sql delete
    let sql = "delete from barang where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

//admin

// end-point akses data admin
app.get("/admin", (req, res) => {
    // create sql query
    let sql = "select * from admin"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point akses data admin berdasarkan id_admin tertentu
app.get("/admin/:id", (req, res) => {
    let data = {
        id_admin: req.params.id
    }
    // create sql query
    let sql = "select * from admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }
        } else {
            response = {
                count: result.length, // jumlah data
                admin: result // isi data
            }
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data admin
app.post("/admin", (req, res) => {

    // prepare data
    let data = {
        nama_admin: req.body.nama_admin,
        status_admin: req.body.status_admin
      
    }

    // create sql query insert
    let sql = "insert into admin set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data masuk"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data admin
app.put("/admin", (req, res) => {

    // prepare data
    let data = [
        // data
        {
            nama_admin: req.body.nama_admin,            
            status_admin: req.body.status_admin            

            
        },

        // parameter (primary key)
        {
            id_admin: req.body.id_admin
        }
    ]

    // create sql query update
    let sql = "update admin set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data barang berdasarkan id_barang
app.delete("/admin/:id", (req, res) => {
    // prepare data
    let data = {
        id_admin: req.params.id
    }

    // create query sql delete
    let sql = "delete from admin where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

app.listen(8000, () => {
    console.log("gabole nyerah ")
})
