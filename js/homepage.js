let isUpdate = false;
let employeePayrollObj = {};

let employeePayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
});
const getEmployeePayrollDataFromStorage = () => {
    console.log(localStorage.getItem("EmployeePayrollList"));
    return localStorage.getItem("EmployeePayrollList")?
                                JSON.parse(localStorage.getItem("EmployeePayrollList")): [];
}

const createInnerHtml = () => {
    if(employeePayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"
                        +"<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for(const employeePayrollData of employeePayrollList){
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePic}">
        </td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${stringifyDate(employeePayrollData._startDate)}</td>
        <td>
            <img id="${employeePayrollData._id}" onclick="remove(this)" alt="delete"
                src="../assets/icons/delete-black-18dp.svg">
            <img id="${employeePayrollData._id}"  onclick="update(this)" alt="edit"
                src="../assets/icons/create-black-18dp.svg">
        </td>
        </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {  _name: "Ashok Patel",
            _gender: "M",
            _department: [
                "Engineering",
                "Finance"
            ],
            _salary: "50000",
            _startDate: "29 Oct 2019",
            _note: '',
            _profilePic: "../assets/profile-images/Ellipse -1.png"
        },
        {
            _name: "Aman",
            _gender: "M",
            _department: [
                "Sales"
            ],
            _salary: "400000",
            _startDate: "29 Oct 2019",
            _note: '',
            _profilePic: "../assets/profile-images/Ellipse -3.png"
        }
    ];
     return employeePayrollListLocal;
}

const getDeptHtml = (deptList) =>{
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class = 'dept-label'>${dept}</div>`
    }
    return deptHtml;
}
const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._id = node.id);
    if(!employeePayrollData) 
        return;
    const index = employeePayrollList.map(empData=>empData._id)
                                .indexOf(employeePayrollData._id);
    employeePayrollList.splice(index,1);
    localStorage.setItem('EmployeePayrollList',JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
}
const update = (node) => {
    console.log("here");
    let employeePayrollData = employeePayrollList.find(empData => empData._id = node.id);
    if(!employeePayrollData) 
        return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}