const artController = require("../controllers/artController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

// ADD ART
router.post("/", middlewareController.verifyTokenAdminAuth, artController.addArt);

// GET ALL ART
router.get("/", middlewareController.verifyToken, artController.getAllArts);

// GET AN ART
router.get("/:id", middlewareController.verifyToken, artController.getAnArt);

// UPDATE ART
router.put("/:id", middlewareController.verifyTokenAdminAuth, artController.updateArt);

// DELETE ART
router.delete("/:id", middlewareController.verifyTokenAdminAuth, artController.deleteArt);

module.exports = router;