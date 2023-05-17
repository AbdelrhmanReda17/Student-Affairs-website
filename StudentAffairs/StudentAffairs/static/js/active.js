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

function tableSearch() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows and hide those that don't match the search query
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
  var formattedId = id.trim();  // Remove leading/trailing spaces if any
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
      alert("Level is not 3");
    }
  });
}

function goToPage(url) {
  window.location.href = url;
}
