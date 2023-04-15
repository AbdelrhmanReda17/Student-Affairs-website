window.onload = function() {
	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get('id');
	console.log(myParam);
	let stds = JSON.parse(localStorage.getItem("Students")) || [];  
	for (var i = 0; i < stds.length; i++) {
	  if (myParam == stds[i].id) {

		console.log(stds[i].photosrc)
		document.getElementById("Sname").value = stds[i].name;
		document.getElementById("Sid").value = stds[i].id;
		document.getElementById("Semail").value = stds[i].email;
		document.getElementById("Sgpa").value = stds[i].gpa;
		document.getElementById("Snational-id").value = stds[i].nationalId;
		document.getElementById("Saddress").value = stds[i].address;
		document.getElementById("Sphone").value = stds[i].phone;
		document.getElementById("Sdepartment").value = stds[i].department;
		document.getElementById("Sdate").value = stds[i].date;
		document.querySelector('input[name="Slevel"][value="' + stds[i].level + '"]').checked = true;
		document.querySelector('input[name="Sgender"][value="' + stds[i].gender + '"]').checked = true;
		document.querySelector('input[name="Sstatus"][value="' + stds[i].status + '"]').checked = true;
		break;
	  }
	}
};
  function OnSaveClicked() {
	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get('id');
	// Get the studentForm element
	const studentForm = document.getElementById("form");
  
	// Add an event listener for the form submit
	studentForm.addEventListener("submit", function (event) {
		event.preventDefault(); // prevent default form submission

		let stds = JSON.parse(localStorage.getItem("Students")) || [];  
		// Get the form values
		const name = document.getElementById("Sname").value;
		const id = document.getElementById("Sid").value;
		let ch = true
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
		if(ch == true)
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
			window.location.href = "update.html?id=" + formData.id;
		}
	});
}


  
function OnCancelClicked() {
	alert("Changes Discarded!");
	location.reload();
}

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

// ------NOT NEEDED RIGHT NOW!------
// function DisableEdits() {
//     var editButton = document.getElementById("Edit");
// 	var saveButton = document.getElementById("savebutton");
// 	var goBackButton = document.getElementById("backbutton");
// 	editButton.style.display = "contents";
// 	saveButton.style.display = "none";
//     goBackButton.style.display = "none";
//     var inputs = document.getElementsByTagName("input");
// 	for (var i = 0; i < inputs.length; i++) {
// 		if (inputs[i] == document.getElementById("Sdepartment") || inputs[i].type == "button") continue;

// 		inputs[i].disabled = true;
// 	}
// }