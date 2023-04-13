function OnSaveClicked() {
	// Get the studentForm element
	const studentForm = document.getElementById("form");

	// Add an event listener for the form submit
	studentForm.addEventListener("submit", function (event) {
		// Get the form values
		const name = document.getElementById("Stname").value;
		const id = document.getElementById("SID").value;
		const email = document.getElementById("Semail").value;
		const gpa = document.getElementById("Sgpa").value;
		const nationalId = document.getElementById("Snational-id").value;
		const address = document.getElementById("Saddress").value;
		const phone = document.getElementById("Sphone").value;
		const department = document.getElementById("Sdepartment").value;
		const date = document.getElementById("Sdate").value;
		const level = document.querySelector(
			'input[name="Slevel"]:checked'
		).value;
		const gender = document.querySelector(
			'input[name="Sgender"]:checked'
		).value;
		const status = document.querySelector(
			'input[name="Sstatus"]:checked'
		).value;

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
		console.log(formData);
	});
	if (studentForm.checkValidity()) {
		alert("Information Saved Successfully!");
	}
}

function OnCancelClicked() {
	alert("Changes Discarded!");
	location.reload();
}

function OnEditClicked() {
    const editButton = document.getElementById("Edit");
    const saveButton = document.getElementById("savebutton");
    const goBackButton = document.getElementById("backbutton");
    editButton.style.display = "none";
    saveButton.style.display = "contents";
	goBackButton.style.display = "contents";
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