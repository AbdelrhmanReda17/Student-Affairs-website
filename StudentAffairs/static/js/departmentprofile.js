function getStudents(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Student-Affairs/Students/getStudents/', true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var students = response.students;  // Assuming the response is in JSON format with a 'students' key
        callback(students);  // Invoke the callback function with the students data
      }
    };
    
    xhr.send();
}
window.onload = function() {
var inputs = document.getElementsByClassName("input-field");
   for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
   }
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
  console.log(myParam)
  getStudents(function(students) {
    for (var i = 0; i < students.length; i++) {
      if (students[i].student_id == myParam) {
        document.getElementById("Sname").innerText = students[i].name;
        document.getElementById("Sid").value = students[i].student_id;
        document.getElementById("Semail").value = students[i].email;
        document.getElementById("Sgpa").value = students[i].gpa;
        document.getElementById("Snational-id").value = students[i].NationalID;
        document.getElementById("Saddress").value = students[i].address;
        document.getElementById("Sphone").value = students[i].phonenum;
        document.getElementById("Sdate").value = students[i].date;
        document.getElementById("Slevel").value = students[i].level;
        if(students[i].img == "")
        document.getElementById('output').src = '/media/photos/male.png';
        else
        document.getElementById('output').src = '/media/'+ students[i].img;
        const department = students[i].department; // use optional chaining to avoid errors if stds[i] is undefined or doesn't have a department property
        if (department) {
            const options = select.options;
            for (let j = 0; j < options.length; j++) {
                if (options[j].value === department) {
                select.value = department;
                break;
                }
            }
        } 
        break;
      }
    }
  });
};
// document.addEventListener("DOMContentLoaded", () => {
//   const saveButton = document.querySelector(".submit");
//   const selectElement = document.getElementById("dep");

//   if (selectElement) { // check if the element exists
//     saveButton.addEventListener("click", () => {
//       const selectedOption = selectElement.value;
//       Swal.fire({
//         title: 'Selected department is (' + selectedOption + ")",
//         text: "Are you sure you want to save?",
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#00539F',
//         cancelButtonColor: '#00539F',
//         confirmButtonText: 'Yes',
//         cancelButtonText: 'No'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           let stds = JSON.parse(localStorage.getItem("Students")) || [];
//           const myParam = urlParams.get('id');
//           for (var i = 0; i < stds.length; i++) {
//             if (myParam == stds[i].id) {
//               stds[i].department = selectedOption;
//               localStorage.setItem("Students", JSON.stringify(stds));
//             }
//           }
//           selectElement.value = selectedOption; // update the select element selection
//         } else {
//           const stds = JSON.parse(localStorage.getItem("Students")) || [];
//           const myParam = urlParams.get('id');
//           for (var i = 0; i < stds.length; i++) {
//             if (myParam == stds[i].id) {
//               selectElement.value = stds[i].department;
//             }
//           }
//         }
//       })
//     });
//   }
// });
