// const selectElements = document.getElementsByClassName("SelectStatue");
// Array.from(selectElements).forEach((selectElement) => {
//     selectElement.addEventListener("change", () => {
//       const studentName = selectElement.parentNode.parentNode.parentNode.children[0].textContent;
//       const Studentid = selectElement.parentNode.parentNode.parentNode.children[1].textContent;
//         Swal.fire({
//           title: 'Do you want to save the changes?',
//           text:'you trying to change the statue of '+studentName+ ' to ' +selectElement.value,
//           showDenyButton: true,
//           showCancelButton: true,
//           confirmButtonText: 'Save',
//           denyButtonText: `Don't save`,
//         }).then((result) => {
//           /* Read more about isConfirmed, isDenied below */
//           if (result.isConfirmed) {
//             var stds = JSON.parse(localStorage.getItem("Students"));
//             for(var i = 0 ; i < stds.length;i++)
//             {
//                 if(stds[i].id ==  Studentid)
//                   {
//                     stds[i].status = selectElement.value;
//                   }
//             }
//             let students = JSON.stringify(stds);
//             localStorage.setItem("Students" , students);
//             Swal.fire('Saved!', '', 'success')
//           } else {
//             if(selectElement.value == "Active")
//               {
//                 selectElement.value = 'Inactive';
//               }
//             else
//               {
//                 selectElement.value = 'Active';
//               }
//             Swal.fire('Changes are not saved', '', 'info')
//           }
//         })
//     });
// });
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


