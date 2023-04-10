const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting to the server

    const name = document.getElementById('Sname').value;
    const id = document.getElementById('Sid').value;
    const email = document.getElementById('Semail').value;
    const gpa = document.getElementById('Sgpa').value;
    const nationalId = document.getElementById('Snational-id').value;
    const address = document.getElementById('Saddress').value;
    const phone = document.getElementById('Sphone').value;
    const department = document.getElementById('Sdepartment').value;
    const date = document.getElementById('Sdate').value;
    const level = document.querySelector('input[name="Slevel"]:checked').value;
    const gender = document.querySelector('input[name="Sgender"]:checked').value;
    const status = document.querySelector('input[name="Sstatus"]:checked').value;

    console.log(name, id , email,gpa , nationalId , address , phone , department , date , level , gender , status);
});
