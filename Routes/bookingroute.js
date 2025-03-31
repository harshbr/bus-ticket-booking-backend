const router = require("express").Router();
const bookingmodel = require("../model/bookingmodel");
const busmodel = require("../model/busemodel");

router.post("/busbook", async (req, res) => {
  try {
    const userbooking = new bookingmodel(req.body);
    await userbooking.save();

    const busseatall = await busmodel.findOne({ _id: req.body.busid });
    busseatall.seatesbooked = [
      ...busseatall.seatesbooked,
      ...req.body.userseat,
    ];
    await busseatall.save();
    return res.status(200).send({
      success: true,
      messsage: "Your ticket booked successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/cancelbooking/:bookingid", async (req, res) => {
  try {
    // Find the booking
    const findbooking = await bookingmodel.findById(req.params.bookingid);
    if (!findbooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Find the bus associated with the booking
    const cancelseast = await busmodel.findById(findbooking.busid);
    if (!cancelseast) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    // Remove booked seats from the bus
    cancelseast.seatesbooked = cancelseast.seatesbooked.filter(
      (seat) => !findbooking.userseat.includes(seat)
    );

    await cancelseast.save();

    // Update booking status to "canceled"
    findbooking.status = "canceled";
    await findbooking.save();

    return res.status(200).json({
      success: true,
      message: "Booking canceled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
