const router = require("express").Router();
const busmodel = require("../model/busemodel");

router.post("/addbus", async (req, res) => {
  const {
    name,
    number,
    capacity,
    from,
    to,
    journeydate,
    departure,
    arrival,
    type,
    price,
    seatesbooked,
    status,
  } = req.body;

  try {
    const checkbus = await busmodel.findOne({ number });
    if (checkbus) {
      return res.status(400).json({
        success: false,
        message: "bus already exist",
      });
    }

    const addbustodb = new busmodel(req.body);
    await addbustodb.save();
    return res.status(200).json({
      success: true,
      message: "bus added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/getbus", async (req, res) => {
  try {
    const getbusfromDB = await busmodel.find({});
    return res.status(200).json({
      success: true,
      message: "bus data fetched successfully",
      data: getbusfromDB,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/getbusById/:busId", async (req, res) => {
  const { busId } = req.params;
  try {
    const getonebus = await busmodel.findById(busId);
    return res.status(200).json({
      success: true,
      message: "each bus data fetched successfully",
      data: getonebus,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
// Delete bus using findByIdAndDelete
router.delete("/delete/:id", async (req, res) => {
  try {
    // Deleting the bus by its ID
    const deletedBus = await busmodel.findByIdAndDelete(req.params.id);

    // Check if the bus was found and deleted
    if (!deletedBus) {
      return res.status(404).send({
        success: false,
        message: "Bus not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Bus deleted successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    number,
    capacity,
    from,
    to,
    journeydate,
    departure,
    arrival,
    type,
    price,
  } = req.body;

  try {
    // Find the bus by ID
    const bus = await busmodel.findById(id);

    // If bus is not found, return an error message
    if (!bus) {
      return res.status(400).json({
        success: false,
        message: "Bus not found",
      });
    }

    // Update bus properties
    bus.name = name;
    bus.number = number;
    bus.capacity = capacity;
    bus.from = from;
    bus.to = to;
    bus.journeydate = journeydate;
    bus.departure = departure;
    bus.arrival = arrival;
    bus.type = type;
    bus.price = price;

    // Save updated bus to the database
    await bus.save();

    return res.status(200).send({
      success: true,
      message: "Bus updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
