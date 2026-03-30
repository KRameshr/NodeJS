const express = require("express");
const router = express.Router();
const Hero = require("../models/heroModel");

// --- VIEW ROUTE ---
router.get("/", (req, res) => {
  res.render("index", { title: "Hero Management System" });
});

// --- READ ALL ---
router.get("/data", (req, res) => {
  Hero.find()
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// --- READ ONE ---
router.get("/getone/:id", (req, res) => {
  Hero.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err));
});

// --- CREATE (With Socket Emit) ---
router.post("/save", (req, res) => {
  const hero = new Hero(req.body);

  hero
    .save()
    .then((result) => {
      // 📢 GLOBAL EMIT: Notify all clients a new hero was added
      req.io.emit("hero-added", result);
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
});

// --- UPDATE (With Socket Emit) ---
router.put("/update/:id", (req, res) => {
  Hero.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" }, // Updated to fix Mongoose warning
  )
    .then((result) => {
      // 📢 GLOBAL EMIT: Notify all clients to update this specific row
      req.io.emit("hero-updated", result);
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
});

// --- DELETE (With Socket Emit) ---
router.delete("/delete/:id", (req, res) => {
  Hero.findByIdAndDelete(req.params.id)
    .then((result) => {
      // 📢 GLOBAL EMIT: Tell all clients to remove this ID from their table
      req.io.emit("hero-deleted", req.params.id);
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
