// Biến toàn cục
let web3;
let contract;
let userAccount;

// Địa chỉ hợp đồng và ABI (cần thay thế bằng giá trị thực tế)
const contractAddress = "0x6134bcC4B434fFf0347e99193D4cFED69bD05CA7";
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "classId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "attendance",
        "type": "uint256"
      }
    ],
    "name": "AttendanceMarked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "classId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "teacherAddress",
        "type": "address"
      }
    ],
    "name": "ClassCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "classId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      }
    ],
    "name": "StudentAddedToClass",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      }
    ],
    "name": "StudentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "studentAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      }
    ],
    "name": "StudentRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "teacherAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      }
    ],
    "name": "TeacherAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "studentAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "classId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      }
    ],
    "name": "TeacherCodeApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "studentAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "classId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "code",
        "type": "string"
      }
    ],
    "name": "TeacherCodeSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "addressToStudentId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allClasses",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allStudents",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allTeachers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "classList",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "teacherAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "codeApprovals",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "roles",
    "outputs": [
      {
        "internalType": "enum AttendanceSheet.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "studentAttendance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "studentList",
    "outputs": [
      {
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "attendance",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "studentAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "studentTeacherCodes",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "teacherList",
    "outputs": [
      {
        "internalType": "string",
        "name": "firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lastName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_teacherAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      }
    ],
    "name": "addTeacher",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_firstName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_lastName",
        "type": "string"
      }
    ],
    "name": "createStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_teacherAddress",
        "type": "address"
      }
    ],
    "name": "createClass",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      }
    ],
    "name": "addStudentToClass",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      }
    ],
    "name": "markAttendance",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_code",
        "type": "string"
      }
    ],
    "name": "submitTeacherCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_studentAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      }
    ],
    "name": "approveTeacherCode",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      }
    ],
    "name": "registerAsStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_studentAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      }
    ],
    "name": "getTeacherCode",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getUserRole",
    "outputs": [
      {
        "internalType": "enum AttendanceSheet.Role",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_teacherAddress",
        "type": "address"
      }
    ],
    "name": "getTeacher",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      }
    ],
    "name": "getStudent",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      }
    ],
    "name": "getClassInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_studId",
        "type": "uint256"
      }
    ],
    "name": "getStudentAttendance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllTeachers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllStudents",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllClasses",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_teacherAddress",
        "type": "address"
      }
    ],
    "name": "getTeacherClasses",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_classId",
        "type": "uint256"
      }
    ],
    "name": "getClassStudents",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// Initialize Web3 and Contract
async function init() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Initialize Web3
      web3 = new Web3(window.ethereum);

      // Initialize contract
      contract = new web3.eth.Contract(contractABI, contractAddress);

      // Check contract deployment
      const code = await web3.eth.getCode(contractAddress);
      if (code === "0x" || code === "") {
        throw new Error("Contract not deployed at this address");
      }

      // Hide all panels initially
      document.getElementById("adminPanel").style.display = "none";
      document.getElementById("teacherPanel").style.display = "none";
      document.getElementById("studentPanel").style.display = "block";
      document.getElementById("lookupSection").style.display = "block";
      document.getElementById("registerSection").style.display = "none";
      document.getElementById("studentClassesSection").style.display = "none";

      // Show connect wallet button and hide disconnect button
      document.getElementById("connectWallet").style.display = "block";
      document.getElementById("disconnectWallet").style.display = "none";
      document.getElementById("userRole").textContent = "";
    } catch (error) {
      console.error("Initialization error:", error);
      alert("Error initializing application: " + error.message);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

// Connect Wallet
async function connectWallet() {
  try {
    // Initialize Web3 first
    web3 = new Web3(window.ethereum);

    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get user account
    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];

    // Initialize contract
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Update UI
    document.getElementById("connectWallet").style.display = "none";
    document.getElementById("disconnectWallet").style.display = "block";
    document.getElementById("userRole").textContent =
      "Connected: " + userAccount.slice(0, 6) + "..." + userAccount.slice(-4);

    // Check role
    await checkRole();
  } catch (error) {
    console.error("Error connecting wallet:", error);
    alert("Error connecting wallet: " + error.message);
  }
}

