
import express from "express";

const app = express();
const PORT = 3001;

// API ตรวจสอบสถานะ Server
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running"
    });
});

// API คำนวณกฎของโอมด้วย Query Parameter
// สูตร V = I x R
app.get("/api/formula1", (req, res) => {
    const I = Number(req.query.I);
    const R = Number(req.query.R);

    if (
        req.query.I === undefined ||
        req.query.R === undefined ||
        !Number.isFinite(I) ||
        !Number.isFinite(R)
    ) {
        return res.status(400).json({
            error: "กรุณาระบุค่า I และ R ให้ถูกต้อง"
        });
    }

    const V = I * R;

    res.json({
        formula: "V = I x R",
        current: I,
        resistance: R,
        voltage: V,
        unit: "Volt"
    });
});

//API คำนวณกฎของโอมด้วย Path Parameter
// สูตร R = V / I
app.get("/api/formula2/:V/:I", (req, res) => {
    const V = Number(req.params.V);
    const I = Number(req.params.I);

    if (
        !Number.isFinite(V) ||
        !Number.isFinite(I) ||
        I === 0
    ) {
        return res.status(400).json({
            error: "กรุณาระบุค่า V และ I ให้ถูกต้อง และ I ต้องไม่เป็น 0"
        });
    }

    const R = V / I;

    res.json({
        formula: "R = V / I",
        voltage: V,
        current: I,
        resistance: R,
        unit: "Ohm"
    });
});

// เริ่มต้น Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
