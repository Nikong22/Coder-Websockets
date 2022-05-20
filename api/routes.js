const express = require("express");
// const productos = require("../productos.js");
const routes_controller = require('./controllers/routes.controller');

const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  res.sendFile("/public/index.html")
});

router.get('/productos', function (req, res) {
  let tieneDatos;
  const productos = routes_controller.getProductos()
  if (productos.length > 0) {
    tieneDatos = true
  } else {
    tieneDatos = false
  }
  res.render('main', { productos: productos, listExists: tieneDatos });
});

router.get("/productos/:id", (req, res) => {
  const producto = routes_controller.getProducto(req, res)
  let tieneDatos;
  if (producto) {
    tieneDatos = true
  }else{
    tieneDatos = false
  }
  const productos = []
  productos.push(producto);
  res.render('main', { productos: productos, listExists: tieneDatos });
});

router.post("/productos", function (req, res) {
  routes_controller.nuevoProducto(req);
  res.redirect("../../../");
});

router.put("/productos/:id", (req, res) => {
  routes_controller.actualizarProducto(req);
  res.send("Producto Actualizado");
});

router.delete("/productos/:id", (req, res) => {
  routes_controller.borrarProducto(req);
  res.send("Producto Borrado");
});

module.exports = router;