// Disconnect Wallet
async function disconnectWallet() {
  try {
    // Reset variables
    userAccount = null;
    web3 = null;
    contract = null;

    // Hide all panels
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("teacherPanel").style.display = "none";
    document.getElementById("studentPanel").style.display = "block";
    document.getElementById("lookupSection").style.display = "block";
    document.getElementById("registerSection").style.display = "none";
    document.getElementById("studentClassesSection").style.display = "none";

    // Reset UI
    document.getElementById("connectWallet").style.display = "block";
    document.getElementById("disconnectWallet").style.display = "none";
    document.getElementById("userRole").textContent = "";

    // Clear any existing data
    document.getElementById("teachersList").innerHTML = "";
    document.getElementById("studentsList").innerHTML = "";
    document.getElementById("classesList").innerHTML = "";
    document.getElementById("classStudentsList").innerHTML = "";
    document.getElementById("studentAttendanceInfo").innerHTML = "";
    document.getElementById("classInfoSection").style.display = "none";
    document.getElementById("pendingCodesList").innerHTML = "";
    document.getElementById("lookupResult").innerHTML = "";
    document.getElementById("studentClassesList").innerHTML = "";
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    alert("Error disconnecting wallet: " + error.message);
  }
}

// Check user role and show appropriate panel
async function checkRole() {
  try {
    if (!contract || !userAccount) {
      throw new Error("Contract or user account not initialized");
    }

    console.log("Checking role for account:", userAccount);
    const userRole = await contract.methods.getUserRole(userAccount).call();
    console.log("User role:", userRole);

    // Hide all panels first
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("teacherPanel").style.display = "none";
    document.getElementById("studentPanel").style.display = "block";
    document.getElementById("lookupSection").style.display = "none";

    // Show appropriate panel based on role
    switch (userRole) {
      case "0": // None
        document.getElementById("userRole").textContent = "No Role";
        document.getElementById("studentPanel").style.display = "block";
        document.getElementById("registerSection").style.display = "block";
        document.getElementById("studentClassesSection").style.display = "none";
        document.getElementById("studentAttendanceInfo").innerHTML = `
          <div class="card">
            <div class="card-body">
              <p>Please register as a student using your Student ID.</p>
            </div>
          </div>
        `;
        document.getElementById("classInfoSection").style.display = "none";
        break;
      case "1": // Admin
        document.getElementById("adminPanel").style.display = "block";
        document.getElementById("userRole").textContent = "Admin";
        document.getElementById("studentPanel").style.display = "none";
        await loadAdminData();
        break;
      case "2": // Teacher
        document.getElementById("teacherPanel").style.display = "block";
        document.getElementById("userRole").textContent = "Teacher";
        document.getElementById("studentPanel").style.display = "none";
        await loadTeacherData();
        await loadPendingCodes();
        break;
      case "3": // Student
        document.getElementById("userRole").textContent = "Student";
        document.getElementById("studentPanel").style.display = "block";
        document.getElementById("registerSection").style.display = "none";
        document.getElementById("studentClassesSection").style.display = "block";
        await loadStudentInfo();
        await loadStudentClasses();
        break;
      default:
        document.getElementById("userRole").textContent = "Unknown Role";
        document.getElementById("studentPanel").style.display = "block";
    }
  } catch (error) {
    console.error("Error checking role:", error);
    document.getElementById("userRole").textContent = "Error: " + error.message;
  }
}

