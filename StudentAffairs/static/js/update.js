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
window.onload = function() {
	var inputs = document.getElementsByTagName("input");
    	for (var i = 0; i < inputs.length; i++) {
        if ( inputs[i].type == "button") continue;
        
       		 inputs[i].disabled = true;
   	}
	const urlParams = new URLSearchParams(window.location.search);

	const myParam = urlParams.get('id');
  console.log(myParam)
  getStudents(function(students) {
    for (var i = 0; i < students.length; i++) {
      if (students[i].student_id == myParam) {
        document.getElementById("Sname").value = students[i].name;
        document.getElementById("Sid").value = students[i].student_id;
        document.getElementById("Semail").value = students[i].email;
        document.getElementById("Sgpa").value = students[i].gpa;
        document.getElementById("Snational-id").value = students[i].NationalID;
        document.getElementById("Saddress").value = students[i].address;
        document.getElementById("Sphone").value = students[i].phonenum;
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
function setStudent(data, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/Student-Affairs/Students/setStudents/';

  xhr.open('POST', url, true);

  // Set the appropriate headers for sending JSON data
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        callback(response);
      } else {
        console.error('Error: ' + xhr.status);
      }
    }
  };
  var jsonData = JSON.stringify(data);
  xhr.send(jsonData);
}

function OnSaveClicked() {
	document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    var form = document.getElementById('form');
  
    form.addEventListener('change', function() {
      var studentData = {
        old_id:myParam,
        student_id: document.getElementById("Sname").value,
        name: document.getElementById("Sname").value,
        id:document.getElementById("Sid").value,
        email:document.getElementById("Semail").value,
        gpa:document.getElementById("Sgpa").value,
        national_id:document.getElementById("Snational-id").value,
        address:document.getElementById("Saddress").value,
        phone:document.getElementById("Sphone").value,
        department:document.getElementById("Sdepartment").value,
        date:document.getElementById("Sdate").value,
        level:document.querySelector('input[name="Slevel"]').checked,
        Sgender:document.querySelector('input[name="Sgender"]').checked,
        status:document.querySelector('input[name="Sstatus"]').checked,
      };
  
      setStudent(studentData, function(response) {
        console.log(response);
      });
    });
  });
			Swal.fire({
                icon: 'success',
                title: 'Student Updated Successfully!',
                showConfirmButton: true,
                timer:  600000
            }).then((result)=>{
				if(result.isConfirmed){
          var url = '/Student-Affairs/Students/updatestudent/?id=' + studentData.id;
          window.location.href = url;
				}
			});
				
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
  
    // Return whether all fields are valid or not
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
    console.log(formControl);
	const small = formControl.querySelector('small');
	formControl.className = 'ipt-container error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
    console.log(formControl);
	formControl.className = 'ipt-container success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
