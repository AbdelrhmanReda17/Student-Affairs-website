const selectElements = document.getElementsByClassName("SelectStatue");
Array.from(selectElements).forEach((selectElement) => {
    selectElement.addEventListener("change", () => {
      const studentName = selectElement.parentNode.parentNode.parentNode.children[0].textContent;
      const Studentid = selectElement.parentNode.parentNode.parentNode.children[1].textContent;
      console.log(studentName , Studentid)
        Swal.fire({
          title: 'Do you want to save the changes?',
          text:'you trying to change the statue of '+ studentName+ ' to ' + selectElement.value,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            updatastudent(Studentid, function(response) {
              var url = '/Student-Affairs/Students/viewall/';
               window.location.href = url;
            });
            Swal.fire('Saved!', '', 'success')
          } else {

            Swal.fire('Changes are not saved', '', 'info')
          }
        })
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
      callback(response);  // Invoke the callback function with the response
    }
  };
  
  xhr.send();
}

function updatastudent(id, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/Student-Affairs/Students/updatestudent/';
  xhr.open('GET', url + '?id=' + id, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      callback(response);
    }
  };
  xhr.send();
}

function getStudents(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/Student-Affairs/Students/getStudents/', true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var students = response.students; 
      callback(students);  // Invoke the callback function with the students data
    }
  };
  
  xhr.send();
}

function goToDelete(id) {
  getStudents(function(students) {
    var studentToDelete = null;
    for (var i = 0; i < students.length; i++) {
      if (students[i].id == (id)) {
        studentToDelete = students[i];
        break;
      }
    }

    if (studentToDelete) {
      Swal.fire({
        title: 'Do you want to delete the student?',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          deleteStudent(studentToDelete.id, function(response) {
            var url = '/Student-Affairs/Students/viewall/';
             window.location.href = url;
            if (response.message) {
              Swal.fire({
                icon: 'success',
                title: 'Student Deleted Successfully!',
                showConfirmButton: true
              }).then((result) => {
                if (result.isConfirmed) {
                  //  location.reload();
                   var url = '/Student-Affairs/Students/viewall/';
                   window.location.href = url;
                }
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete student!'
              });
            }
          });
        } else if (result.isDenied) {
          Swal.fire('Student not deleted', '', 'info');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Student not found!'
      });
    }
  });
}