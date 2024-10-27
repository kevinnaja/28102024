document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const studentName = document.getElementById('studentName').value;
    const currentTime = new Date().toLocaleString('th-TH');
    
    const recordList = document.getElementById('recordList');
    const newRecord = document.createElement('li');
    newRecord.textContent = `${studentName} เข้าเรียนเวลา ${currentTime}`;
    
    recordList.appendChild(newRecord);
    document.getElementById('attendanceForm').reset();
});

const students = [
    { id: "S001", name: "สมชาย ใจดี" },
    { id: "S002", name: "สมศรี ใจเย็น" },
    { id: "S003", name: "สมหมาย ขยัน" }
];

function autoFillStudentName() {
    const studentIdInput = document.getElementById('studentId').value;
    const studentNameInput = document.getElementById('studentName');
    const student = students.find(student => student.id === studentIdInput);
    studentNameInput.value = student ? student.name : '';
}

function generateRecordId() {
    return `REC-${Date.now()}`;
}

function saveAttendanceRecord(studentId, studentName, signTime) {
    const today = new Date().toISOString().split('T')[0]; // วันที่ในรูปแบบ 'YYYY-MM-DD'
    const attendanceKey = `attendance_${today}`; // สร้าง key สำหรับการเข้าเรียนในวันนั้น

    // สร้างอ็อบเจกต์ใหม่สำหรับการเข้าเรียน
    const newRecord = {
        id: studentId,
        name: studentName,
        time: signTime
    };

    // ดึงข้อมูลเก่าจาก localStorage
    const existingRecords = JSON.parse(localStorage.getItem(attendanceKey)) || [];
    existingRecords.push(newRecord); // เพิ่มข้อมูลใหม่

    // บันทึกข้อมูลใหม่กลับลงใน localStorage
    localStorage.setItem(attendanceKey, JSON.stringify(existingRecords));
}


document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const signTime = new Date().toLocaleString('th-TH');
    saveAttendanceRecord(studentId, studentName, signTime);
    alert("บันทึกการเข้าเรียนสำเร็จ");
    document.getElementById('attendanceForm').reset();
});




function saveAttendanceRecord(studentId, studentName, signTime) {
    const today = new Date().toISOString().split('T')[0];
    const attendanceKey = `attendance_${today}`;
    const attendanceRecords = JSON.parse(localStorage.getItem(attendanceKey)) || [];

    attendanceRecords.push({
        id: studentId,
        name: studentName,
        time: signTime
    });

    localStorage.setItem(attendanceKey, JSON.stringify(attendanceRecords));
}