// Tra cứu thông tin điểm danh khi chưa đăng nhập
async function lookupAttendance() {
  const studentId = document.getElementById("lookupStudentId").value;
  if (!studentId) {
    alert("Please enter a Student ID!");
    return;
  }

  try {
    if (!contract) {
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
    }

    const studentInfo = await contract.methods.getStudent(studentId).call();
    const firstName = studentInfo[0];
    const lastName = studentInfo[1];
    const age = studentInfo[2];
    const attendance = studentInfo[3];
    const classIds = studentInfo[4];

    let classDetails = "";
    for (let i = 0; i < classIds.length; i++) {
      const classId = classIds[i];
      const attendanceValue = await contract.methods.getStudentAttendance(classId, studentId).call();
      const classInfo = await contract.methods.getClassInfo(classId).call();
      const className = classInfo[0];
      classDetails += `<p>Class: ${className} (ID: ${classId}), Attendance: ${attendanceValue}</p>`;
    }

    document.getElementById("lookupResult").innerHTML = `
      <div class="card">
        <div class="card-body">
          <h6>Student Information</h6>
          <p>Student ID: ${studentId}</p>
          <p>Name: ${firstName} ${lastName}</p>
          <p>Age: ${age}</p>
          <p>Total Attendance: ${attendance}</p>
          <h6>Classes:</h6>
          ${classDetails || "No classes enrolled."}
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error looking up attendance:", error);
    document.getElementById("lookupResult").innerHTML = `
      <div class="alert alert-danger">
        Error: ${error.message}
      </div>
    `;
  }
}

// Đăng ký vai trò Student
async function registerStudent() {
  const studentId = document.getElementById("registerStudentId").value;
  if (!userAccount) {
    alert("Please connect your wallet first!");
    return;
  }
  if (!studentId) {
    alert("Please enter your Student ID!");
    return;
  }

  try {
    // Kiểm tra xem Student ID có tồn tại không
    const studentInfo = await contract.methods.getStudent(studentId).call();
    if (studentInfo[2] == 0) { // Kiểm tra age
      throw new Error("Student ID does not exist");
    }

    // Kiểm tra xem địa chỉ ví đã có vai trò chưa
    const userRole = await contract.methods.getUserRole(userAccount).call();
    if (userRole != "0") {
      throw new Error("This wallet address already has a role");
    }

    // Kiểm tra xem Student ID đã được liên kết với địa chỉ ví nào chưa
    const existingAddress = studentInfo[5]; // studentAddress
    if (existingAddress != "0x0000000000000000000000000000000000000000") {
      throw new Error("This Student ID is already linked to another wallet address");
    }

    // Gọi hàm registerAsStudent để gán vai trò Student
    await contract.methods
      .registerAsStudent(studentId)
      .send({ from: userAccount });
    alert("Registered successfully! You are now a student.");
    await checkRole();
  } catch (error) {
    console.error("Error registering student:", error);
    alert("Failed to register: " + error.message);
  }
}

// Admin Functions
async function loadAdminData() {
  try {
    if (!contract || !userAccount) {
      throw new Error("Contract or user account not initialized");
    }

    const userRole = await contract.methods.getUserRole(userAccount).call();
    if (userRole !== "1") {
      throw new Error("You don't have permission to view this data");
    }

    await loadTeachers();
    await loadStudents();
    await loadClasses();
  } catch (error) {
    console.error("Error loading admin data:", error);
    const adminPanel = document.getElementById("adminPanel");
    adminPanel.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
}

async function addTeacher() {
  const address = document.getElementById("teacherAddress").value;
  const firstName = document.getElementById("teacherFirstName").value;
  const lastName = document.getElementById("teacherLastName").value;

  try {
    await contract.methods
      .addTeacher(address, firstName, lastName)
      .send({ from: userAccount });
    alert("Teacher added successfully!");
    document.getElementById("teacherAddress").value = "";
    document.getElementById("teacherFirstName").value = "";
    document.getElementById("teacherLastName").value = "";
    loadTeachers();
  } catch (error) {
    console.error("Error adding teacher:", error);
    alert("Error adding teacher");
  }
}

async function addStudent() {
  const id = document.getElementById("studentId").value;
  const age = document.getElementById("studentAge").value;
  const firstName = document.getElementById("studentFirstName").value;
  const lastName = document.getElementById("studentLastName").value;

  try {
    await contract.methods
      .createStudent(id, age, firstName, lastName)
      .send({ from: userAccount });
    alert("Student added successfully!");
    document.getElementById("studentId").value = "";
    document.getElementById("studentAge").value = "";
    document.getElementById("studentFirstName").value = "";
    document.getElementById("studentLastName").value = "";
    loadStudents();
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Error adding student");
  }
}

async function addClass() {
  const id = document.getElementById("classId").value;
  const name = document.getElementById("className").value;
  const teacherAddress = document.getElementById("teacherSelect").value;

  try {
    await contract.methods
      .createClass(id, name, teacherAddress)
      .send({ from: userAccount });
    alert("Class added successfully!");
    document.getElementById("classId").value = "";
    document.getElementById("className").value = "";
    document.getElementById("teacherSelect").value = "";
    loadClasses();
  } catch (error) {
    console.error("Error adding class:", error);
    alert("Error adding class");
  }
}

async function addStudentToClass() {
  const classId = document.getElementById("classSelect").value;
  const studentId = document.getElementById("studentSelect").value;

  try {
    await contract.methods
      .addStudentToClass(classId, studentId)
      .send({ from: userAccount });
    alert("Student added to class successfully!");
    document.getElementById("classSelect").value = "";
    document.getElementById("studentSelect").value = "";
    loadClasses();
  } catch (error) {
    console.error("Error adding student to class:", error);
    alert("Error adding student to class");
  }
}

// Teacher Functions
async function loadTeacherData() {
  try {
    const classes = await contract.methods
      .getTeacherClasses(userAccount)
      .call();
    const select = document.getElementById("teacherClassSelect");
    select.innerHTML = '<option value="">Select Class</option>';

    for (const classId of classes) {
      const classInfo = await contract.methods.getClassInfo(classId).call();
      const name = classInfo[0];
      select.innerHTML += `<option value="${classId}">${name}</option>`;
    }
  } catch (error) {
    console.error("Error loading teacher data:", error);
  }
}

async function loadPendingCodes() {
  try {
    const list = document.getElementById("pendingCodesList");
    list.innerHTML = `
      <h6>Pending Teacher Codes</h6>
      <div class="row header">
        <div class="col">Student Address</div>
        <div class="col">Student ID</div>
        <div class="col">First Name</div>
        <div class="col">Last Name</div>
        <div class="col">Class ID</div>
        <div class="col">Teacher Code</div>
        <div class="col">Action</div>
      </div>
    `;

    const allStudents = await contract.methods.getAllStudents().call();
    for (const studentId of allStudents) {
      const studentInfo = await contract.methods.getStudent(studentId).call();
      const studentAddress = studentInfo[5]; // studentAddress
      if (studentAddress !== "0x0000000000000000000000000000000000000000") {
        const studentClasses = studentInfo[4]; // classIds
        for (const classId of studentClasses) {
          const codeInfo = await contract.methods.getTeacherCode(studentAddress, classId).call();
          const teacherCode = codeInfo[0];
          const isApproved = codeInfo[1];
          if (teacherCode && !isApproved) {
            // Lấy thông tin sinh viên
            const studentDetails = await contract.methods.getStudent(studentId).call();
            const firstName = studentDetails[0];
            const lastName = studentDetails[1];

            list.innerHTML += `
              <div class="row">
                <div class="col">${studentAddress.slice(0, 6)}...${studentAddress.slice(-4)}</div>
                <div class="col">${studentId}</div>
                <div class="col">${firstName}</div>
                <div class="col">${lastName}</div>
                <div class="col">${classId}</div>
                <div class="col">${teacherCode}</div>
                <div class="col">
                  <button class="btn btn-sm btn-success" onclick="approveTeacherCode('${studentAddress}', ${classId})">Approve</button>
                </div>
              </div>
            `;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error loading pending codes:", error);
    document.getElementById("pendingCodesList").innerHTML = `<p>Error loading pending codes.</p>`;
  }
}

async function approveTeacherCode(studentAddress, classId) {
  try {
    const studentId = await contract.methods.addressToStudentId(studentAddress).call();
    await contract.methods
      .approveTeacherCode(studentAddress, classId, studentId)
      .send({ from: userAccount });
    alert("Teacher code approved successfully!");
    await loadPendingCodes();
  } catch (error) {
    console.error("Error approving teacher code:", error);
    alert("Failed to approve teacher code: " + error.message);
  }
}

async function loadClassStudents() {
  const classId = document.getElementById("teacherClassSelect").value;
  if (!classId) return;

  try {
    const studentIds = await contract.methods.getClassStudents(classId).call();
    const list = document.getElementById("classStudentsList");
    list.innerHTML = `
      <h6>Class Students</h6>
      <div class="row header">
        <div class="col">ID</div>
        <div class="col">Name</div>
        <div class="col">Age</div>
        <div class="col">Attendance Status</div>
        <div class="col">Action</div>
      </div>
    `;

    for (const studentId of studentIds) {
      const studentInfo = await contract.methods.getStudent(studentId).call();
      const firstName = studentInfo[0];
      const lastName = studentInfo[1];
      const age = studentInfo[2];
      const attendanceValue = await contract.methods.getStudentAttendance(classId, studentId).call();

      list.innerHTML += `
        <div class="row">
          <div class="col">${studentId}</div>
          <div class="col">${firstName} ${lastName}</div>
          <div class="col">${age}</div>
          <div class="col">${attendanceValue > 0 ? "Marked" : "Not Marked"}</div>
          <div class="col">
            ${attendanceValue > 0 ? "" : `<button class="btn btn-sm btn-success" onclick="markAttendance('${classId}', '${studentId}')">Mark Attendance</button>`}
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error loading class students:", error);
  }
}

