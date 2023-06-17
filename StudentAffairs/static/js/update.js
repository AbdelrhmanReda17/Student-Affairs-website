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
window.onload = function() {
	var inputs = document.getElementsByTagName("input");
    	for (var i = 0; i < inputs.length; i++) {
        if ( inputs[i].type == "button") continue;
       		  inputs[i].disabled = true;
   	}
	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get('id');
  
  getStudents(function(students) {
    for (var i = 0; i < students.length; i++) {
      if (students[i].student_id == myParam) {
        document.getElementById('changephoto').files[0] = students[i].img.src;    
        document.getElementById("Sname").value = students[i].name;
        document.getElementById("Sid").value = students[i].student_id;
        document.getElementById("Semail").value = students[i].email;
        document.getElementById("Sgpa").value = students[i].gpa;
        document.getElementById("Snational-id").value = students[i].NationalID;
        document.getElementById("Saddress").value = students[i].address;
        document.getElementById("Sphone").value = '0' + students[i].phonenum;
        document.getElementById("Sdepartment").value = students[i].department;
        document.getElementById("Sdate").value = students[i].date;
        document.querySelector('input[name="Slevel"][value="' + students[i].level + '"]').checked = true;
        document.querySelector('input[name="Sgender"][value="' + students[i].gender + '"]').checked = true;
        document.querySelector('input[name="Sstatus"][value="' + (students[i].active ==true ? 'Active' : 'Inactive' ) + '"]').checked = true;
        if(students[i].img == "")
          if(students[i].gender == 'Male')
              document.getElementById('output').src = '/media/photos/Male.png';
          else
            document.getElementById('output').src = '/media/photos/Female.png';
        else
            document.getElementById('output').src = '/media/'+ students[i].img;
        break;
      }
    }
  });
};
document.addEventListener('DOMContentLoaded', function() {
  const studentForm = document.querySelector('form');
  Events();
  studentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    id = document.getElementById("Sid").value;
    if(id == myParam){
      ED();
    }else{
      checkid(id, function(result) {
        if(result){
          ED();
        }
      })
    }
  })
});
function Events(){
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
}
function ED(){
  if (InputsValidation()) {
    var form = document.getElementById('form');
    const photoInput = document.getElementById('changephoto');
    const photoFile = photoInput.files[0];      
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    const NewId = document.getElementById("Sid").value;
    const formData1 = new FormData();
    formData1.append('myParam', myParam);
    formData1.append('name', document.getElementById("Sname").value);
    formData1.append('id', document.getElementById("Sid").value);
    formData1.append('email', document.getElementById("Semail").value);
    formData1.append('gpa', document.getElementById("Sgpa").value);
    formData1.append('nationalId', document.getElementById("Snational-id").value);
    formData1.append('address', document.getElementById("Saddress").value);
    formData1.append('phone', document.getElementById("Sphone").value);
    formData1.append('department', document.getElementById("Sdepartment").value);
    formData1.append('date', document.getElementById("Sdate").value);
    formData1.append('level', document.querySelector('input[name="Slevel"]:checked').value);
    formData1.append('gender', document.querySelector('input[name="Sgender"]:checked').value);
    formData1.append('status', document.querySelector('input[name="Sstatus"]:checked').value);
    formData1.append('photo', photoFile);
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    $.ajax({
      url: '/Student-Affairs/Students/setStudents/',
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken
      },
      data: formData1,
      processData: false, 
      contentType: false, 
      success: function(response) {
        Alert.open({
          title:"Alert Message",
          message: 'Student Added Successfully!',
          onok:()=>{
            var url = '/Student-Affairs/Students/updatestudent/?id=' + NewId;
            window.location.href = url;
          }
        })
      },
      error: function() {
        Alert.open({
          title:"Alert Message",
          message: 'Something went wrong while update Student!',
          onok:()=>{
            var url = '/Student-Affairs/Students/updatestudent/?id=' + NewId;
            window.location.href = url;
          }
        })
      }
    });
  }
}
  
function OnCancelClicked() {
	Confirm.open({
        title:'Confirm Message',
        message: 'Changes Will Discard !! <strong>Are you sure you want to Cancel ?</strong>',
        onok:()=>{
          location.reload();
        },
        oncancel:()=>{}
      })
};
function loadFile(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
};

function OnEditClicked() {
    const editButton = document.getElementById("Edit");
    const saveButton = document.getElementById("savebutton");
    const goBackButton = document.getElementById("backbutton");
	  const Changephotobtn = document.getElementById("changephoto");
    editButton.style.display = "none";
    saveButton.style.display = "initial";
	  goBackButton.style.display = "initial";
	  Changephotobtn.style.display ="initial";
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i] == document.getElementById("Sdepartment") || inputs[i].type == "button") continue;
        
        inputs[i].disabled = false;
    }
}

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
  
 if (gpa < 0 || gpa > 4) {
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