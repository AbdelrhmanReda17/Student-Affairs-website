window.onload = function() {
    var text = document.getElementsByClassName("input-field");
    for (var i = 0; i < text.length; i++) {
      text[i].disabled = true;
    }
    var textFields = document.getElementsByClassName("ssradio");
    for (var i = 0; i < textFields.length; i++) {
      textFields[i].disabled = true;
    }
  };

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    let stds = JSON.parse(localStorage.getItem("Students")) || [];  
    for (var i = 0; i < stds.length; i++) {
      if (myParam == stds[i].id) {
  
      //document.getElementById("output").setAttribute("src" , stds[i].photosrc);
      console.log(stds[i].photosrc)
      document.getElementById("Sname").value = stds[i].name;
      document.getElementById("Sid").value = stds[i].id;
      document.getElementById("Semail").value = stds[i].email;
      document.getElementById("Sgpa").value = stds[i].gpa;
      document.getElementById("Snational-id").value = stds[i].nationalId;
      document.getElementById("Saddress").value = stds[i].address;
      document.getElementById("Sphone").value = stds[i].phone;
      document.getElementById("Sdate").value = stds[i].date;
      document.getElementById("Slevel").value = stds[i].level;
      const department = stds[i]?.department; // use optional chaining to avoid errors if stds[i] is undefined or doesn't have a department property
      const input = document.querySelector('input[name="Sdep"][value="' + department + '"]');
        if (input) {
          input.checked = true; // use checked property instead of selected for radio buttons
        }
      }
    }
};
document.addEventListener("DOMContentLoaded", () => {


    const selectElement = document.getElementById("Sdep");
    const saveButton = document.querySelector(".submit");
  
    saveButton.addEventListener("click", () => {
      const selectedOption = selectElement.value;
      console.log(selectedOption);
        
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.querySelector(".submit");
    const selectElement = document.getElementById("Sdep");
    
    saveButton.addEventListener("click", () => {
      Swal.fire({
        title: 'Selected department is (' + selectElement.value + ")",
        text: "Are you sure you want to save?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00539F',
        cancelButtonColor: '#00539F',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).then((result) => {
        if (result.isConfirmed) {
          const selectedOption = selectElement.value;
          console.log(selectedOption);
        }
      })
    });
});
  

  // document.addEventListener("DOMContentLoaded", () => {
  //   const saveButton = document.querySelector(".submit");
  //   const selectElement = document.getElementById("Sdep");
  //   saveButton.addEventListener("click", () => {
  //     const confirmation = confirm("Selected department is (" + selectElement.value +") are you sure you want to save it?");
      
  //     if (confirmation == true) {
  //       const selectedOption = selectElement.value;
  //       console.log(selectedOption);
      
  //     } else {

  //     }
  //   });

  // });
  