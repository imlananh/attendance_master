// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttendanceSheet {
    enum Role { None, Admin, Teacher, Student }
    
    struct Teacher {
        string firstName;
        string lastName;
    }
    
    struct Student {
        string firstName;
        string lastName;
        uint256 age;
        uint256 attendance;
        uint256[] classIds;
        address studentAddress;
    }
    
    struct Class {
        string name;
        address teacherAddress;
        uint256[] studentIds;
    }
    
    mapping(address => Role) public roles;
    mapping(address => uint256) public addressToStudentId;
    mapping(uint256 => Student) public studentList;
    mapping(address => Teacher) public teacherList;
    mapping(uint256 => Class) public classList;
    mapping(uint256 => mapping(uint256 => uint256)) public studentAttendance; // classId => studentId => attendance
    
    // Lưu mã code theo (studentAddress, classId)
    mapping(address => mapping(uint256 => string)) public studentTeacherCodes; // studentAddress => classId => code
    mapping(address => mapping(uint256 => bool)) public codeApprovals; // studentAddress => classId => approved
    
    address[] public allTeachers;
    uint256[] public allStudents;
    uint256[] public allClasses;
    
    address public admin;
    
    event TeacherAdded(address teacherAddress, string firstName, string lastName);
    event StudentCreated(uint256 studentId, string firstName, string lastName, uint256 age);
    event ClassCreated(uint256 classId, string name, address teacherAddress);
    event StudentAddedToClass(uint256 classId, uint256 studentId);
    event AttendanceMarked(uint256 classId, uint256 studentId, uint256 attendance);
    event TeacherCodeSubmitted(address studentAddress, uint256 classId, string code);
    event TeacherCodeApproved(address studentAddress, uint256 classId, uint256 studentId);
    event StudentRegistered(address studentAddress, uint256 studentId);
    
    constructor() {
        admin = msg.sender;
        roles[admin] = Role.Admin;
    }
    
    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyTeacher() {
        require(roles[msg.sender] == Role.Teacher, "Only teacher can call this function");
        _;
    }
    
    modifier onlyStudent() {
        require(roles[msg.sender] == Role.Student, "Only student can call this function");
        _;
    }
    
    function addTeacher(address _teacherAddress, string memory _firstName, string memory _lastName) public onlyAdmin {
        require(roles[_teacherAddress] == Role.None, "Address already has a role");
        teacherList[_teacherAddress] = Teacher(_firstName, _lastName);
        roles[_teacherAddress] = Role.Teacher;
        allTeachers.push(_teacherAddress);
        emit TeacherAdded(_teacherAddress, _firstName, _lastName);
    }
    
    function createStudent(uint256 _studId, uint256 _age, string memory _firstName, string memory _lastName) public onlyAdmin {
        require(studentList[_studId].age == 0, "Student ID already exists");
        studentList[_studId] = Student(_firstName, _lastName, _age, 0, new uint256[](0), address(0));
        allStudents.push(_studId);
        emit StudentCreated(_studId, _firstName, _lastName, _age);
    }
    
    function createClass(uint256 _classId, string memory _name, address _teacherAddress) public onlyAdmin {
        require(classList[_classId].teacherAddress == address(0), "Class ID already exists");
        require(roles[_teacherAddress] == Role.Teacher, "Teacher address does not have teacher role");
        classList[_classId] = Class(_name, _teacherAddress, new uint256[](0));
        allClasses.push(_classId);
        emit ClassCreated(_classId, _name, _teacherAddress);
    }
    
    function addStudentToClass(uint256 _classId, uint256 _studId) public onlyAdmin {
        require(classList[_classId].teacherAddress != address(0), "Class does not exist");
        require(studentList[_studId].age != 0, "Student does not exist");
        classList[_classId].studentIds.push(_studId);
        studentList[_studId].classIds.push(_classId);
        emit StudentAddedToClass(_classId, _studId);
    }
    
    function markAttendance(uint256 _classId, uint256 _studId) public onlyTeacher {
        require(classList[_classId].teacherAddress == msg.sender, "You are not the teacher of this class");
        require(studentList[_studId].age != 0, "Student does not exist");
        studentAttendance[_classId][_studId]++;
        studentList[_studId].attendance++;
        emit AttendanceMarked(_classId, _studId, studentAttendance[_classId][_studId]);
    }
    
    // Sinh viên gửi mã code cho một lớp cụ thể
    function submitTeacherCode(uint256 _classId, string memory _code) public onlyStudent {
        require(classList[_classId].teacherAddress != address(0), "Class does not exist");
        require(bytes(studentTeacherCodes[msg.sender][_classId]).length == 0, "Code already submitted for this class");
        
        studentTeacherCodes[msg.sender][_classId] = _code;
        codeApprovals[msg.sender][_classId] = false;
        emit TeacherCodeSubmitted(msg.sender, _classId, _code);
    }
    
    // Giáo viên phê duyệt mã code cho một lớp cụ thể
    function approveTeacherCode(address _studentAddress, uint256 _classId, uint256 _studId) public onlyTeacher {
        require(classList[_classId].teacherAddress == msg.sender, "You are not the teacher of this class");
        require(studentList[_studId].age != 0, "Student does not exist");
        require(bytes(studentTeacherCodes[_studentAddress][_classId]).length > 0, "No code submitted");
        require(!codeApprovals[_studentAddress][_classId], "Code already approved");
        
        codeApprovals[_studentAddress][_classId] = true;
        emit TeacherCodeApproved(_studentAddress, _classId, _studId);
    }
    
    // Sinh viên tự đăng ký vai trò Student
    function registerAsStudent(uint256 _studId) public {
        require(roles[msg.sender] == Role.None, "Address already has a role");
        require(studentList[_studId].age != 0, "Student does not exist");
        require(studentList[_studId].studentAddress == address(0), "Student ID already linked to another address");
        require(addressToStudentId[msg.sender] == 0, "Address already linked to a student");

        roles[msg.sender] = Role.Student;
        addressToStudentId[msg.sender] = _studId;
        studentList[_studId].studentAddress = msg.sender;
        emit StudentRegistered(msg.sender, _studId);
    }
    
    // Lấy thông tin mã code
    function getTeacherCode(address _studentAddress, uint256 _classId) public view returns (string memory, bool) {
        return (studentTeacherCodes[_studentAddress][_classId], codeApprovals[_studentAddress][_classId]);
    }
    
    function getUserRole(address _user) public view returns (Role) {
        return roles[_user];
    }
    
    function getTeacher(address _teacherAddress) public view returns (string memory, string memory) {
        require(roles[_teacherAddress] == Role.Teacher, "Not a teacher");
        Teacher memory teacher = teacherList[_teacherAddress];
        return (teacher.firstName, teacher.lastName);
    }
    
    function getStudent(uint256 _studId) public view returns (string memory, string memory, uint256, uint256, uint256[] memory, address) {
        require(studentList[_studId].age != 0, "Student does not exist");
        Student memory student = studentList[_studId];
        return (student.firstName, student.lastName, student.age, student.attendance, student.classIds, student.studentAddress);
    }
    
    function getClassInfo(uint256 _classId) public view returns (string memory, address, uint256[] memory) {
        require(classList[_classId].teacherAddress != address(0), "Class does not exist");
        Class memory classInfo = classList[_classId];
        return (classInfo.name, classInfo.teacherAddress, classInfo.studentIds);
    }
    
    function getStudentAttendance(uint256 _classId, uint256 _studId) public view returns (uint256) {
        return studentAttendance[_classId][_studId];
    }
    
    function getAllTeachers() public view returns (address[] memory) {
        return allTeachers;
    }
    
    function getAllStudents() public view returns (uint256[] memory) {
        return allStudents;
    }
    
    function getAllClasses() public view returns (uint256[] memory) {
        return allClasses;
    }
    
    function getTeacherClasses(address _teacherAddress) public view returns (uint256[] memory) {
        require(roles[_teacherAddress] == Role.Teacher, "Not a teacher");
        uint256[] memory teacherClasses = new uint256[](allClasses.length);
        uint256 count = 0;
        for (uint256 i = 0; i < allClasses.length; i++) {
            if (classList[allClasses[i]].teacherAddress == _teacherAddress) {
                teacherClasses[count] = allClasses[i];
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = teacherClasses[i];
        }
        return result;
    }
    
    function getClassStudents(uint256 _classId) public view returns (uint256[] memory) {
        require(classList[_classId].teacherAddress != address(0), "Class does not exist");
        return classList[_classId].studentIds;
    }
}