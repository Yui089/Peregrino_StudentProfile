# Student Profile — Multi-Page Application

## 1. Project Description

This is a personal Student Profile web application built with HTML and CSS. It was originally developed as a single responsive page (Activity 3) and has been expanded into a five-page multi-page application for this activity. The site presents an overview of who I am as an IT student, including my background, technical skills, project portfolio, and contact information, all connected through a consistent navigation menu and visual design.

## 2. Application Pages

**Profile (Homepage)** — `Homepage/Index.html`
Serves as the entry point to the application. Introduces me with a short greeting and tagline, gives a quick overview of what the site contains, highlights a couple of featured projects, and gives a brief look at my organizational involvement before pointing the visitor toward the other pages.

**About** — `About/About.html`
Provides a more detailed personal introduction, including my interests, educational background, and career goals.

**Skills** — `Skills/Skills.html`
Lists my technical skills and areas of expertise, each with a short description of my experience or comfort level with it.

**Projects** — `Projects/Projects.html`
Showcases the projects I have worked on, including a description, my role or contribution, the tools and technologies used, and links to the source code or live version of each project.

**Contact** — `Contacts/Contacts.html`
Lists the ways to reach me, including email and GitHub, along with a contact form layout.

## 3. Navigation

Navigation between pages is implemented using standard HTML `<a href="...">` links — no JavaScript is used for navigation. Every page shares the same navigation bar (Profile, About, Skills, Projects, Contact), and the link for the page currently being viewed is visually highlighted so the user always knows where they are. Because "Profile" is always present in the navigation bar, the user can return to the homepage from anywhere in the application at any time.

## 4. Responsive Design

The application uses CSS media queries to adapt the layout across three screen sizes:

- **Mobile (default styles):** Single-column layout, a condensed navigation bar sized to fit all five tabs on one line, and a smaller profile photo and heading size to fit narrow screens.
- **Tablet (`min-width: 640px`):** The header switches to a horizontal layout (photo beside the name), navigation and content padding increase, and multi-item sections such as Skills and Projects gain more breathing room.
- **Desktop/Laptop (`min-width: 1024px`):** Further increases in spacing, type size, and photo size, along with wider multi-column layouts for content-heavy sections like Projects.

Flexible, percentage-based widths and constrained image sizing are used throughout so that content reflows cleanly at every size without causing horizontal scrolling, overlapping elements, or cut-off text.

### Laptop View
<img src="https://github.com/user-attachments/assets/6315dbf1-8c04-4782-a6db-1fd5f05a931a" width="700">

### Tablet View
<img alt="f53d4588-b737-47a4-8c04-2ac85cfdd95e" src="https://github.com/user-attachments/assets/6e69bc8e-5f0b-4579-8f32-c82bcf72b3fa" width="450">

### Mobile View
<img alt="c38ac71b-9e11-4a9f-8f4c-ce17263bb030" src="https://github.com/user-attachments/assets/06f53d12-1134-4c7e-a788-43e363061f53" width="250">

## 5. UI/UX Principles Applied

- **Consistency:** Every page uses the same color palette, typography (serif headings, monospace labels, sans-serif body text), header, navigation bar, and footer, so the application feels like one cohesive site rather than five separate pages.
- **Visual Hierarchy:** Section labels and heading sizes distinguish primary content (page titles, project names) from supporting content (descriptions, tags), and related information is grouped into clearly bordered cards.
- **Usability:** The persistent navigation bar with an active-page indicator makes it clear where the user is and where they can go next.
- **Readability:** Comfortable line height, adequate color contrast, and font sizes that scale with screen size keep text legible at any device width.
- **Accessibility:** Images include descriptive `alt` text, headings follow a logical order, and interactive elements (links, buttons) are sized for easy tapping and clicking.

## 6. How to Run

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Install the Apache Cordova CLI globally:
   ```
   npm install -g cordova
   ```
3. Clone this repository:
   ```
   git clone https://github.com/<your-username>/<LastName>_StudentProfile.git
   ```
4. Navigate into the project folder:
   ```
   cd <LastName>_StudentProfile
   ```
5. Add the Android platform (if not already added):
   ```
   cordova platform add android
   ```
6. Build the application:
   ```
   cordova build android
   ```
7. Run the application on an emulator or connected device:
   ```
   cordova emulate android
   ```
   or
   ```
   cordova run android
   ```

The application starts on the Profile (Homepage) page and can be navigated from there using the tabs at the top of the screen.

## 7. Application Screenshots

### Profile
<img alt="c38ac71b-9e11-4a9f-8f4c-ce17263bb030" src="https://github.com/user-attachments/assets/eaff4a21-21bd-4504-aa57-076a1095e61f" width="250">

### About
<img  alt="345c1aca-daf4-4a4a-99ca-64e1a978c4ce" src="https://github.com/user-attachments/assets/1619d604-b2d1-4c80-9afa-89ddb9b77453"  width="250">

### Skills
<img alt="e740af44-9bb7-4235-a7f4-d638b8dfc077" src="https://github.com/user-attachments/assets/09c1f579-0ed3-44ba-91f1-c44ede66f52c" width="250">

### Projects
<img alt="42292d31-5d60-4ec0-9959-ef4133bf6c88" src="https://github.com/user-attachments/assets/d3cd7e08-9a48-472a-bb24-16a7896ebc2c"  width="250">

### Contact
<img alt="f9ed06db-2040-4103-a36b-ac7cd32c06c9" src="https://github.com/user-attachments/assets/c423447e-1a1d-4d15-b417-838b2cab4d55" width="250">
