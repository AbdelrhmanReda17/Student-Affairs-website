document.addEventListener('DOMContentLoaded', function() {
  const studentForm = document.querySelector('form');
  studentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (InputsValidation() ) {
      const name = document.getElementById('Sname').value;
      const id = document.getElementById('Sid').value;
      checkid(id, function(result) {
      if(result){
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
        const photoInput = document.getElementById('file-input');
        const photoFile = photoInput.files[0];      
        const formData1 = new FormData();
        formData1.append('name', name);
        formData1.append('id', id);
        formData1.append('email', email);
        formData1.append('gpa', gpa);
        formData1.append('nationalId', nationalId);
        formData1.append('address', address);
        formData1.append('phone', phone);
        formData1.append('department', 'General');
        formData1.append('date', date);
        formData1.append('level', level);
        formData1.append('gender', gender);
        formData1.append('status', status);
        formData1.append('photo', photoFile);
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
        $.ajax({
          url: '/Student-Affairs/Students/uploadstudent/',
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken
          },
          data: formData1,
          processData: false, // Prevent jQuery from processing the data
          contentType: false, // Let the server handle the content type
          success: function(response) {
            // Form submission successful
            studentForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Student Added Successfully!',
              showConfirmButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          },
          error: function() {
            // Handle form submission error
            Swal.fire({
              icon: 'error',
              title: 'Error submitting the form',
              showConfirmButton: true
            });
          }
        });
      }
    });
  }});   
});

function loadFile(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
};


function InputsValidation() {

    const name = document.getElementById("Sname").value;
    const id = document.getElementById("Sid").value;
    const email = document.getElementById("Semail").value;
    const gpa = document.getElementById("Sgpa").value;
    const nationalId = document.getElementById("Snational-id").value;
    const address = document.getElementById("Saddress").value;
    const phone = document.getElementById("Sphone").value;
    const level = document.querySelector('input[name="Slevel"]:checked');
    const status = document.querySelector('input[name="Sstatus"]:checked');
    const gender = document.querySelector('input[name="Sgender"]:checked');
    // Validate the input fields
    const nameRegex = /^[a-zA-Z ]{3,30}$/;
    const idRegex = /^[0-9]{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const gpaRegex = /^([0-3]\.[0-9]{1,3}|4\.0{1,3})$/;
    const nationalIdRegex = /^[0-9]{14}$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;
  
    const isNameValid = nameRegex.test(name);
    const isIdValid = idRegex.test(id);
    const isEmailValid = emailRegex.test(email);
    const isGpaValid = gpaRegex.test(gpa);
    const isNationalIdValid = nationalIdRegex.test(nationalId);
    const isAddressValid = addressRegex.test(address);
    const isPhoneValid = phoneRegex.test(phone);
  
    const Iname = document.getElementById("Sname");
    if (isNameValid) {
        setSuccessFor(Iname)
    } else {
		setErrorFor(Iname, 'Invalid Student Username');
    }

    const Iid = document.getElementById("Sid");
    if (isIdValid) {
        setSuccessFor(Iid)
    } else {
		setErrorFor(Iid, 'Invalid Student ID');
    }

    const Iemail = document.getElementById("Semail");
    if (isEmailValid) {
        setSuccessFor(Iemail)
    } else {
		setErrorFor(Iemail, 'Invalid Student Email');
    }
  
    const Igpa = document.getElementById("Sgpa");
    if (isGpaValid) {
        setSuccessFor(Igpa)
    } else {
		setErrorFor(Igpa, 'Invalid Student GPA');
    }

    const InationalId = document.getElementById("Snational-id");
    if (isNationalIdValid) {
        setSuccessFor(InationalId)
    } else {
		setErrorFor(InationalId, 'Invalid Student national Id');
    }
  
    const Iaddress = document.getElementById("Saddress");
    if (isAddressValid) {
        setSuccessFor(Iaddress)
    } else {
		setErrorFor(Iaddress, 'Invalid Student Email');
    }
  
    const Iphone = document.getElementById("Sphone");
    if (isPhoneValid) {
        setSuccessFor(Iphone)
    } else {
		setErrorFor(Iphone, 'Invalid Student Phone');
    }

    const Ilevel = document.querySelector('input[name="Slevel"]');
    if(level == null)
    {
        SetRadioError(Ilevel)
    }else
    {
        SetRadioSucess(Ilevel)
    }
    const Igender =  document.querySelector('input[name="Sgender"]');
    if(gender == null)
    {
        SetRadioError(Igender)
    }else
    {
        SetRadioSucess(Igender)
    }
    const Istatus =  document.querySelector('input[name="Sstatus"]');
    if(status == null)
    {
        SetRadioError(Istatus)
    }else
    {
        SetRadioSucess(Istatus)
    }
    // Return whether all fields are valid or not
    return (
      isNameValid &&
      isIdValid &&
      isEmailValid &&
      isGpaValid &&
      isNationalIdValid &&
      isAddressValid &&
      isPhoneValid &&
      (level !=null) &&
      (gender !=null) &&
      (status !=null)
    );
  }  


function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'ipt-container error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'ipt-container success';
}
function SetRadioSucess(input) {
	const formControl = input.parentElement;
	formControl.className = 'Radiobutton success';
}	
function SetRadioError(input) {
	const formControl = input.parentElement;
	formControl.className = 'Radiobutton error';
}	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function checkid(id, callback) {
  getStudents(function(students) {
    const Iid = document.getElementById('Sid');
    for (let i = 0; i < students.length; i++) {
      if (students[i].student_id == id) {
        setErrorFor(Iid, 'Student ID is Already Registered');
        callback(false);
        return;
      }
    }
    callback(true);
  });
}
function getStudents(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/Student-Affairs/Students/getStudents/', true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var students = response.students;  // Assuming the response is in JSON format with a 'students' key
      callback(students);  // Invoke the callback function with the students data
    }
  };
  xhr.send();
}