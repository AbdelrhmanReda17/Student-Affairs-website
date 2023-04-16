let student = [
    {
        name:"Ahmed Mohamed",
        id :"20210224",
        email :"ahmedmohammed@gmail.com",
        gpa:"3.4",
        nationalId:"30215320146311",
        address:"Mokkatam , Cairo , Egypt",
        date:"2002-04-02",
        department:"CS",
        phone:"01079524216",
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
        nationalId:"30215565456581",
        address:"Mokkatam , Cairo , Egypt",
        date:"2003-04-07",
        department:"DS",
        phone:"01245451721",
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
        nationalId:"30215344525831",
        address:"Mokkatam , Cairo , Egypt",
        date:"2002-12-03",
        department:"General",
        phone:"01245891725",
        level:"2",
        status:"Inactive",
        gender:"Male",
        photosrc:""
    } ,
    {
        name:"Hoda Mohammed Esmail",
        id :"20210443",
        email :"H.Mohammed@gmail.com",
        gpa:"3.53",
        nationalId:"30213478923458",
        address:"Helwan, Cairo , Egypt",
        date:"2002-10-22",
        department:"General",
        phone:"01060584674",
        level:"2",
        status:"Active",
        gender:"Female",
        photosrc:""
    },
    {
        name:"Maya Haytham omar",
        id :"20210453",
        email :"Mayaomar@gmail.com",
        gpa:"3.63",
        nationalId:"30213478973458",
        address:"Haram, Cairo , Egypt",
        date:"2003-09-01",
        department:"IS",
        phone:"01020594674",
        level:"3",
        status:"Inactive",
        gender:"Female",
        photosrc:""
    }
    ,
    {
        name:"Ammar Yasser Touny",
        id :"20210019",
        email :"AmmarTouny@gmail.com",
        gpa:"3.93",
        nationalId:"30213478908258",
        address:"Mayo, Cairo , Egypt",
        date:"2004-08-23",
        department:"General",
        phone:"01020591684",
        level:"1",
        status:"Active",
        gender:"Male",
        photosrc:""
    },
    {
        name:"Nada Hossam Ahmed",
        id :"20210674",
        email :"N.Hossam@gmail.com",
        gpa:"3.23",
        nationalId:"30213008908258",
        address:"Maadi, Cairo , Egypt",
        date:"2003-11-03",
        department:"General",
        phone:"01020501694",
        level:"2",
        status:"Active",
        gender:"Female",
        photosrc:""
    },
    {
        name:"Ezzalden Ahmed",
        id :"20210374",
        email :"Ezz_Ahmed@gmail.com",
        gpa:"3.43",
        nationalId:"30213090908258",
        address:"WaadiHoof, Cairo , Egypt",
        date:"2003-10-09",
        department:"General",
        phone:"01020501694",
        level:"3",
        status:"Active",
        gender:"Male",
        photosrc:""
    },
    {
        name:"Salma Mohammed Mohammed",
        id :"20210254",
        email :"S_mohammed@gmail.com",
        gpa:"3.80",
        nationalId:"30923090908258",
        address:"Toraalbalad, Cairo , Egypt",
        date:"2002-08-20",
        department:"General",
        phone:"01020501694",
        level:"2",
        status:"Active",
        gender:"Female",
        photosrc:""
    }
    ,
    {
        name:" Waleed Mohammed Mohammed",
        id :"20210294",
        email :"W_mohammed@gmail.com",
        gpa:"3.89",
        nationalId:"30329090908258",
        address:"Maadi, Cairo , Egypt",
        date:"2002-08-20",
        department:"DS",
        phone:"01020501694",
        level:"4",
        status:"Active",
        gender:"Male",
        photosrc:""
    }
    ,
    {
        name:" Dalida Mostafa Nady",
        id :"20210284",
        email :"D_Mostafa@gmail.com",
        gpa:"3.89",
        nationalId:"30329090908258",
        address:"Helwan, Cairo , Egypt",
        date:"2005-07-20",
        department:"General",
        phone:"01020501604",
        level:"1",
        status:"Active",
        gender:"Female",
        photosrc:""
    }
    ,
    {
        name:"Noor youssef Alaa",
        id :"20210434",
        email :"n_youssef@gmail.com",
        gpa:"2.89",
        nationalId:"30329090908208",
        address:"October, Cairo , Egypt",
        date:"2004-01-14",
        department:"General",
        phone:"01020501604",
        level:"1",
        status:"Active",
        gender:"Female",
        photosrc:""
    }
    ,
    {
        name:"Abdelrhman Yasser",
        id :"20210228",
        email :"abdelrhmanyasser@gmail.com",
        gpa:"2.1",
        nationalId:"30215344745812",
        address:"zayed, Cairo , Egypt",
        date:"2003-05-14",
        department:"General",
        phone:"01249890721",
        level:"2",
        status:"Active",
        gender:"Male",
        photosrc:""
    },

    {
        name: "Aisha Ahmed Hassan",
        id: "20220345",
        email: "aisha_hassan@yahoo.com",
        gpa: "3.76",
        nationalId: "27824913900819",
        address: "zayed, Cairo , Egypt",
        date: "2003-03-13",
        department: "IS",
        phone: "01009585723",
        level: "3",
        status: "Active",
        gender: "Female",
        photosrc: ""
    },{
        name: "Mariam Ahmed Mahmoud",
        id: "20240678",
        email: "mariam_mahmoud@gmail.com",
        gpa: "3.81",
        nationalId: "29304070901275",
        address: "Zamalek, Cairo, Egypt",
        date: "2005-06-28",
        department: "General",
        phone: "01012456789",
        level: "1",
        status: "Active",
        gender: "Female",
        photosrc: ""
    }
    
];

let Students = JSON.stringify(student)
localStorage.setItem("Students" , Students);


console.log(x);
function goToPage(url) {
    window.location.href = url;
}
  
