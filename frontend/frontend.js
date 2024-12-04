import axios from "axios";
import {
  StudentDetail3CSE,
  StudentDetail3Ex,
  StudentDetail3IT,
  SemesterAndBranchData,
} from "./studentData.js";
const thirdYearData = [
  StudentDetail3CSE,
  StudentDetail3CSE,
  StudentDetail3IT,
  StudentDetail3Ex,
]
// console.log(thirdYearData[0]);
const getStart = document.getElementById("getStart");
const discardBtn = document.getElementById("discardBtn");
const inputRol = document.getElementById("rollNumberInput");
const btnToAdd = document.getElementById("btnToAdd");
const submitBtn = document.getElementById("submitBtn");
const findBtn = document.getElementById("searchBtn");
const mainContainer = document.getElementById("name-container");
var presentStudent = Array();
var currentDetails = null;

async function addInputOption(parentDiv, subjectArray,semCode,) {
  console.log(subjectArray);
  for (let i = 0; i <subjectArray.length; i++) {
    const optionTag = document.createElement("option");
    optionTag.value = semCode+"0" +(i+1);
    optionTag.textContent = subjectArray[i];
    parentDiv.appendChild(optionTag);
    console.log(optionTag);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay
  }
  return;
};
const inputBranch = document.getElementById("inputBranch");
inputBranch.addEventListener("change", async () => {
  const { inputSem, inputBranch, inputSubName } = await giveElement();
  if(!inputSem.value){
    showAlert("First Select a Semester")
  }
  // const { semCode, branchCode,} = await getInputsData();
  await removeDivContent(inputSubName);
  console.log(" function run on branch change");
  console.log(inputSem.value + inputBranch.value);
  const subjectArray = SemesterAndBranchData[inputSem.value + "" + inputBranch.value];
  console.log(subjectArray);
  const firstOption = document.createElement('option');
  firstOption.textContent = "Select Subject";
  firstOption.setAttribute.disabled = true;
  firstOption.setAttribute.selected = true;
  inputSubName.appendChild(firstOption);
  await addInputOption(inputSubName, subjectArray,inputSem.value);
});

async function giveElement() {
  const inputSem = document.getElementById("inputSem");
  const inputBranch = document.getElementById("inputBranch");
  const inputSubName = document.getElementById("inputSubName");
  const lactureNo = document.getElementById("lactureNo");
  return { inputSem, inputBranch, inputSubName, lactureNo };
}

async function getToday() {
  const dateCode = new Promise((resole) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const dateCode = parseInt(
      `${year}${month < 10 ? "0" + month : month + 1}${
        date < 10 ? "0" + date : date
      }`,
      10
    );
    document.getElementById("classCode").value = dateCode;
    return dateCode;
  });
}
getToday();