async function markAttendance(classId, studentId) {
  try {
    await contract.methods
      .markAttendance(classId, studentId)
      .send({ from: userAccount });
    alert("Attendance marked successfully!");
    loadClassStudents();
  } catch (error) {
    console.error("Error marking attendance:", error);
    alert("Error marking attendance");
  }
}

// Student Functions
async function loadStudentInfo() {
  try {
    if (!contract) {
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
    }

    // Lấy ID sinh viên từ địa chỉ ví
    const studentId = await contract.methods.addressToStudentId(userAccount).call();
    if (studentId == 0) {
      document.getElementById("studentAttendanceInfo").innerHTML = `
        <div class="card">
          <div class="card-body">
            <p>Your wallet address is not linked to any student ID. Please register as a student.</p>
          </div>
        </div>
      `;
      document.getElementById("registerSection").style.display = "block";
      document.getElementById("studentClassesSection").style.display = "none";
      return;
    }

    // Lấy thông tin sinh viên
    const studentInfo = await contract.methods.getStudent(studentId).call();
    const firstName = studentInfo[0];
    const lastName = studentInfo[1];
    const age = studentInfo[2];
    const attendance = studentInfo[3];
    const classIds = studentInfo[4];

    let classDetails = "";
    for (let i = 0; i < classIds?.length; i++) {
      const classId = classIds[i];
      const attendanceValue = await contract.methods.getStudentAttendance(classId, studentId).call();
      classDetails += `<p>Class ID: ${classId}, Attendance: ${attendanceValue}</p>`;
    }

    const info = document.getElementById("studentAttendanceInfo");
    info.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h6>Student Information</h6>
          <p>Student ID: ${studentId}</p>
          <p>Name: ${firstName} ${lastName}</p>
          <p>Age: ${age}</p>
          <p>Total Attendance: ${attendance}</p>
          <h6>Classes:</h6>
          ${classDetails}
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading student info:", error);
    alert("Error loading student info: " + error.message);
  }
}

