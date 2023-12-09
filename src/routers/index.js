const express = require("express");
const router = express.Router();
const Login = require("../models/logins.js");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
const { checkSessionActive } = require("../middlewares/checkSessionActive.js");
const net = require("net");
const chats = require("../models/chats.js");
const mensajes = [];

let mensaje = '';
let usuario = '';

router.use(
  session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
  })
);

// Middleware para verificar la sesión
function createSessionCheck(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }

    req.usuario = decoded;
    next();
  });
}

// Ruta principal
router.get("/", checkSessionActive, async (req, res) => {
  res.render("login.ejs", { mensaje });
});

// Ruta de inicio de sesión
router.get("/login", checkSessionActive, async (req, res) => {
  try {
    if (req.session.token) {
      return res.redirect("/chat");
    }
    const users = await Login.find();
    res.render("login.ejs", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los datos de usuario");
  }
});

router.use(express.urlencoded({ extended: true }));
// Ruta del chat
router.get("/chat", createSessionCheck, async (req, res) => {
  try {
    const mensajes = await chats.find();
    const userA = req.session.username;
    res.render('chat.ejs', { mensajes, userA });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los mensajes");
  }
});

// Ruta para verificacion de usuarios
router.post("/vice", async (req, res) => {
  const { username, userpassword } = req.body;
  usuario = username;
  req.session.username = username

  try {
    const user = await Login.findOne({ username  });

    if (!user || userpassword !== user.pass) {
      return res.status(401).send("Nombre de usuario o contraseña incorrecta");
    }
    //creacion de token
    const usuario = { id: 1, nombre: "Ejemplo" };
    const token = jwt.sign(usuario, secretKey, { expiresIn: "1h" });
    req.session.token = token;

    res.redirect("/chat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al iniciar sesión");
  }
});

// Ruta para registrar usuarios
router.post("/register", async (req, res) => {
  const valor = new Login(req.body);
  await valor.save();
  res.redirect('/login');
});

// Manejo de conexiones de eventos servidor-sentido (SSE)
const sseClients = [];

router.get("/sse", createSessionCheck, (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  sseClients.push(res);

  req.on("close", () => {
    const index = sseClients.indexOf(res);
    if (index !== -1) {
      sseClients.splice(index, 1);
    }
  });
});

// Ruta para enviar mensajes
router.post("/send",createSessionCheck, async (req, res) => {
  if (usuario) {
    const message = req.body.mensaje;
    const nuevoMensaje = new chats({
      user: req.session.username,
      message: message,
    });

    try {
      await nuevoMensaje.save();

      sseClients.forEach((client) => {
        client.write(`data: ${JSON.stringify({ user: req.session.username, message })}\n\n`);
      });

      res.redirect('/chat');
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al guardar el mensaje en la base de datos");
    }
  } else {
    res.status(400).send("Nombre de usuario no disponible");
  }
});


// Logout

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/login");
  });
});


module.exports = router;