function disableInputsField() {
  console.log("input are disabled");
  document.getElementById("inputSem").disabled = "true";
  document.getElementById("inputBranch").disabled = "true";
  document.getElementById("inputSubName").disabled = "true";
  document.getElementById("lactureNo").disabled = "true";
}
async function enableInputsField() {
  console.log("input are enabled");
  const { inputSem, inputBranch, inputSubName, lactureNo } =
    await giveElement();
  inputSem.removeAttribute("disabled");
  inputBranch.removeAttribute("disabled");
  inputSubName.removeAttribute("disabled");
  lactureNo.removeAttribute("disabled");
}
function disableAddSAndSubmit() {
  document.getElementById("submitBtn").disabled = "true";
  document.getElementById("btnToAdd").disabled = "true";
}
function enableNewSAndSubmit() {
  submitBtn.removeAttribute("disabled");
  btnToAdd.removeAttribute("disabled");
}
async function getInputsData() {
  const semCode = document.getElementById("inputSem").value;
  const branchCode = document.getElementById("inputBranch").value;
  const subCode = document.getElementById("inputSubName").value;
  const lectureNumber = document.getElementById("lactureNo").value;
  // console.log(semCode+","+branchCode+","+subCode+","+lectureNumber);
  return { semCode, branchCode, subCode, lectureNumber };
}
async function getInputsTextValue() {
  console.log("getInputsTextValue fun run");

  const inputSem = document.getElementById("inputSem");
  const Semester = inputSem.options[inputSem.selectedIndex].text;
  const inputBranch = document.getElementById("inputBranch");
  const branchName = inputBranch.options[inputBranch.selectedIndex].text;
  const inputSubName = document.getElementById("inputSubName");
  const subName = inputSubName.options[inputSubName.selectedIndex].text;
  console.log(Semester + "," + subName + "," + branchName);
  return new Promise((resolve) => {
    resolve({ Semester, branchName, subName });
  });
}
function showAlert(msg) {
  btnToAdd.setAttribute("disable", "true");
  const alertBox = document.createElement("div");
  alertBox.textContent = msg;
  alertBox.setAttribute("class", "alertBox");
  document.body.insertBefore(alertBox, document.body.firstChild);
  setTimeout(() => {
    btnToAdd.setAttribute("disable", "false");
    alertBox.remove();
  }, 2000);
}
async function showPopUp(msg) {
  const popmodule = document.getElementById("popmodule");
  popmodule.style.display = "flex";
  const msgP = document.getElementById("popupMSG");
  msgP.textContent = msg;
  const okBtnPopup = document.getElementById("okBtnPopup");
  const cancleBtnPopup = document.getElementById("cancleBtnPopup");
  return new Promise((resolve) => {
    okBtnPopup.addEventListener("click", () => {
      popmodule.style.display = "none";
      resolve(true);
    });
    cancleBtnPopup.addEventListener("click", () => {
      popmodule.style.display = "none";
      resolve(false);
    });
  });
}
async function prepareStudentData(semCode, branchCode) {
  if (semCode == 3) {
    if (branchCode == 1) {
      console.log("sem 1 branch cse a data fetched");
      currentDetails = StudentDetail3CSE;
    } else if (branchCode == 2) {
      currentDetails = StudentDetail3CSE;
    } else if (branchCode == 3) {
      currentDetails = StudentDetail3IT;
    } else if (branchCode == 4) {
      // currentDetails = StudentDetail3AIDS;
      currentDetails = StudentDetail3IT;
    } else if (branchCode == 5) {
      currentDetails = StudentDetail3Ex;
    } else if (branchCode == 6) {
      // currentDetails = StudentDetail3ME;
      currentDetails = StudentDetail3IT;
    } else if (branchCode == 7) {
      // currentDetails = StudentDetail3CE;
      currentDetails = StudentDetail3IT;
    }
  } else if (semCode == 2) {
    if (branchCode == 1) {
      currentDetails = StudentDetailOneCSE;
    } else if (branchCode == 2) {
      currentDetails = StudentDetailOneCSE;
    } else if (branchCode == 3) {
      currentDetails = StudentDetailOneIT;
    } else if (branchCode == 4) {
      currentDetails = StudentDetailOneAIDS;
    } else if (branchCode == 5) {
      currentDetails = StudentDetailOneEC;
    } else if (branchCode == 6) {
      currentDetails = StudentDetailOneME;
    } else if (branchCode == 7) {
      currentDetails = StudentDetailOneCE;
    }
  }
  enableNewSAndSubmit();
  discardBtn.removeAttribute("disabled");
}
async function showStatusOfClass(msg) {
  const classStatusPTag = await new Promise((resole) => {
    const classStatusPTag = document.getElementById("classStatusPTag");
    resole(classStatusPTag);
  });
  classStatusPTag.textContent = msg;
  return;
}
function removeStatusOfClass() {
  const classStatusPTag = document.getElementById("classStatusPTag");
  classStatusPTag.textContent = "";
}
const hideStudent = document.getElementById("hideStudent");
const divForlectureAttendance = document.getElementById("divForlectureAttendance");
const divForlectureDeatails = document.getElementById("divForlectureDeatails");
hideStudent.addEventListener("click", () =>{
  removeDivContent(divForlectureDeatails)
  removeDivContent(divForlectureAttendance)

});

