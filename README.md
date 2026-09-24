<img width="2000" height="1200" alt="f65bb9d0-942c-455b-ac75-221ce96e7a63" src="https://github.com/user-attachments/assets/f00768ca-1c7c-463a-b198-95f27fd82f18" />
  # Peregrino — Student Profile

## 1. Project Description

Yana — Student Profile is a Cordova based mobile application that presents a student's personal information, skills, projects, and contact details in an organized and responsive interface.

The application also allows the student to edit profile information and change the profile picture using the device camera.

## 2. Application Pages

### Profile

The Profile page serves as the main page of the application. It displays the student's profile picture, name, introduction, and basic information. It also provides access to the Edit Profile and Change Profile Picture features.

### About

The About page provides additional information about the student, including their background, interests, and goals.

### Skills

The Skills page presents the student's technical and other relevant skills. It shows the areas that the student is currently learning and developing.

### Projects

The Projects page displays the student's completed and ongoing projects. Each project provides information about the project and the technologies or concepts used.

### Contact

The Contact page provides the student's contact information and ways to get in touch.

## 3. Profile Editing

The application includes an **Edit Profile** feature that allows the student to update information displayed on the Profile page.

The edited information is stored using the browser's **localStorage**. This allows the updated profile information to remain available when the application is reopened on the same device.

The Edit Profile feature provides **Save** and **Cancel** options. Save applies the changes, while Cancel returns to the previous information without saving the edits.

## 4. Camera Integration

The application uses the **Cordova Camera Plugin** to allow the student to change their profile picture using the device camera.

The process is:

**Change Profile Picture → Open Camera → Capture Image → Update Profile Picture**

When the user selects **Change Profile Picture**, the application opens the device camera through the Cordova Camera Plugin. After taking a picture and confirming it, the captured image is displayed as the new profile picture.

## 5. Device Feature Integration

Cordova is used because it allows a web based application using HTML, CSS, and JavaScript to access native device features.

For this project, Cordova provides access to the device camera through the `cordova-plugin-camera` plugin. This allows the application to interact with the camera while keeping the main application interface built with web technologies.

## 6. Image Handling

After an image is captured, the camera plugin returns the image data to the application.

The captured image is assigned to the profile image element so that it immediately replaces the previous profile picture.

The image data is also stored in `localStorage` as the profile picture data. When the Profile page is loaded again, the saved image data is retrieved and displayed, allowing the updated profile picture to persist between application sessions.

## 7. Error Handling

The application includes basic error handling for different camera situations.

### Camera Permission Denial

If the application cannot access the camera because permission was denied, an error message is displayed to inform the user that the camera could not be accessed.

### Camera Cancellation

If the user opens the camera but cancels without capturing an image, the application does not replace the existing profile picture.

### Camera Errors

If another camera error occurs, the application displays a message informing the user that the camera could not be accessed and that they can try again.

## 8. Responsive Design

The application uses responsive design techniques so that its interface can adjust to different screen sizes.

The application is designed to remain usable across:

- **Desktop** — Provides a wider layout for larger screens.
  
  <img width="559" height="317" alt="Screenshot 2026-09-25 021058" src="https://github.com/user-attachments/assets/1d3ad974-5d62-4a5a-8e01-403130027b48" />

- **Tablet** — Adjusts the layout and spacing for medium sized screens.
 <img width="559" height="317" alt="ef98031e-3a54-4559-a447-78f7dc9ae8f8" src="https://github.com/user-attachments/assets/c4db2841-94fc-4303-9ab8-1575abf41c79" />


- **Mobile** — Uses a compact layout suitable for smaller device screens.
 <img width="222" height="548" alt="f66771cd-68fd-4c95-ba77-7e466acb22b8" src="https://github.com/user-attachments/assets/93d4f0ad-40d0-4101-81ac-a1f4b4905e4f" />



This allows the pages and profile features to remain accessible regardless of the device being used.

## 9. How to Run

### Prerequisites

Install the following:

- Node.js and npm
- Apache Cordova
- Android Studio
- Android SDK
- Java JDK
- Android device or Android emulator

### Install Dependencies

Clone the project repository and open the project folder in a terminal.

```bash
git clone https://github.com/Yui089/Peregrino_StudentProfile.git
cd Peregrino_Start
- **Tablet** — Adjusts the layout and spacing for medium sized screens.
- **Mobile** — Uses a compact layout suitable for smaller device screens.

This allows the pages and profile features to remain accessible regardless of the device being used.

## 9. How to Run

### Prerequisites

Install the following:

- Node.js and npm
- Apache Cordova
- Android Studio
- Android SDK
- Java JDK
- Android device or Android emulator

### Install Dependencies

Clone the project repository and open the project folder in a terminal.

```bash
git clone https://github.com/Yui089/Peregrino_StudentProfile.git
cd Peregrino_Start

## 10. Screenshots

Before:
<img width="559" height="317" alt="ef98031e-3a54-4559-a447-78f7dc9ae8f8" src="https://github.com/user-attachments/assets/ad2ace5e-707b-4b43-84ea-83f2e4b76f05" />

Camera:
<img width="559" height="317" alt="f65bb9d0-942c-455b-ac75-221ce96e7a63" src="https://github.com/user-attachments/assets/5d8e19bf-5285-48e4-bb48-dc2a3bed570c" />

After:
<img width="559" height="317" alt="091dfa07-b121-4e99-8217-e50d4e3c3730" src="https://github.com/user-attachments/assets/dc3698fc-76c7-4be6-af1b-594f00da5b88" />
