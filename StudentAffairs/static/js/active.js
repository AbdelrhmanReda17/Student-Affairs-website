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
  var url = 'update.html?id=' + id;
  goToPage(url);
}

let x = false;
function goToDepartment(id) {
  var stds = JSON.parse(localStorage.getItem("Students"));
  for (var i = 0 ; i < stds.length ; i++) {
    if (stds[i].id == id && stds[i].level == 3) {
      var url = 'departmentprofile.html?id=' + id;
      goToPage(url);
      x = true;
      break;
    }
  }
  if(x === false){
    alert("level != 3");
  }
}

function goToPage(url) {
  window.location.href = url;
}