async function removeDivContent(parentDiv) {
  await removeAllChildren(parentDiv);
  console.log("removeDivContent run");
}
async function removeAllChildren(parentDiv) {
  while (parentDiv.firstChild) {
    console.log("removeAllChildren run");
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate delay
    parentDiv.removeChild(parentDiv.firstChild);
  }
}
async function addDivContent(parentDiv, attendance) {
  console.log("addDivContent run");
  await insertNewChild(parentDiv, attendance);
}
async function insertNewChild(parentDiv, attendance) {
  console.log("insertNewChild run");
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
  for (let rollN of attendance) {
    const student = currentDetails[rollN];
    const newName = document.createElement("p");
    newName.textContent = student.name;
    newName.setAttribute("class", "nameTag");
    const newBranch = document.createElement("p");
    newBranch.textContent = student.Branch;
    newBranch.setAttribute("class", "branchTag");
    const newRollN = document.createElement("p");
    newRollN.textContent = student.roll_number;
    newRollN.setAttribute("class", "rollNTag");
    const newdiv = document.createElement("div");
    newdiv.setAttribute("class", "studentDiv");
    newdiv.appendChild(newName);
    newdiv.appendChild(newBranch);
    newdiv.appendChild(newRollN);
    parentDiv.appendChild(newdiv);
  }
}
findBtn.addEventListener("click", async () => {
  
  const classCode = document.getElementById("classCode").value;
  if (classCode == "" || classCode.length < 12) {
    showAlert("please enter valid class code");
    return;
  }
  console.log(classCode[8] + " , " + classCode[9]);

  const searchClassStudentData = await prepareStudentData(
    classCode[8],
    classCode[9]
  );
  await axios
    .post(`http://localhost:5005/collageapna/find/${classCode}`)
    .then(async (res) => {
      console.log("api fetching");
      if (res.data) {
        console.log(res.data.message);
        const classDetails = res.data;
        console.log("api fetched");
        console.log(classDetails);
        console.log(classDetails.attendance);
        const divForlectureDeatails = document.getElementById('divForlectureDeatails')
        
        await removeDivContent(divForlectureAttendance);
        await removeDivContent(divForlectureDeatails);
        console.log("run yet ");
        await removeDivContent(divForlectureDeatails);
        const faNameTag = document.createElement("p");
        faNameTag.setAttribute("class", "faNameTag");
        faNameTag.textContent = classDetails.faculty;
        const subTag = document.createElement("p");
        subTag.setAttribute("class", "subTag");
        subTag.textContent = classDetails.subject;
        const timeStampP = document.createElement("p");
        timeStampP.setAttribute("class", "timeStampP");
        timeStampP.textContent = classDetails.createdAt;

        const nameSubDiv = document.createElement("div");
        nameSubDiv.setAttribute("class", "nameSubDiv");
        nameSubDiv.appendChild(faNameTag);
        nameSubDiv.appendChild(subTag);
        nameSubDiv.appendChild(timeStampP);
        divForlectureDeatails.appendChild(nameSubDiv);
        addDivContent(divForlectureAttendance, classDetails.attendance);
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error);
        showAlert(error.message);
        // console.log("fetching error");
      }
    });
});
submitBtn.addEventListener("click", async function onSubmit() {
  const { semCode, branchCode, subCode, lectureNumber } = await getInputsData();
  const { Semester, branchName, subName } = await getInputsTextValue();
  const facultyName = document.getElementById("inputFacultyName").value;
  console.log(subName);
  const record = {
    faculty: facultyName,
    subject: subName,
    subCode: subCode,
    lectureNumber: lectureNumber,
    branchCode: branchCode,
    branchName: branchName,
    semCode: semCode,
    Semester: Semester,
    attendance: presentStudent,
  };
  await axios
    .post("http://localhost:5005/collageapna/postrecord", record)
    .then((res) => {
      if (res.data) {
        showAlert(res.data.message);
        // console.log(res.status);
        const mainContainer = document.getElementById("name-container");
        if (res.status == 201) {
          // code will run if record will be successfully stored
          removeDivContent(mainContainer); // for delete all student data from frontend
          presentStudent = null; // for do null the array
          enableInputsField();
          removeStatusOfClass();
          disableAddSAndSubmit();
          discardBtn.setAttribute("disabled", "true");
          console.log("array :" + presentStudent);
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(error);
        // console.log("fetching error");
      }
    });
});
getStart.addEventListener("click", async () => {
  const { semCode, branchCode, subCode, lectureNumber } = await getInputsData();
  console.log(semCode + "," + branchCode + "," + subCode + "," + lectureNumber);
  if (!semCode || !branchCode || !subCode || !lectureNumber) {
    showAlert("Please fill all fields");
    return;
  }
  var resForStart = false;

  const res = await axios.post(
    `http://localhost:5005/collageapna/classstatus/${semCode}/${branchCode}/${subCode}/${lectureNumber}`
  );
  try {
    if (res.status == 200) {
      showAlert(res.data.message);
      console.log("class available");
      let resForStart = await showPopUp(res.data.message);
      console.log(resForStart);
      if (resForStart) {
        prepareStudentData(semCode, branchCode);
        disableInputsField();
        getStart.setAttribute("disabled", "true");
        showStatusOfClass(
          "Session active for Semester Code " +
            semCode +
            " and Branch Code " +
            branchCode
        );
      }
    } else if (res.status == 201) {
      showAlert(res.data.message);
      console.log("class Not available");
    }
  } catch (error) {
    console.log(error);
  }
});

// add student in array and show on display
async function addStudentInArray() {
  const inputRollN = parseInt(document.getElementById("rollNumberInput").value);
  console.log(presentStudent);
  
  if (!presentStudent.includes(inputRollN)) {
    if (currentDetails[inputRollN]) {
      const student = currentDetails[inputRollN];
      const newName = document.createElement("p");
      newName.textContent = student.name;
      newName.setAttribute("class", "nameTag");
      const newBranch = document.createElement("p");
      newBranch.textContent = student.Branch;
      newBranch.setAttribute("class", "branchTag");
      const newRollN = document.createElement("p");
      newRollN.textContent = student.roll_number;
      newRollN.setAttribute("class", "rollNTag");
      const newdiv = document.createElement("div");
      newdiv.setAttribute("class", "studentDiv");
      newdiv.appendChild(newName);
      newdiv.appendChild(newBranch);
      newdiv.appendChild(newRollN);
      mainContainer.appendChild(newdiv);
      presentStudent.push(inputRollN);
      document.getElementById('coutOfStundent').innerHTML = presentStudent.length;
    } else {
      const stuNotE = "student not exist";
      showAlert(stuNotE);
    }
  } else {
    const alreadyE = "student already present";
    showAlert(alreadyE);
  }
  const list = document.getElementById("name-container");
  const items = Array.from(list.children); // Convert to an array of <li> elements
  // Sort the array based on the text content
  items.sort((a, b) =>
    a.children[0].textContent.localeCompare(b.children[0].textContent)
  );
  // Re-append sorted items to the list
  items.forEach((item) => list.appendChild(item));
}

inputRol.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    addStudentInArray();
  }
});
btnToAdd.addEventListener("click", () => addStudentInArray());

