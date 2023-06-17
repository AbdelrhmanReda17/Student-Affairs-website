function handleKeyPress(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      tableSearch();
  }
}

document.addEventListener("DOMContentLoaded", () => {
const selectElements = document.getElementsByClassName("SelectStatue");
Array.from(selectElements).forEach((selectElement) => {

    selectElement.addEventListener("change", () => {
      const studentName = selectElement.parentNode.parentNode.parentNode.children[0].textContent;
      const Studentid = selectElement.parentNode.parentNode.parentNode.children[1].textContent;
 
        Confirm.open({
          title: 'Confirm Message',
          message: 'Do you want to save the changes?',
          okText: 'Save',
          cancelText: `Don't save`,
          onok: () => {
            updatastudent(Studentid)
          },
          oncancel: () => {
            if(selectElement.value == "Active"){
              selectElement.value = 'Inactive';
            }
            else{
              selectElement.value = 'Active';
            }
            Alert.open({
              title:'Alert Message',
              message: 'Changes are not saved',
              onok: ()=>{}
            })
          }
        })
    });
});
});

function tableSearch(){
    let input, filter, table, tr, tdName,tdID, tdActive, activeCheck;
    input = document.getElementById("searchBar");
    activeCheck = document.getElementsByName("Ssearch");
    filter = input.value;
    table = document.getElementById("table");
    tr = document.getElementsByTagName("tr");
    for(let i=1; i<tr.length ;i++){
        tdActive = tr[i].getElementsByTagName("td")[5];
        if(filter == ""){
                tr[i].style.display="";
            
        }else{
            tdName = tr[i].getElementsByTagName("td")[0];
            tdID = tr[i].getElementsByTagName("td")[1];
            tdDepartment = tr[i].getElementsByTagName("td")[3]
                if(tdName.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 && tdID.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 && tdDepartment.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 ){
                    tr[i].style.display = "none";
                }else{
                    tr[i].style.display = "";
                }
        }
    }
}

function deleteStudent(id, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/Student-Affairs/Students/deletestudent/';
  xhr.open('GET', url + '?id=' + id, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response);  
    }
  };
  xhr.send();
}

function updatastudent(id) {
  const formData1 = new FormData();
  formData1.append('id' , id);
  const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  $.ajax({
    url: '/Student-Affairs/Students/Changestate/',
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
        message: 'Changes are saved successfully',
        onok: ()=>{}
      })
    },
    error: function() {
      Alert.open({
        title:'Alert Message',
        message: 'Error submitting the form',
        onok: ()=>{}
      })
    }
  });
}

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

function goToDelete(id , stds) {
  var table = document.getElementById("table");
  var row = document.querySelectorAll("#id");
  getStudents(function(students) {
    var studentToDelete = null;
    for (var i = 0; i < students.length; i++) {
      if (students[i].id == (id)) {
        studentToDelete = students[i];
        break;
      }
    }
    if (studentToDelete) {
      Confirm.open({
        title: 'Confrim Message',
        message: 'Do you want to delete the student?',
        okText: 'Yes, delete',
        cancelText: 'Cancel',
        onok: ()=>{
          deleteStudent(studentToDelete.id, function(response) {
            if (response.message){
              for(var i = 0 ; i < row.length ; i++){
                if(row[i].innerHTML == stds){
                  table.deleteRow(i+1);
                }
              }
              Alert.open({
                title:'Alert Message',
                message:'Student Deleted Successfully!',
                onok:()=>{}
              })
            }
          })
        },
        oncancel: ()=>{
          Alert.open({
            title:'Alert Message',
            message:'Changes are not saved',
            onok:()=>{}
          })
        }
      })
    }
  });
}