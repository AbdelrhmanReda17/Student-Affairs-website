function tableSearch(){
    let input, filter, table, tr, tdName,tdID, tdActive, activeCheck;
    input = document.getElementById("searchBar");
    activeCheck = document.getElementById("setActive");
    filter = input.value;
    console.log("hi" + filter);
    console.log(filter);
    table = document.getElementById("allTable");
    tr = document.getElementsByTagName("tr");
    for(let i=1; i<tr.length ;i++){
        console.log(filter);
        console.log(tr[i]);
        tdActive = tr[i].getElementsByTagName("td")[5];
        if(filter == ""){
            if(activeCheck.checked){
                if(tdActive.innerText == "ACTIVE") tr[i].style.display="";
                else tr[i].style.display = "none";
            }else{
                tr[i].style.display="";
            }
            
        }else{
            tdName = tr[i].getElementsByTagName("td")[0];
            tdID = tr[i].getElementsByTagName("td")[1];
            console.log(tdName.innerText);
            if(activeCheck.checked){
                if(tdName.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 && tdID.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 ){
                    tr[i].style.display = "none";
                }else{
                    if(tdActive.innerText=="ACTIVE") tr[i].style.display = "";
                    else tr[i].style.display = "none";
                }
            }else{
                if(tdName.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1 && tdID.innerText.toUpperCase().indexOf(filter.toUpperCase()) <=-1){
                    tr[i].style.display = "none";
                }else{
                    tr[i].style.display = "";
                }
            }
            
            
        }
        
    }
}

