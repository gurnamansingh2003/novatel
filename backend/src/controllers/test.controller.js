const testController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test API working successfully",
    service: "Novatel Backend",
  });
};

module.exports = {
  testController,
};