
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const equipment = [
    { id: 101, name: "คอมพิวเตอร์", quantity: 10, category: "computer" },
    { id: 102, name: "โน้ตบุ๊ก", quantity: 5, category: "Computer" },
    { id: 103, name: "เมาส์", quantity: 15, category: "hardware" }
];

app.get("/", (req, res) => {
    res.send("สวัสดีนี่คือ workshop1 backend");
});

app.post("/api/equipment", (req, res) => {
    const { name, quantity, category } = req.body || {};

    
    if (!name || name.trim() === "" ||
        typeof quantity !== "number" || quantity < 0 ||
        !category || category.trim() === "") {
        return res.status(400).json({
            message: "ข้อมูลไม่ถูกต้อง"
        });
    }

    const id = equipment.length + 101;

    const newEquipment = {
        id: id,
        name: name,
        quantity: quantity,
        category: category
    };

    equipment.push(newEquipment);

    res.status(201).json(newEquipment);
});

app.get("/api/equipment/count", (req, res) => {
    res.status(200).json({
        total: equipment.length
    });
});

app.get("/api/equipment/:id", (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).json({
            message: "ID ไม่ถูกต้อง"
        });
    }

    const result = equipment.find(item => item.id == id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({
            message: "ไม่พบอุปกรณ์"
        });
    }
});

app.get("/api/equipment", (req, res) => {
    const cat = req.query.category;
    const name = req.query.name;

    if (cat === "") {
        return res.status(400).json({
            message: "กรุณาระบุ category"
        });
    }

    const result = cat
        ? equipment.filter(item =>
            item.category.toLowerCase() === cat.toLowerCase())
        : equipment;

    const result2 = name
        ? result.filter(item => item.name === name)
        : result;

    res.status(200).json(result2);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
