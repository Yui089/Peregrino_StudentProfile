# Peregrino Student Profile

A responsive Student Profile mobile application developed using **Apache Cordova, HTML, CSS, and JavaScript**. The application presents my profile information, educational background, interests, skills, projects, and contact information.

For **Activity 5**, the application was enhanced with an **Edit Profile** feature. This feature allows the user to modify profile information through a form. JavaScript is used for form handling, input validation, dynamic profile updates, Save and Cancel functions, and local data storage using `localStorage`.

---

# 1. Project Description

The Peregrino Student Profile is a responsive mobile application developed as part of my Information Technology coursework.

The application provides information about my personal profile, educational background, interests, technical skills, projects, and contact information. It contains five connected pages that can be accessed through the navigation menu.

For Activity 5, an Edit Profile feature was added to allow profile information to be changed dynamically. The user can edit the profile through a form, validate the information, save the changes, or cancel the editing process.

The application uses JavaScript to update the displayed profile information without manually changing the HTML source. It also uses `localStorage` to save and retrieve profile information when the application is opened again.

---

# 2. Application Pages

The application contains five main pages:

## Profile

The Profile page serves as the homepage of the Student Profile application.

It displays:

- Complete name
- Course
- Year level
- Short introduction
- About Me information
- Skills
- Navigation links
- Edit Profile button

The Profile page also contains the Edit Profile feature introduced in Activity 5. This allows the user to modify the profile information through an editing form.

## About

The About page provides additional information about the student.

It includes:

- Personal introduction
- Interests
- Educational background
- Career goals

This page gives users more information about my background, interests, and plans related to Information Technology.

## Skills

The Skills page presents the skills related to my Information Technology studies.

The page includes the following skills:

- Database Management
- Data Analysis
- SQL
- Web Development
- Data Visualization
- Problem Solving
- Computer and IT Fundamentals
- Responsive Design

Each skill is presented with a short description of its relevance to my studies and projects.

## Projects

The Projects page presents selected projects completed during my studies.

The page includes information about the projects, my role or contribution, and the technologies or tools used.

The projects presented include:

- Ember's Flight
- Front-End Challenge 2.0
- Pharmacy Inventory System
- Flight System Database

## Contact

The Contact page provides contact and professional profile information.

It includes:

- Email address
- GitHub profile
- LinkedIn profile
- Other relevant contact information

The page also contains a contact form interface.

---

# 3. Profile Editing

The Profile page includes an **Edit Profile** button that opens an editing form.

The following profile information can be modified:

- Full Name
- Course
- Year Level
- About Me
- Skills

The user can enter new information into the form and select **Save** to apply the changes.

After saving, the updated information is immediately displayed on the Profile page. The user does not need to manually edit the HTML source code.

The user can also select **Cancel** to close the editing form without saving changes. When Cancel is selected, the previously saved profile information remains unchanged.

---

# 4. JavaScript Functionality

JavaScript is used to provide the interactive features of the Student Profile application.

## Form Handling

JavaScript retrieves and processes the information entered into the Edit Profile form.

The form contains the following fields:

- Full Name
- Course
- Year Level
- About Me
- Skills

JavaScript is also used to place the current profile information into the form when the Edit Profile button is selected.

## Validation

JavaScript validates the required fields before allowing the profile information to be saved.

The following fields are required and cannot be empty:

- Full Name
- Course
- Year Level
- About Me

If a required field is empty, the application prevents the information from being saved and displays a validation message to the user.

The Skills field can contain multiple skills separated by commas.

## Profile Updates

After valid information is submitted, JavaScript updates the information displayed on the Profile page.

The updated information includes:

- Full Name
- Course
- Year Level
- About Me
- Skills

The profile is updated dynamically without manually changing the HTML source code.

## Save

When the user selects **Save**, the following process takes place:

1. JavaScript retrieves the values entered into the form.
2. The required fields are checked.
3. Validation is performed.
4. The updated profile information is saved using `localStorage`.
5. The Profile page is updated immediately.
6. The Edit Profile form is closed after the information is saved.

If any required field is empty, the Save process is stopped and a validation message is displayed.

## Cancel

When the user selects **Cancel**, the editing form is closed without saving the new information.

Any unsaved changes are discarded, and the previously saved profile information remains unchanged.

---

# 5. Local Data Storage

The application uses JavaScript `localStorage` to store and retrieve profile information.

The following information is stored:

- Full Name
- Course
- Year Level
- About Me
- Skills

When the application starts, JavaScript checks whether previously saved profile information exists in `localStorage`.

If saved information is available, the application retrieves it and displays it on the Profile page.

If no saved information exists, the application displays the default profile information.

Using `localStorage` allows the updated profile information to remain available after the application is closed and opened again.

The application can also retrieve the saved information during later visits without requiring the user to enter the information again.

---

# 6. Responsive Design

The Student Profile application is designed to remain responsive across different screen sizes:

- Desktop
- Tablet
- Mobile

CSS media queries and responsive layout techniques are used to adjust the appearance and arrangement of the application for different devices.

The application maintains consistent:

- Navigation
- Typography
- Spacing
- Colors
- Buttons
- Cards
- Form elements
- Page layout

The Edit Profile form is also designed to remain usable on smaller screens. Form fields and buttons adjust to the available screen width to improve readability and usability.

---

# 7. How to Run

## Requirements

