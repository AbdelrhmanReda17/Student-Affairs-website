// Wait for the document to be loaded
document.addEventListener("DOMContentLoaded", function(event) { 

    // Get the studentForm element
    const studentForm = document.getElementById('form');
  
    // Add an event listener for the form submit
    studentForm.addEventListener('submit', function(event) {
      event.preventDefault(); // prevent the default form submission
  
      // Get the form values
      const name = document.getElementById('Sname').value;
      const id = document.getElementById('Sid').value;
      const email = document.getElementById('Semail').value;
      const gpa = document.getElementById('Sgpa').value;
      const nationalId = document.getElementById('Snational-id').value;
      const address = document.getElementById('Saddress').value;
      const phone = document.getElementById('Sphone').value;
      const department = "General";
      const date = document.getElementById('Sdate').value;
      const level = document.querySelector('input[name="Slevel"]:checked').value;
      const gender = document.querySelector('input[name="Sgender"]:checked').value;
      const status = document.querySelector('input[name="Sstatus"]:checked').value;

      // Create an object with the form data
      const formData = {
        name,
        id,
        email,
        gpa,
        nationalId,
        address,
        date,
        department,
        phone,
        level,
        status,
        gender
      };
      console.log(formData);
      studentForm.reset();
    });
  });
  