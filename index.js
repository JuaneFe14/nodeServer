const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const port = 2000;
const app = express();

let users = [
  {
    username: "root",
    name: "Super usuario",
    password: "1",
    rol: "1",
  },
  {
    username: "jq",
    name: "Juan Quintero",
    password: "14",
    rol: "2",
  },
  {
    username: "wr",
    name: "William Ruiz",
    password: "01",
    rol: "2",
  },
  {
    username: "ar",
    name: "Alejandro Restrepo",
    password: "01",
    rol: "2",
  },
];

let myUser;
let estado = true;
let rol = 1;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("views/login.html", { root: __dirname });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  let userFind = users.find(
    (user) => user.username == username && user.password == password
  );
  if (userFind) {
    myUser = userFind;
    if (myUser.rol == "1") {
      res.redirect("/controlpanel");
    } else if (myUser.rol == "2") {
      res.redirect("/customer");
    } else {
      res.send("usuario no registrado");
    }
  } else {
    res.send("Paila. Revise a ver ¿Si esta registrado, cv?");
  }
});

app.get("/controlpanel", (req, res) => {
  res.sendFile("views/controlpanel.html", { root: __dirname });
});

app.get("/customer", (req, res) => {
  res.sendFile("views/customer.html", { root: __dirname });
});

app.get("/quienessomos", (req, res) => {
  res.sendFile("views/quienessomos.html", { root: __dirname });
});

app.post("/contacts", (req, res) => {
  res.sendFile("views/contacts.html", { root: __dirname });
});

app.put("/,", (req, res) => {
  res.send("Estamos en la ruta: /,");
});

app.delete("/students", (req, res) => {
  res.send("Estamos en la ruta: /students");
});

app.listen(port, () => {
  console.log(`Server in http://localhost:${port}`);
});
