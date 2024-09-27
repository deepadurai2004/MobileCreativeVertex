const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const mongoURI =
    "mongodb+srv://deepa:deepa123@cluster0.8rtm2.mongodb.net/crud_db?retryWrites=true&w=majority";
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.error("MongoDB connection error:", err));
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
const Item = mongoose.model("Item", itemSchema);
app.get("/item", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.post("/item", async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    try {
        const savedItem = await newItem.save();
        res.json(savedItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put("/item/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.param.id, {
            name: req.body.name,
        });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete("/items/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.param.id);
        res.json({ success: true });
    } catch (err) {
        res.json(500).json({ error: err.message });
    }
});
app.listen(port, () => {
    console.log("Server running on port ${port}");
});
