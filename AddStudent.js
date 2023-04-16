
document.addEventListener("DOMContentLoaded", function(event) { 
    // Get the studentForm element
    const studentForm = document.getElementById('form');

    // Add an event listener for the form submit
    studentForm.addEventListener('submit', function(event) {

    event.preventDefault();

    // Get the form values
    const name = document.getElementById('Sname').value;
    const id = document.getElementById('Sid').value;
    console.log(name , id);
    let stds = JSON.parse(localStorage.getItem("Students"));
    var ch = true;
    for(let i = 0 ; i < stds.length ; i++){
        if(id == stds[i].id )
        {
            setErrorFor(Iid, 'Student ID is Already Registered');
            ch = false;
            break;
        }
    }
    if(ch == true && InputsValidation() == 1)
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
                showConfirmButton: true,
            }).then((result)=>{
				if(result.isConfirmed){
                location.reload();
				};
            });
        };
    });
});


// Image upload
const loadFile = function(event) {
    const output = document.getElementById('output');
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