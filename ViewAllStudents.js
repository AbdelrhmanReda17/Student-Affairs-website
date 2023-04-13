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
                if(tdName.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 && tdID.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1){
                    tr[i].style.display = "none";
                }else{
                    tr[i].style.display = "";
                }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const selectElements = document.querySelectorAll(".SelectStatue");
  
    selectElements.forEach((selectElement) => {
      selectElement.addEventListener("change", () => {
        const studentName = selectElement.parentNode.parentNode.parentNode.children[0].textContent;
        Swal.fire(
            'You Successfully change the statue of '+ studentName +' to '+ selectElement.value,
            '',
            'success'
          ).then((result) => {
          if (result.isConfirmed) {
            const selectedOption = selectElement.value;
            const StudentInfo = selectElement.parentNode.parentNode.parentNode;
            console.log( StudentInfo, selectedOption);
          }
        });
      });
    });
  });