function getStudents(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/Student-Affairs/Students/getStudents/', true);
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var students = response.students;  
        callback(students);  
      }
    };
    
    xhr.send();
}
let Olddepartment;
document.addEventListener("DOMContentLoaded", () => {
  var inputs = document.getElementsByClassName("input-field");
   for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
   }
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');
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
        const department = students[i].department; 
        const select = document.getElementById("dep");
        select.value = department;
        Olddepartment = department;
        break;
      }
    }
  });
});
function Submit(){
  const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const saveButton = document.querySelector(".submit");
    const selectElement = document.getElementById("dep");
    if (selectElement) { 
        const selectedOption = selectElement.value;
        Confirm.open({
          title: 'Confirm Message',
          message: "Selected department is (" + selectedOption + ")\n Are you sure you want to save?",
          okText: 'Yes',
          cancelText: 'No',
          onok: ()=>{
              updatastudent(myParam , selectedOption);
              Olddepartment = selectElement.value;
          },
          oncancel:()=>{
            Alert.open({
              title:'Alert Message',
              message:'Changes does not saved',
              onok:()=>{selectElement.value = Olddepartment}
            })
          }
        })
    }
}
  
function updatastudent(id , department) {
  const formData1 = new FormData();
  formData1.append('id' , id);
  formData1.append('department' , department);
  const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  $.ajax({
    url: '/Student-Affairs/Students/updatedepartment/',
    method: 'POST',
    headers: {
      'X-CSRFToken': csrfToken
    },
    data: formData1,
    processData: false, 
    contentType: false, 
    success: function(response) {
      Alert.open({
        title:'Alert Message',
        message:'Student updated successfully',
        onok:()=>{}
      })
    },
    error: function() {
      Alert.open({
        title:'Alert Message',
        message:'Something went wrong while update student',
        onok:()=>{}
      })
    }
  });
}