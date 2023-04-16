
 let urlParams;
window.onload = function() {
  var text = document.getElementsByClassName("input-field");
  for (var i = 0; i < text.length; i++) {
    text[i].disabled = true;
  }
  urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');
  let stds = JSON.parse(localStorage.getItem("Students")) || [];
  for (var i = 0; i < stds.length; i++) {
    if (myParam == stds[i].id) {
      document.getElementById("Sname").innerText = stds[i].name;
      document.getElementById("Sid").value = stds[i].id;
      document.getElementById("Semail").value = stds[i].email;
      document.getElementById("Sgpa").value = stds[i].gpa;
      document.getElementById("Snational-id").value = stds[i].nationalId;
      document.getElementById("Saddress").value = stds[i].address;
      document.getElementById("Sphone").value = stds[i].phone;
      document.getElementById("Sdate").value = stds[i].date;
      document.getElementById("Slevel").value = stds[i].level;

      const department = stds[i]?.department; // use optional chaining to avoid errors if stds[i] is undefined or doesn't have a department property
      const select = document.getElementById("dep");
      if (department) {
          const options = select.options;
          for (let j = 0; j < options.length; j++) {
            if (options[j].value === department) {
              select.value = department;
              break;
            }
            }
          }       
                
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.querySelector(".submit");
  const selectElement = document.getElementById("dep");

  if (selectElement) { // check if the element exists
    saveButton.addEventListener("click", () => {
      const selectedOption = selectElement.value;
      Swal.fire({
        title: 'Selected department is (' + selectedOption + ")",
        text: "Are you sure you want to save?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00539F',
        cancelButtonColor: '#00539F',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          let stds = JSON.parse(localStorage.getItem("Students")) || [];
          const myParam = urlParams.get('id');
          for (var i = 0; i < stds.length; i++) {
            if (myParam == stds[i].id) {
              stds[i].department = selectedOption;
              localStorage.setItem("Students", JSON.stringify(stds));
            }
          }
          selectElement.value = selectedOption; // update the select element selection
        } else {
          const stds = JSON.parse(localStorage.getItem("Students")) || [];
          const myParam = urlParams.get('id');
          for (var i = 0; i < stds.length; i++) {
            if (myParam == stds[i].id) {
              selectElement.value = stds[i].department;
            }
          }
        }
      })
    });
  }
});
