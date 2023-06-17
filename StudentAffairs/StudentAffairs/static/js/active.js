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
function handleKeyPress(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      tableSearch();
  }
}

function tableSearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      if (td[j]) {
        txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

function goToUpdatePage(id) {
  var formattedId = id.trim(); 
  var url = '/Student-Affairs/Students/updatestudent/?id=' + formattedId;
  goToPage(url);
}

function goToDepartment(id) {
  let x = false;
  getStudents(function(students) {
    for (var i = 0; i < students.length; i++) {
      if (students[i].student_id == id && students[i].level == 3) {
        var formattedId = id.trim();
        var url = '/Student-Affairs/Students/departmentprofile/?id=' + formattedId;
        goToPage(url);
        x = true;
        break;
      }
    }
    if (x == false) {
      Alert.open({
        title:'Alert Message',
        message:'Level is not 3',
        onok:()=>{}
      })
    }
  });
}

function goToPage(url) {
  window.location.href = url;
}