The project requires the following tools:

- Node.js
- Apache Cordova
- Android Studio
- Android SDK
- Java JDK
- Android device or Android emulator
- Git
- GitHub account

## Step 1: Open the Project

Open PowerShell or a terminal and navigate to the Cordova project directory:

```powershell
cd C:\Users\Haian\Peregrino_Start
```

## Step 2: Prepare the Android Platform

Prepare the Android platform by running:

```powershell
cordova prepare android
```

## Step 3: Build the Application

Build the Android application by running:

```powershell
cordova build android
```

## Step 4: Connect an Android Device or Start an Emulator

To run the application on a physical Android device:

1. Enable Developer Options on the Android device.
2. Enable USB Debugging or Wireless Debugging.
3. Connect or pair the device with the computer.
4. Make sure the device is detected by the computer.

An Android emulator may also be used instead of a physical device.

## Step 5: Run the Application

Run the application using:

```powershell
cordova run android
```

The application should open on the connected Android device or emulator.

## Alternative Android Build Command

If the Cordova command cannot detect Gradle automatically, the Android project can be built using the Gradle wrapper from the Android platform directory:

```powershell
cd C:\Users\Haian\Peregrino_Start\platforms\android
.\gradlew.bat assembleDebug
```

---

# 8. Application Screenshots

The following screenshots document the main features and pages of the application.

## Student Profile

This screenshot shows the main Profile page, including the student's name, introduction, skills, navigation, and Edit Profile button.

<img width="959" height="500" alt="image" src="https://github.com/user-attachments/assets/38da1a38-821e-4072-8977-17dbe0cbde8b" />


## Edit Profile

This screenshot shows the Edit Profile form containing the fields for Full Name, Course, Year Level, About Me, and Skills.

<img width="956" height="500" alt="Edit Profile" src="https://github.com/user-attachments/assets/14b8b91b-fc76-4090-8731-1e17db1fcc80" />

## Updated Profile

This screenshot shows the Profile page after the information has been edited and saved successfully.

<img width="958" height="503" alt="Updated Profile" src="https://github.com/user-attachments/assets/f66816bf-3ba8-4220-838f-8ecf880d55f6" />

## Skills

This screenshot shows the Skills page containing the skills with ratings.

<img width="959" height="506" alt="Contact" src="https://github.com/user-attachments/assets/8994885e-d3cc-44b1-abba-d5f151e720fd" />

> **Note:** The screenshot files must be placed inside a folder named `screenshots` in the project repository. The filenames must match the filenames used above.

---

# GitHub Requirements and Submission

## Repository

Activity 5 continues using the same GitHub repository from Activities 2–4.

The repository name is:

```text
Peregrino_StudentProfile
```

The GitHub repository is:

```text
https://github.com/Yui089/Peregrino_StudentProfile
```

The repository must remain **public** so that the project can be accessed and checked.

A new repository was not created for Activity 5.

## Activity 5 Branch

The Activity 5 features were developed in the required branch:

```text
activity-5-profile-editing
```

The branch was created from the current `main` branch.

The required workflow is:

```text
main
  ↓
activity-5-profile-editing
  ↓
Development and Testing
  ↓
Merge into main
  ↓
Push updated main to GitHub
```

The Activity 5 branch must be kept after merging into `main`.

## Repository Contents

The repository contains or should contain the following:

- Complete Cordova project
- Profile page
- About page
- Skills page
- Projects page
- Contact page
- HTML files
- CSS files
- JavaScript files
- Cordova configuration files
- Activity 4 functionality
- Activity 5 Edit Profile functionality
- JavaScript validation
- `localStorage` functionality
- Updated `README.md`
- Application screenshots

## Activity 5 Testing

The application should be tested to verify the following:

- The Profile page loads correctly.
- The Edit Profile button opens the editing form.
- The existing profile information appears in the form.
- The Full Name field can be edited.
- The Course field can be edited.
- The Year Level field can be edited.
- The About Me field can be edited.
- The Skills field can be edited.
- The Save button updates the displayed profile.
- The Cancel button discards unsaved changes.
- Required fields cannot be left empty.
- Validation messages appear when required information is missing.
- Updated information is stored using `localStorage`.
- Saved information remains after closing and reopening the application.
- Multiple profile updates work correctly.
- All five pages can be accessed through the navigation menu.
- The application remains usable on desktop, tablet, and mobile screen sizes.

## Submission

The completed Activity 5 project must be pushed to the same public GitHub repository:

```text
https://github.com/Yui089/Peregrino_StudentProfile
```

The `activity-5-profile-editing` branch must be tested and merged into `main`.

The updated `main` branch must then be pushed to GitHub.

The `activity-5-profile-editing` branch must remain available after merging.

---

# Project Structure

```text
Peregrino_Start/
│
├── www/
│   ├── css/
│   │   └── index.css
│   │
│   ├── js/
│   │   └── index.js
│   │
│   └── student_profile/
│       ├── Homepage/
│       │   └── Index.html
│       │
│       ├── About/
│       │   └── About.html
│       │
│       ├── Skills/
│       │   └── Skills.html
│       │
│       ├── Projects/
│       │   └── Projects.html
│       │
│       └── Contacts/
│           └── Contacts.html
│
├── config.xml
├── package.json
└── README.md
```

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Apache Cordova
- Android
- `localStorage`
- Git
- GitHub
