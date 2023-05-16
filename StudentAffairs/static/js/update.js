document.addEventListener('DOMContentLoaded', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/getStudents/', true);  // Replace with the appropriate URL for your Django view

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var students = response.students;  // Assuming the response is in JSON format with a 'students' key
      console.log(students);
      // You can now use the 'students' variable in your JavaScript code
    }
  };

  xhr.send();
});

function OnSaveClicked() {
	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get('id');
	// Get the studentForm element
	const studentForm = document.getElementById("form");
  
	// Add an event listener for the form submit
	studentForm.addEventListener("submit", function (event) {
		event.preventDefault(); // prevent default form submission


		// Get the form values
		const name = document.getElementById("Sname").value;
		const id = document.getElementById("Sid").value;
		let ch = true
		for(let i = 0 ; i < stds.length ; i++){
			if(id == stds[i].id &&  stds[i].name != name)
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
		if(ch == true && InputsValidation())
		{
			const email = document.getElementById("Semail").value;
			const gpa = document.getElementById("Sgpa").value;
			const nationalId = document.getElementById("Snational-id").value;
			const address = document.getElementById("Saddress").value;
			const phone = document.getElementById("Sphone").value;
			const department = document.getElementById("Sdepartment").value;
			const date = document.getElementById("Sdate").value;
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
				gender,
			};
			
			let stds = JSON.parse(localStorage.getItem("Students"));
			for (var i = 0; i < stds.length; i++) {
				if (myParam == stds[i].id ) {
					stds[i] = formData; 
					break; 
				}
			}
			let Students = JSON.stringify(stds);
			localStorage.setItem("Students", Students); 
			Swal.fire({
                icon: 'success',
                title: 'Student Updated Successfully!',
                showConfirmButton: true,
                timer:  600000
            }).then((result)=>{
				if(result.isConfirmed){
					window.location.href = "update.html?id=" + formData.id;
				}
			});
				
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
