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
  