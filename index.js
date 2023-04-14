let student = [
    {
        name:"Ahmed Mohamed",
        id :"20210224",
        email :"ahmedmohammed@gmail.com",
        gpa:"3.4",
        nationalId:"302153201463",
        address:"Mokkatam , Cairo , Egypt",
        date:"4-2-2002",
        department:"CS",
        phone:"0179524216",
        level:"3",
        status:"Active",
        gender:"Male",
        photosrc:""
    },
    {
        name:"Merna Ahmed",
        id :"20210448",
        email :"mernaahmed@gmail.com",
        gpa:"3.7",
        nationalId:"3021556545658",
        address:"Mokkatam , Cairo , Egypt",
        date:"8-9-2002",
        department:"DS",
        phone:"0124545172",
        level:"3",
        status:"Active",
        gender:"Female",
        photosrc:""
    },
    {
        name:"Abdelrhman Omar",
        id :"20210225",
        email :"abdelrhmanomar@gmail.com",
        gpa:"3.7",
        nationalId:"302153445258",
        address:"Mokkatam , Cairo , Egypt",
        date:"3-6-2002",
        department:"General",
        phone:"0124589172",
        level:"2",
        status:"Inactive",
        gender:"Male",
        photosrc:""
    }
];

let Students = JSON.stringify(student)
localStorage.setItem("Students" , Students);


console.log(x);
function goToPage(url) {
    window.location.href = url;
}
  