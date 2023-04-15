document.addEventListener("DOMContentLoaded", function(event) { 
    // Get the studentForm element
    const studentForm = document.getElementById('form');

    // Add an event listener for the form submit
    studentForm.addEventListener('submit', function(event) {

    event.preventDefault(); // prevent the default form submission

    // Get the form values
    const name = document.getElementById('Sname').value;
    const id = document.getElementById('Sid').value;
    let stds = JSON.parse(localStorage.getItem("Students"));
    var ch = true;
    for(let i = 0 ; i < stds.length ; i++){
        if(id == stds[i].id)
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Student ID is already registered',
            }) 
            ch = false;
            break;
        }
    }
    var nationalIDField = document.getElementById('Snational-id');
    var nationalID = nationalIDField.value;

    if (validateNationalID(nationalID)) {
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'National ID is incorrect',
        }) 
      ch = false;
    }
    if(ch == true)
        {
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
            const photosrc = document.getElementById('output').src;

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
                gender,
                photosrc
            };
            
            stds.push(formData)
            let studentsdata = JSON.stringify(stds);
            localStorage.setItem("Students" , studentsdata);
            studentForm.reset();
             Swal.fire({
                icon: 'success',
                title: 'Student Added Successfully!',
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
});


// Image upload
const loadFile = function(event) {
    const output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    
};


function validateNationalID(nationalID) {
    if (!/^[1-3]\d{13}$/.test(nationalID)) {
      return false;
    }else{
        return true;
    }
  }
  
