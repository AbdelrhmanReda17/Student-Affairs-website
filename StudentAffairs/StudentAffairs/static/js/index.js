window.onload = function() {
    var container = document.getElementById("Announcement-content"); 
    var sentences = [
      "The Office of Student Affairs is hosting a workshop on study skills and time management on [insert date]. All students are welcome to attend and learn valuable tips for staying organized and focused during the semester.",
      "The university's Counseling Center is offering a free stress management workshop for students on [insert date]. Attendees will learn effective techniques for managing stress and anxiety.",
      "The Career Services Center is hosting a virtual networking event for students and employers on Tuesday, May 4th at 4 PM EST. This event will provide students with an opportunity to connect with employers and learn about job and internship opportunities.",
      "The University of Delaware Student Affairs department will be hosting a virtual town hall on Wednesday, April 20th at 2 PM EST. This town hall will provide an opportunity for employees to hear from department leadership and ask questions about departmental initiatives and goals.",
      "The Student Wellness and Health Promotion team is excited to announce the launch of a new mental health awareness campaign. This campaign will include workshops, resources, and events designed to support the mental health and well-being of students. Stay tuned for more details!"
    ];
  
    for (var i = 0; i < sentences.length; i++) { 
        var sentence = sentences[i];
        var p = document.createElement("p");
        var text = document.createTextNode("- " + sentence); 
        p.appendChild(text);
        p.appendChild(document.createElement("br")); 
        container.appendChild(p); 
    }

    var container2 = document.getElementById("meeting-content"); 
    var sentences2 = ["Monday, April 18th at 10 AM EST: Student Affairs Leadership Team Meeting ",
    "Wednesday, April 20th at 2 PM EST: Virtual Town Hall for all Student Affairs Employees",
    "Thursday, April 21st at 1 PM EST: Diversity and Inclusion Committee Meeting",
    "Friday, April 22nd at 3 PM EST: Student Activities Programming Board Meeting",
    "Monday, April 25th at 11 AM EST: Student Activities Budget Committee Meeting",
    " Wednesday, April 27th at 10 AM EST: Counseling Center Staff Meeting",
    "Tuesday, May 3rd at 3 PM EST: Student Advocacy Center Team Meeting",
    "Friday, April 29th at 2 PM EST: Campus Recreation and Wellness Staff Meeting",
      
    ];
  
    for (var i = 0; i < sentences2.length; i++) { 
        var sentence = sentences2[i];
        var p = document.createElement("p");
        var text = document.createTextNode("- " + sentence);
        p.appendChild(text);
        p.appendChild(document.createElement("br")); 
        container2.appendChild(p); 
    }
    
};
function goToPage(url) {
    window.location.href = url;
}
  
