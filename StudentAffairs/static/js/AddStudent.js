document.addEventListener('DOMContentLoaded', function() {

  const resetButton = document.querySelector('.resetButton');
  resetButton.addEventListener('click', function() {
    location.reload();
  });

  
  const studentForm = document.querySelector('form');
  const nameInput = document.getElementById('Sname');
  const idInput = document.getElementById('Sid');
  const emailInput = document.getElementById('Semail');
  const gpaInput = document.getElementById('Sgpa');
  const nationalIdInput = document.getElementById('Snational-id');
  const addressInput = document.getElementById('Saddress');
  const phoneInput = document.getElementById('Sphone');
  const levelInputs = document.querySelectorAll('input[name="Slevel"]');
  const genderInputs = document.querySelectorAll('input[name="Sgender"]');
  const statusInputs = document.querySelectorAll('input[name="Sstatus"]');
  
  nameInput.addEventListener('input', validateName);
  idInput.addEventListener('input', validateId);
  emailInput.addEventListener('input', validateEmail);
  gpaInput.addEventListener('input', validateGpa);
  nationalIdInput.addEventListener('input', validateNationalId);
  addressInput.addEventListener('input', validateAddress);
  phoneInput.addEventListener('input', validatePhone);
  
  levelInputs.forEach(function(input) {
    input.addEventListener('change', validateLevel);
  });
  
  genderInputs.forEach(function(input) {
    input.addEventListener('change', validateGender);
  });
  
  statusInputs.forEach(function(input) {
    input.addEventListener('change', validateStatus);
  });

  studentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (InputsValidation()) {
      const id = document.getElementById('Sid').value;
      checkid(id, function(result) {
        if (result) {
          const name = nameInput.value;
          const email = emailInput.value;
          const gpa = gpaInput.value;
          const nationalId = nationalIdInput.value;
          const address = addressInput.value;
          const phone = phoneInput.value;
          const department = 'General';
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
          formData1.append('department', department);
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
            processData: false,
            contentType: false,
            success: function(response) {
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
              Swal.fire({
                icon: 'error',
                title: 'Error submitting the form',
                showConfirmButton: true
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error submitting the form',
            text: 'Invalid ID',
            showConfirmButton: true
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error submitting the form',
        text: 'Invalid input',
        showConfirmButton: true
      });
    }
  });
});


function loadFile(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
};


function InputsValidation() {
  validateName();
  validateId();
  validateEmail();
  validateGpa();
  validatePhone();
  validateNationalId();
  validateAddress();
  validateLevel();
  validateGender();
  validateStatus();
  const errorInputs = document.querySelectorAll('.error');
  return errorInputs.length === 0;
}

function validateName() {
  const nameInput = document.getElementById('Sname');
  const name = nameInput.value.trim();
  const nameRegex = /^[A-Za-z\s]+$/;

  if (name === '') {
    setErrorFor(nameInput, 'Name cannot be blank');
  } else if (!nameRegex.test(name)) {
    setErrorFor(nameInput, 'Name can only contain letters');
  } else {
    setSuccessFor(nameInput);
  }
}

function validateId() {
  const idInput = document.getElementById('Sid');
  const id = idInput.value.trim();

  if (id === '') {
    setErrorFor(idInput, 'ID cannot be blank');
  } else if (id.length !== 8) {
    setErrorFor(idInput, 'ID must be 8 digits');
  } else {
    setSuccessFor(idInput);
  }
}


function validateEmail() {
  const emailInput = document.getElementById('Semail');
  const email = emailInput.value.trim();
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email === '') {
    setErrorFor(emailInput, 'Email cannot be blank');
  } else if (!emailRegex.test(email)) {
    setErrorFor(emailInput, 'Email is not valid');
  } else {
    setSuccessFor(emailInput);
  }
}

function validateGpa() {
  const gpaInput = document.getElementById('Sgpa');
  const gpa = gpaInput.value.trim();
  if(gpaInput && gpaInput.value.trim() === ''){
    setErrorFor(gpaInput, 'GPA cannot be blank');
  }
 else if (gpa < 0 || gpa > 4) {
    setErrorFor(gpaInput, 'GPA must be between 0 and 4');
  } else {
    setSuccessFor(gpaInput);
  }
}


function validatePhone() {
  const phoneInput = document.getElementById('Sphone');
  const phone = phoneInput.value.trim();
  const phoneRegex = /^(010|011|012)\d{8}$/;

  if (phone === '') {
    setErrorFor(phoneInput, 'Phone number cannot be blank');
  } else if (!phoneRegex.test(phone)) {
    setErrorFor(phoneInput, 'Phone number is not valid');
  } else {
    setSuccessFor(phoneInput);
  }
}

function validateNationalId() {
  const nationalIdInput = document.getElementById('Snational-id');
  const nationalId = nationalIdInput.value.trim();

  if (nationalId === '') {
    setErrorFor(nationalIdInput, 'National ID cannot be blank');
  } else if (nationalId.length !== 14) {
    setErrorFor(nationalIdInput, 'National ID must be 14 digits');
  } else {
    setSuccessFor(nationalIdInput);
  }
}

function validateAddress() {
  const addressInput = document.getElementById('Saddress');
  const address = addressInput.value.trim();

  if (address === '') {
    setErrorFor(addressInput, 'Address cannot be blank');
  } else {
    setSuccessFor(addressInput);
  }
}



function validateLevel() {
  const levelInputs = document.querySelectorAll('input[name="Slevel"]');
  let isValid = false;

  levelInputs.forEach(function(input) {
    if (input.checked) {
      isValid = true;
    }
  });

  if (!isValid) {
    levelInputs.forEach(function(input) {
      SetRadioError(input);
    });
  } else {
    levelInputs.forEach(function(input) {
      SetRadioSucess(input);
    });
  }
}

function validateGender() {
  const genderInputs = document.querySelectorAll('input[name="Sgender"]');
  let isValid = false;

  genderInputs.forEach(function(input) {
    if (input.checked) {
      isValid = true;
    }
  });

  if (!isValid) {
    genderInputs.forEach(function(input) {
      SetRadioError(input);
    });
  } else {
    genderInputs.forEach(function(input) {
      SetRadioSucess(input);
    });
  }
}

function validateStatus() {
  const statusInputs = document.querySelectorAll('input[name="Sstatus"]');
  let isValid = false;

  statusInputs.forEach(function(input) {
    if (input.checked) {
      isValid = true;
    }
  });

  if (!isValid) {
    statusInputs.forEach(function(input) {
      SetRadioError(input);
    });
  } else {
    statusInputs.forEach(function(input) {
      SetRadioSucess(input);
    });
  }
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
      var students = response.students;  
      callback(students);  
    }
  };
  xhr.send();
}
