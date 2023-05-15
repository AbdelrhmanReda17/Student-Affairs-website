window.onload = function() {
  var stds = JSON.parse(localStorage.getItem("Students"));
  var table = document.getElementById("table");
  var x = 0;
  for(var i = 0 ; i < stds.length ;i++) {
      if(stds[i].status == "Active")
      {  
          var row = table.insertRow(x+1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          let cell6 = row.insertCell(5);
          let cell7 = row.insertCell(6);
          var id = stds[i].id;

          cell1.innerHTML =(stds[i].name);
          cell2.innerHTML =(stds[i].id);
          cell3.innerHTML =(stds[i].gpa);
          cell4.innerHTML =(stds[i].level);
          cell5.innerHTML =(stds[i].phone);
          cell6.innerHTML ='<i id="Updateiconx" class="fa-solid fa-user-pen fa-lg" onclick="goToUpdatePage(' + stds[i].id + ')"> </i> ';
          cell7.innerHTML ='<i id="Departmenticon" class="fa-regular fa-pen-to-square" onclick="goToDepartment(' + stds[i].id + ')"> </i>';
          x++;
      }
  }
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
