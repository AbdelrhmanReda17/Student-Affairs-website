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
        Swal.fire({
          icon: 'success',
          title: 'Student Added Successfully!',
          showConfirmButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            var url = '/Student-Affairs/Students/updatestudent/?id=' + NewId;
            window.location.href = url;
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
  }
}
  
function OnCancelClicked() {
	Swal.fire({
        title: 'Changes Will Discard !!',
        text: "Are you sure you want to Go Back",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00539F',
        cancelButtonColor: '#00539F',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
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

    const name = document.getElementById("Sname").value;
    const id = document.getElementById("Sid").value;
    const email = document.getElementById("Semail").value;
    const gpa = document.getElementById("Sgpa").value;
    const nationalId = document.getElementById("Snational-id").value;
    const address = document.getElementById("Saddress").value;
    const phone = document.getElementById("Sphone").value;
  
    
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
    return (
      isNameValid &&
      isIdValid &&
      isEmailValid &&
      isGpaValid &&
      isNationalIdValid &&
      isAddressValid &&
      isPhoneValid
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