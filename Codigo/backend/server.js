const https = require("https"); // Importar HTTPS
const fs = require("fs"); // Leer los certificados
const crypto = require('crypto'); // Para cifrado asimétrico
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

// Registro de usuario
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cifrar la contraseña usando RSA
    const encryptedPassword = crypto.publicEncrypt(publicKey, Buffer.from(password));
    
    // Verificar que los datos estén llegando
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Encrypted Password:", encryptedPassword.toString("base64"));

    // Insertar en la base de datos
    const query = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(query, [email, encryptedPassword.toString("base64")], (err, result) => {
      if (err) {
        console.error("Error al registrar el usuario:", err);
        res.status(500).send("Error al registrar el usuario");
      } else {
        console.log("Usuario registrado con éxito:", result);
        res.status(200).send("Usuario registrado con éxito");
      }
    });
  } catch (err) {
    console.error("Error al cifrar la contraseña:", err);
    res.status(500).send("Error al procesar el registro");
  }
});


// Leer claves SSL
const privateKeySSL = fs.readFileSync("certs/key.pem", "utf8");
const certificate = fs.readFileSync("certs/cert.pem", "utf8");

const credentials = { key: privateKeySSL, cert: certificate };

// Leer las claves RSA
const publicKey = fs.readFileSync("public.pem", "utf8");
const privateKey = fs.readFileSync("private.pem", "utf8");
console.log("Clave pública cargada:", publicKey);

// Configurar la conexión con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CocaCola.020605",
  database: "urbanGoDB",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa con la base de datos");
});

// Login de usuario
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send("Error en el servidor");
      return;
    }
    if (results.length === 0) {
      res.status(401).send("Usuario no encontrado");
      return;
    }

    const user = results[0];
    try {
      const decryptedPassword = crypto.privateDecrypt(
        privateKey,
        Buffer.from(user.password, "base64")
      );

      if (password !== decryptedPassword.toString("utf8")) {
        res.status(401).send("Contraseña incorrecta");
      } else {
        res.status(200).send("Inicio de sesión exitoso");
      }
    } catch (err) {
      console.error("Error al descifrar la contraseña:", err);
      res.status(500).send("Error en el servidor");
    }
  });
});

// Crear el servidor HTTPS
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
