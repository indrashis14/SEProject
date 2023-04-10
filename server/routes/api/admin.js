const express = require('express');
const router = express.Router();

router.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ "result": "invalid data" });
    }
    if (userName === 'admin' && password === 'admin') {
        // If the credentials are correct, send a success response
        res.status(200).json({ message: 'Login successful' });
      } else {
        // If the credentials are incorrect, send an error response
        res.status(401).json({ message: 'Invalid username or password' });
      }
})

module.exports = router;