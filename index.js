const express = require("express");
const bodyParser = require("body-parser");
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  if (myUser) {
    if (myUser.username == "" && myUser.password == "" && myUser.rol == "") {
      if (myUser.rol == "1") {
        res.redirect("/controlpanel");
      } else if (myUser.rol == "2") {
        res.redirect("/customer");
      } else {
        res.redirect("/autherror");
      }
    } else {
      res.sendFile("views/login.html", { root: __dirname });
    }
  } else {
    res.sendFile("views/login.html", { root: __dirname });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
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
      res.redirect("/autherror");
    }
  } else {
    res.redirect("/autherror");
  }
});

app.get("/autherror", (req, res) => {
  res.sendFile("views/autherror.html", { root: __dirname });
});

app.get("/controlpanel", (req, res) => {
  if (myUser.rol === "1") {
    res.sendFile("views/controlpanel.html", { root: __dirname });
  } else {
    res.sendFile("views/autherror.html", { root: __dirname });
  }
});

app.get("/customer", (req, res) => {
  if (myUser.rol === "2") {
    res.sendFile("views/customer.html", { root: __dirname });
  } else {
    res.sendFile("views/autherror.html", { root: __dirname });
  }
});

app.get("/weare", (req, res) => {
  if (myUser.rol === "2") {
    res.sendFile("views/weare.html", { root: __dirname });
  } else {
    res.sendFile("views/autherror.html", { root: __dirname });
  }
});

app.post("/contacts", (req, res) => {
  if (myUser.rol === "2") {
    res.sendFile("views/contacts.html", { root: __dirname });
  } else {
    res.sendFile("views/autherror.html", { root: __dirname });
  }
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
