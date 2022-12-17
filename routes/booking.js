const bookingController = require("../controllers/bookingController");
const middlewareController = require("../controllers/middlewareController");

const router = require("express").Router();

// ADD BOOKING
router.post(
  "/",
  middlewareController.verifyToken,
  bookingController.addBooking
);

// GET ALL BOOKING
router.get("/", middlewareController.verifyTokenAdminAuth, bookingController.getAllBooking);

// GET AN BOOKING
router.get("/:id", bookingController.getAnBooking);

// UPDATE AN BOOKING
router.put(
  "/:id",
  middlewareController.verifyTokenAdminAuth,
  bookingController.updateBooking
);

// DELETE AN BOOKING
router.delete(
  "/:id",
  middlewareController.verifyTokenAdminAuth,
  bookingController.deleteBooking
);

module.exports = router;
