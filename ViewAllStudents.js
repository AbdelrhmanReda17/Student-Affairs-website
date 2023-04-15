window.onload = function() {
  var stds = JSON.parse(localStorage.getItem("Students"));
  var table = document.getElementById("table");
  for(var i = 0 ; i < stds.length ;i++) {
    var row = table.insertRow(i+1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML =(stds[i].name);
    cell2.innerHTML =(stds[i].id);
    cell3.innerHTML =(stds[i].gpa);
    cell4.innerHTML =(stds[i].department);
    if(stds[i].status =="Active") {
      cell5.innerHTML = '<form> <select name="StudentStatue"  aria-label="Active/InActive" class="SelectStatue"> <option value="Active" selected> ACTIVE </option> <option value="Inactive"> INACTIVE </option></select> </form>';
    } else {
      cell5.innerHTML = '<form> <select name="StudentStatue"  aria-label="Active/InActive" class="SelectStatue"> <option value="Active" > ACTIVE </option> <option selected value="Inactive"> INACTIVE </option></select> </form>';
    }
    cell6.innerHTML = '<i id="deleteicon" class="fa-solid fa-xmark fa-xl" onclick="goToDelete(' + stds[i].id +')"> </i>';
}


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

const selectElements = document.getElementsByClassName("SelectStatue");
Array.from(selectElements).forEach((selectElement) => {
  selectElement.addEventListener("change", () => {
    const studentName = selectElement.parentNode.parentNode.parentNode.children[0].textContent;
    const Studentid = selectElement.parentNode.parentNode.parentNode.children[1].textContent;
      Swal.fire({
        title: 'Do you want to save the changes?',
        text:'you trying to change the statue of '+studentName+ ' to ' +selectElement.value,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var stds = JSON.parse(localStorage.getItem("Students"));
          for(var i = 0 ; i < stds.length;i++)
          {
              if(stds[i].id ==  Studentid)
                {
                  stds[i].status = selectElement.value;
                }
          }
          let students = JSON.stringify(stds);
          localStorage.setItem("Students" , students);
          Swal.fire('Saved!', '', 'success')
        } else {
          if(selectElement.value == "Active")
            {
              selectElement.value = 'Inactive';
            }
          else
            {
              selectElement.value = 'Active';
            }
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
  });
});
};

function goToDelete(id){
  var stds = JSON.parse(localStorage.getItem("Students"));

  var index ;
  var student;
  for(var i = 0 ; i < stds.length;i++)
      {   
          if(stds[i].id == id)
            {
          
              index = i;
              student = stds[i];
            }
          
      }
  Swal.fire({
    title: 'Do you want to save the changes?',
    text:'you trying to delete student ' + student.name ,
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      stds.splice(index,1);
      
      localStorage.setItem("Students",JSON.stringify(stds));
      Swal.fire({
        icon: 'success',
        title: 'Student Deleted Successfully!',
        showConfirmButton: true,

          }).then((result)=>{
        if(result.isConfirmed){
          location.reload();
        }
        });  
    } 
  else {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}


