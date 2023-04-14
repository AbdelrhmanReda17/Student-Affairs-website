window.onload = function() {
  var stds = JSON.parse(localStorage.getItem("Students"));
  var table = document.getElementById("table");
  var x = 0;
  for(var i = 0 ; i < stds.length ;i++) {
    if(stds[i].status == "Inactive")
    {

        var row = table.insertRow(x+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML =(stds[i].name);
        cell2.innerHTML =(stds[i].id);
        cell3.innerHTML =(stds[i].gpa);
        cell4.innerHTML =(stds[i].level);
        cell5.innerHTML =(stds[i].phone);
        x++;
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
}