const express = require("express");
const router = express.Router();
const user = require("../Models/User/CreateUser");

//
router.post("/createuser", async (req, res) => {
  function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }
    return randomString;
  }

  // Generate a random string of length 7
  const randomString = generateRandomString(7);
  const { first_name, last_name, email, gender, domain, available } = req.body;
  const user1 = {
    first_name,
    last_name,
    email,
    gender,
    avatar: `https://robohash.org/${randomString}.png?size=50x50&set=set1`,
    domain,
    available,
  };
  try {
    const data1 = new user(user1);
    const cr = await data1.save();
    res.json(cr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
router.post("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, gender, domain, available } = req.body;

  try {
    const data1 = await user.updateOne(
      { id },
      { first_name, last_name, email, gender, domain, available }
    );
    res.json(data1);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fu = await user.find({ id });
    res.json({ data: fu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/deleteusers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const fu = await user.deleteOne({ id });
    res.json({ data: fu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/users", async (req, res) => {
  const { domain, gender, available, pageno , searchterm} = req.query;
  const page = parseInt(pageno) - 1;
  const query = {};
  if (searchterm && searchterm !== "null") {
    // Convert searchterm to lowercase
    const searchTermLowerCase = searchterm.toLowerCase();
    // Add a regex search for first_name attribute
    query.first_name = { $regex: new RegExp(searchTermLowerCase, "i") };
  }
  const skip = page * 20
  
  if (domain && domain!=="null" ) query.domain = domain;
  if (gender && gender!=="null") query.gender = gender;
  if (available && available!==null && available!=="null") query.available = available;
  try {
    const fu = await user.find(query).skip(skip).limit(20);
    res.json({ data: fu });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/logout", (req, res) => {
  // Delete session token
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    } else {
      console.log("Session token deleted successfully");
      res.json({ deleted: "yeas" });
    }
    // Redirect or respond as desired
  });
});

module.exports = router;
