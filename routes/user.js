const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

// ADD USER
router.post("/", userController.addUser);

// GET ALL USER
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

// GET AN USER
router.get("/:id", userController.getAnUser);

// UPDATE USER
router.put("/:id", userController.updateUser);

// DELETE USER
router.delete(
  "/:id",
  middlewareController.verifyTokenAdminAuth,
  userController.deleteUser
);

module.exports = router;
