
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let student = [
    { stdId: "69319010001", stdName: "ธรรมรัตน์ สีหเนตร", class: "ปวส.1/1" },
    { stdId: "69319010002", stdName: "ภัทรวดี ไทยสา", class: "ปวส.1/1" },
    { stdId: "69319010003", stdName: "รุจบดี ศรีอุดม", class: "ปวส.1/1" },
    { stdId: "69319010004", stdName: "สุชาญา ศรีบุรินทร์", class: "ปวส.1/1" },
    { stdId: "69319010006", stdName: "อรรถพร มานาโยค", class: "ปวส.1/1" },
    { stdId: "69319010016", stdName: "พงศพัศ ยะถา", class: "ปวส.1/1" },
    { stdId: "69319010017", stdName: "พัทธนันต์ โพธิ์ศรี", class: "ปวส.1/1" },
    { stdId: "69319010025", stdName: "กุลนิดา ไชยคีนี", class: "ปวส.1/1" },
    { stdId: "69319010026", stdName: "สุธานันท์ สายบุญเลิศ", class: "ปวส.1/1" },
    { stdId: "69319010028", stdName: "นิชินันท์ จัตุรัส", class: "ปวส.1/1" },
    { stdId: "69319010031", stdName: "ปรมี จันปัญญา", class: "ปวส.1/1" }
];

app.get("/api/getStudent", (req, res) => {
    res.json({
        message: "ข้อมูลนักศึกษาทั้งหมด",
        total: student.length,
        data: student
    });
});

app.get("/api/getStudent/count", (req, res) => {
    res.json({
        total: student.length
    });
});

app.get("/api/getStudent/:stdid", (req, res) => {
    const stdid = req.params.stdid;

    const result = student.find(
        (s) => s.stdId === stdid
    );

    if (!result) {
        return res.status(404).json({
            message: "ไม่พบข้อมูลนักศึกษา"
        });
    }

    res.json({
        message: "พบข้อมูลนักศึกษา",
        data: result
    });
});

app.get("/api/student", (req, res) => {
    const { stdid, stdname, class: studentClass } = req.query;

    let result = student;

    if (stdid) {
        result = result.filter(s => s.stdId === stdid);
    }

    if (stdname) {
        result = result.filter(s =>
            s.stdName.includes(stdname)
        );
    }

    if (studentClass) {
        result = result.filter(s =>
            s.class === studentClass
        );
    }

    res.json({
        message: "ค้นหาข้อมูลนักศึกษาสำเร็จ",
        total: result.length,
        data: result
    });
});

app.post("/api/student", (req, res) => {
    const { stdId, stdName, class: studentClass } = req.body;

    if (
        typeof stdId !== "string" ||
        !/^\d{11}$/.test(stdId) ||
        typeof stdName !== "string" ||
        !stdName.trim() ||
        typeof studentClass !== "string" ||
        !studentClass.trim()
    ) {
        return res.status(400).json({
            message: "กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน"
        });
    }

    if (student.some(s => s.stdId === stdId)) {
        return res.status(409).json({
            message: "รหัสนักศึกษานี้มีอยู่แล้ว"
        });
    }

    const newStudent = {
        stdId,
        stdName: stdName.trim(),
        class: studentClass.trim()
    };

    student.push(newStudent);

    res.status(201).json({
        message: "เพิ่มข้อมูลนักศึกษาสำเร็จ",
        data: newStudent
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
