# Student Affairs Website

The Student Affairs Project is a web application for managing student records and information. It allows administrators to view, create, update, and delete student records, as well as perform various operations related to student affairs.

## Features

- View a list of all students
- Add new students to the database
- Delete student records
- Change the status of students (active/inactive)
- Search for students based on different criteria
- Update student information (name, ID, GPA, email, etc.)
- View and manage student contact details

## Technologies Used

- Django: A high-level Python web framework for building web applications.
- HTML/CSS: Markup and styling languages for creating web pages.
- JavaScript: Programming language for adding interactivity to web pages.
- jQuery: JavaScript library for simplifying DOM manipulation and AJAX requests.
- Swal: JavaScript library for displaying beautiful alert messages.
- Bootstrap: CSS framework for responsive and mobile-first web development.

## Installation

1. Clone the repository:
  ```shell git clone <repository-url>```
2. Set up the database:
  ```shell python manage.py migrate ```
3. Start the development server:
  ```shell python manage.py runserver ```
4. Access the application at http://localhost:8000 in your web browser.

## Usage

1. Home page: which provides an overview of student statistics and important notifications.
2. Student List: Navigate to the "View All Student " section to view a list of all students. The list displays basic information such as student names, IDs, and current status (active/inactive).
3. Search: Use the search functionality to find specific students based on different criteria such as name, ID, department, or level. Enter the search keywords and click the "Search" button to get the filtered results.
4. Add New Student: To add a new student, go to the "Add New Student" section. Fill in the required details such as name, ID, GPA, email, and other relevant information. Click the "Save" button to add the student to the database.
5. Update Student Information: To update student information, navigate to the "View Active Students" section . Select the student whose profile you want to update from the dropdown list. Modify the desired fields such as name, ID, GPA, email, etc., and click the "Save" button to save the changes.
6. Change Student Status: To change the status of a student (active/inactive), go to the "View All Student Section" section. Select the student and choose the desired status option. Click the "Save" button to update the status.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please submit a GitHub issue or pull request.