discardBtn.addEventListener("click", async () => {
  const resOnDiscard = await showPopUp(
    "Are you want to Discart. You will lose the attendance of current session."
  );
  console.log(resOnDiscard);
  if (resOnDiscard) {
    console.log("response is true");
    presentStudent = null;
    console.log(presentStudent);
    enableInputsField();
    removeStatusOfClass();
    disableAddSAndSubmit();
    removeDivContent(mainContainer);
    discardBtn.setAttribute("disabled", "true");
    getStart.removeAttribute("disabled");
  } else if (!resOnDiscard) {
    console.log("response is false");
  }
});


document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
      event.preventDefault();
      alert('Page reload with control R disabled!');
  }
});
document.addEventListener('keydown', function(event) {
  if(event.key == "F5"){
    event.preventDefault();
    alert('Page reload with F5 disabled!'); 
  }
});


// new class and find btn functionality
const newClassBtn = document.getElementById('newClassBtn');
const findSectionBtn = document.getElementById('findBtn');
newClassBtn.addEventListener('click',()=>{
  handleSection(0)
})
findSectionBtn.addEventListener('click',()=>{
  handleSection(1)
})
async function handleSection(code) {
  // new Promise((resolve)=>{
    var newClassSection = document.getElementById("newClassSection");
    var nameContainer = document.getElementById("name-container");
    // var newClassBtn = document.getElementById("newClassBtn");
    
    var showRecord = document.getElementById("showRecord");
    var findDiv = document.getElementById("findDiv");
    // var findBtn = document.getElementById("findBtn");
    console.log(findBtn);

  if (code == 0) {
    console.log("code = 0 ");
    nameContainer.classList.remove("deactive");
    newClassSection.classList.remove("deactive");
    showRecord.classList.remove("active");
    findDiv.classList.remove("active");
    // findBtn.style.background = "burlywood";
    // newClassBtn.style.background = "chocolate";
  } else {
    console.log("code = 1 ");
    nameContainer.classList.add("deactive");
    newClassSection.classList.add("deactive");
    showRecord.classList.add("active");
    findDiv.classList.add("active");
    // newClassBtn.style.background = "burlywood";
    // findBtn.style.background = "#007bff";
    // findBtn.style.background = "chocolate";
    };
  }
// setTimeout(()=>{handleSection(0)}, 1000);
  // "#007bff";
