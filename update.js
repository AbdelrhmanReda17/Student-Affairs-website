function OnSaveClicked() {
    DisableEdits();
    alert("Information Saved Successfully!");
}

function OnCancelClicked() {
    DisableEdits();
    alert("Changes Discarded!");
}

function OnEditClicked() {
    var editButton = document.getElementById("Edit");
    var saveButton = document.getElementById("savebutton");
    var goBackButton = document.getElementById("backbutton");
    editButton.style.display = "none";
    saveButton.style.display = "contents";
    goBackButton.style.display = "contents";
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i] == document.getElementById("Sdepartment") || inputs[i].type == "button") continue;
        
        inputs[i].disabled = false;
    }
}

function DisableEdits() {
    var editButton = document.getElementById("Edit");
	var saveButton = document.getElementById("savebutton");
	var goBackButton = document.getElementById("backbutton");
	editButton.style.display = "contents";
	saveButton.style.display = "none";
    goBackButton.style.display = "none";
    var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i] == document.getElementById("Sdepartment") || inputs[i].type == "button") continue;

		inputs[i].disabled = true;
	}
}