async function loadStudentClasses() {
  try {
    const studentId = await contract.methods.addressToStudentId(userAccount).call();
    const studentInfo = await contract.methods.getStudent(studentId).call();
    const classIds = studentInfo[4]; // Mảng classIds từ getStudent

    const list = document.getElementById("studentClassesList");
    list.innerHTML = `
      <div class="row header">
        <div class="col">Class ID</div>
        <div class="col">Class Name</div>
        <div class="col">Teacher</div>
        <div class="col">Action</div>
      </div>
    `;

    if (classIds.length === 0) {
      list.innerHTML += `<p>You are not enrolled in any class!</p>`;
      return;
    }

    for (const classId of classIds) {
      const classInfo = await contract.methods.getClassInfo(classId).call();
      const className = classInfo[0];
      const teacherAddress = classInfo[1];
      const teacherInfo = await contract.methods.getTeacher(teacherAddress).call();
      const teacherName = `${teacherInfo[0]} ${teacherInfo[1]}`;

      const codeInfo = await contract.methods.getTeacherCode(userAccount, classId).call();
      const teacherCode = codeInfo[0];
      const isApproved = codeInfo[1];

      list.innerHTML += `
        <div class="row">
          <div class="col">${classId}</div>
          <div class="col">${className}</div>
          <div class="col">${teacherName}</div>
          <div class="col">
            ${
              teacherCode
                ? isApproved
                  ? "Approved"
                  : "Pending Approval"
                : `
                  <input type="text" id="teacherCode_${classId}" placeholder="Enter Code">
                  <button class="btn btn-sm btn-primary" onclick="submitTeacherCode(${classId})">Submit Code</button>
                `
            }
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error loading student classes:", error);
    document.getElementById("studentClassesList").innerHTML = `<p>Error loading classes.</p>`;
  }
}

async function submitTeacherCode(classId) {
  const teacherCode = document.getElementById(`teacherCode_${classId}`).value;
  if (!teacherCode) {
    alert("Please enter a teacher code!");
    return;
  }

  try {
    await contract.methods
      .submitTeacherCode(classId, teacherCode)
      .send({ from: userAccount });
    alert("Teacher code submitted successfully! Waiting for teacher approval.");
    await loadStudentClasses();
  } catch (error) {
    console.error("Error submitting teacher code:", error);
    alert("Failed to submit teacher code: " + error.message);
  }
}

// Helper Functions
async function loadTeachers() {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }

    const userRole = await contract.methods.getUserRole(userAccount).call();
    if (userRole !== "1") {
      throw new Error("You don't have permission to view teachers list");
    }

    const teacherAddresses = await contract.methods.getAllTeachers().call();
    const teacherSelect = document.getElementById("teacherSelect");
    teacherSelect.innerHTML = '<option value="">Select a teacher</option>';

    if (teacherAddresses.length === 0) {
      teacherSelect.innerHTML +=
        '<option value="" disabled>No teachers available</option>';
      return;
    }

    for (const address of teacherAddresses) {
      try {
        const teacherInfo = await contract.methods.getTeacher(address).call();
        const fName = teacherInfo[0];
        const lName = teacherInfo[1];
        const option = document.createElement("option");
        option.value = address;
        option.textContent = `${fName} ${lName}`;
        teacherSelect.appendChild(option);
      } catch (error) {
        console.error(`Error loading teacher ${address}:`, error);
        const option = document.createElement("option");
        option.value = address;
        option.textContent = `Unknown Teacher (${address.slice(0, 6)}...)`;
        teacherSelect.appendChild(option);
      }
    }
  } catch (error) {
    console.error("Error loading teachers:", error);
    const teacherSelect = document.getElementById("teacherSelect");
    teacherSelect.innerHTML =
      '<option value="" disabled>Error loading teachers</option>';
  }
}

async function loadStudents() {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }

    const students = await contract.methods.getAllStudents().call();
    const list = document.getElementById("studentsList");
    const studentSelect = document.getElementById("studentSelect");

    if (students.length === 0) {
      list.innerHTML = "<p>No students available</p>";
      studentSelect.innerHTML = '<option value="">No students available</option>';
      return;
    }

    list.innerHTML = `
      <h6>All Students</h6>
      <div class="row header">
        <div class="col">ID</div>
        <div class="col">Name</div>
        <div class="col">Age</div>
        <div class="col">Attendance</div>
      </div>
    `;

    studentSelect.innerHTML = '<option value="">Select a student</option>';

    for (const studentId of students) {
      try {
        const studentInfo = await contract.methods.getStudent(studentId).call();
        const firstName = studentInfo[0];
        const lastName = studentInfo[1];
        const age = studentInfo[2];
        const attendance = studentInfo[3];

        list.innerHTML += `
          <div class="row">
            <div class="col">${studentId}</div>
            <div class="col">${firstName} ${lastName}</div>
            <div class="col">${age}</div>
            <div class="col">${attendance}</div>
          </div>
        `;

        studentSelect.innerHTML += `<option value="${studentId}">${firstName} ${lastName}</option>`;
      } catch (error) {
        console.error(`Error loading student ${studentId}:`, error);
        list.innerHTML += `
          <div class="row">
            <div class="col">${studentId}</div>
            <div class="col" colspan="3">Error loading student details</div>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Error loading students:", error);
    const list = document.getElementById("studentsList");
    list.innerHTML = "<p>Error loading students. Please try again.</p>";
  }
}

async function loadClasses() {
  try {
    if (!contract) {
      throw new Error("Contract not initialized");
    }

    const userRole = await contract.methods.getUserRole(userAccount).call();
    if (userRole !== "1") {
      throw new Error("You don't have permission to view classes list");
    }

    const classes = await contract.methods.getAllClasses().call();
    const list = document.getElementById("classesList");
    const classSelect = document.getElementById("classSelect");

    if (classes.length === 0) {
      list.innerHTML = "<p>No classes available</p>";
      classSelect.innerHTML = '<option value="">No classes available</option>';
      return;
    }

    list.innerHTML = `
      <h6>All Classes</h6>
      <div class="row header">
        <div class="col">ID</div>
        <div class="col">Name</div>
        <div class="col">Teacher</div>
        <div class="col col-3">Students</div>
      </div>
    `;

    classSelect.innerHTML = '<option value="">Select a class</option>';

    for (const classId of classes) {
      try {
        const classInfo = await contract.methods.getClassInfo(classId).call();
        const name = classInfo[0];
        const teacherAddress = classInfo[1];
        const studentIds = classInfo[2];

        let teacherName = "Unknown";
        try {
          const teacherInfo = await contract.methods.getTeacher(teacherAddress).call();
          const fName = teacherInfo[0];
          const lName = teacherInfo[1];
          teacherName = `${fName} ${lName}`;
        } catch (error) {
          console.error(`Error getting teacher info for ${teacherAddress}:`, error);
          teacherName = `Unknown Teacher (${teacherAddress.slice(0, 6)}...)`;
        }

        let studentList = "";
        if (studentIds && studentIds.length > 0) {
          for (const studentId of studentIds) {
            try {
              const studentInfo = await contract.methods.getStudent(studentId).call();
              const firstName = studentInfo[0];
              const lastName = studentInfo[1];
              const attendanceValue = await contract.methods.getStudentAttendance(classId, studentId).call();
              studentList += `<div>${firstName} ${lastName} - ${attendanceValue > 0 ? "Marked" : "Not Marked"}</div>`;
            } catch (error) {
              console.error(`Error getting student info for ${studentId}:`, error);
              studentList += `<div>Unknown Student (${studentId})</div>`;
            }
          }
        } else {
          studentList = "No students";
        }

        list.innerHTML += `
          <div class="row">
            <div class="col">${classId}</div>
            <div class="col">${name}</div>
            <div class="col">${teacherName}</div>
            <div class="col col-3">
              <div class="student-list">
                ${studentList}
              </div>
            </div>
          </div>
        `;

        classSelect.innerHTML += `<option value="${classId}">${name}</option>`;
      } catch (error) {
        console.error(`Error loading class ${classId}:`, error);
        list.innerHTML += `
          <div class="row">
            <div class="col">${classId}</div>
            <div class="col" colspan="3">Error loading class details</div>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Error loading classes:", error);
    const list = document.getElementById("classesList");
    list.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
}

// Initialize when the page loads
window.addEventListener("load", init);