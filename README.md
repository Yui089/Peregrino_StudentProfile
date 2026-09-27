# Peregrino_StudentProfile

## 1. Project Description

This is my Student Profile application for BSIT. It started in earlier activities as a static, then a localStorage driven, multi page site (Profile, About, Skills, Projects, Contact). In Activity 7 I turned it into a database driven application. Instead of information living only on one device, it now lives in a Supabase (PostgreSQL) database, tied to a login account, so my profile follows me across devices and stays there after I log out and back in.

## 2. Application Pages

- **Profile (Homepage)** — my main landing page after login. Shows my photo, name, course, year level, a short introduction, and lets me open the Edit Profile form.
- **About** — my About Me text, interests, educational background, and goals, pulled from the database.
- **Skills** — my technical skills with star ratings, pulled from the database.
- **Projects** — a showcase of school projects I have built.
- **Contact** — my contact details.
- **Login** — the entry point of the app. This is where I sign in with an existing account, or register a new one. No profile page can be viewed without going through this page first.

## 3. Authentication

Login flow:

Login → Authentication → Valid credentials? → No: show error message → Yes: Student Profile

I use Supabase Auth for authentication (email and password). On the Login page:

- Signing in calls Supabase's `signInWithPassword`, which checks the email and password against the database and returns a session if they match.
- Registering calls `signUp`, which creates the account, then a database trigger automatically creates a matching profile row for that account.
- If credentials are wrong, or a required field is empty, an error message is shown on the Login page and access is denied.
- Every other page (Profile, About, Skills, Projects, Contact) checks for a valid session as soon as it loads. If there is no session, the page redirects back to Login before showing any profile data or letting me use Edit Profile.

## 4. Student Profile Management

Once logged in, I can:

- **View my profile** — the app loads my row from the database and fills in my name, course, year level, about me, interests, education, goals, skills, and photo.
- **Edit my information** — the Edit Profile form lets me change my introduction, name, course, year level, about me, interests, education, goals, and skills (with star ratings).
- **Save changes** — pressing Save Changes validates the form, then updates my row in the database. A success message appears, and the page updates immediately to show the new information.
- **Update my profile picture** — tapping my photo or the Change Profile Picture button opens the device camera through Cordova, and the captured photo is saved to my database row.
- **Log out** — the Log Out button ends my Supabase session and returns me to the Login page. From that point, my profile can only be viewed again by logging in.

## 5. Database Integration

**Database technology:** Supabase, which is PostgreSQL with a built in authentication system and auto generated API.

**profiles table**, one row per account, storing:

- Student ID
- Full name
- Course
- Year level
- Introduction
- About Me
- Interests
- Educational background
- Goals and aspirations
- Skills (stored as a list of skill name and star rating pairs)
- Organizations (stored as a list of organization name, description, and image paths)
- Profile picture (stored as the captured photo)
- Last updated timestamp

Each row's id matches the id of the account that owns it, which is how the app knows which profile belongs to which login.

## 6. API/Backend

Cordova Application → Supabase client library → Supabase API → PostgreSQL Database

I did not write a custom backend server. Supabase provides a hosted API in front of the database. The Cordova app talks to that API directly through the `supabase-js` library, using a public anon key. What each account is allowed to read or write is enforced on the database side by row level security policies, not by a server I run myself.

## 7. CRUD Operations

- **Create** — when a new account registers on the Login page, a database trigger creates the matching profile row automatically, seeded with starter values.
- **Read** — every page (Profile, About, Skills) reads the signed in account's row from the profiles table and displays it.
- **Update** — the Edit Profile form and the camera feature both update the signed in account's row: form fields through one update, and the photo through a separate update so editing text never overwrites the photo.
- **Delete** — the delete profile that deletes the entire account.

## 8. Camera Integration

The camera feature from Activity 6 is unchanged in how it is triggered (tapping the photo or the Change Profile Picture button opens the device camera through `cordova-plugin-camera`). What changed is where the photo goes afterward: instead of saving it to localStorage, the captured photo is now saved to the signed in account's row in the database, so it is available on any device that account logs in from.

## 9. Data Persistence

Update Profile → Save to Database → Logout → Login Again → Retrieve Updated Profile

Because profile data lives in Supabase rather than the browser's localStorage, it survives:

- Closing the app
- Restarting the app
- Logging out and logging back in, on the same or a different device

localStorage was used in earlier activities and only persisted on one browser or one device. The database now is the source of truth, so my information reliably comes back exactly as I left it.

## 10. Responsive Design

The layout uses a fluid grid with breakpoints for mobile, tablet (640px and up), and laptop (1024px and up) screens, so spacing, font sizes, and the profile photo frame all scale appropriately. On small screens, the profile header stacks the photo above the name and keeps the Edit Profile and Log Out buttons side by side rather than letting them wrap awkwardly.

## 11. Security

- Passwords are never stored as plain text. Supabase Auth hashes and manages passwords; my code never sees or stores a raw password.
- The key embedded in `supabase-client.js` is a public anon key, meant to be exposed in client code. It cannot bypass the database's row level security policies, so it does not grant access beyond what those policies allow.
- No database password, service role key, or other private credential is included in this repository.
- Row level security policies on the profiles table restrict every account to reading and writing only its own row, so one student's data cannot be read or changed by another student's session.

## 12. How to Run

1. Create a free Supabase project.
2. Open the SQL editor in Supabase and run `schema.sql` from this repository. This creates the profiles table, its policies, and the trigger that creates a profile row on registration.
3. In `js/supabase-client.js`, set `SUPABASE_URL` and `SUPABASE_ANON_KEY` to your own project's values.
4. Install project dependencies and Cordova platforms as needed (`cordova platform add android` or `cordova platform add ios`).
5. Run `cordova prepare` to sync the web files into the native project.
6. Build and run with `cordova run android` (or `ios`), or open the built project in Android Studio/Xcode and run it from there.
7. The app opens on the Login page. Register a new account or use a test account (see below).

## 13. Test Accounts

[Add a test account created specifically for grading, for example:]

- Email: `haiana@gmail.com`
- Password: `123456`

## 14. Application Screenshots

[Add screenshots here for:]

- Login page
  
  <img width="250" height="555" alt="f509e2b1-beda-416b-bcfc-1282d6cac5a7" src="https://github.com/user-attachments/assets/48044251-b59f-4b2f-b8e6-0c49122a4f57" />

- Student Profile
  
  <img width="250" height="555" alt="60359fcf-5144-4570-8786-9f04a3a633bd" src="https://github.com/user-attachments/assets/f1300719-410b-4c63-91af-8e9943c0bf07" />

- Edit Profile
  
  <img width="250" height="555" alt="0ad3d1b2-82ed-4828-88a1-d32411143bf8" src="https://github.com/user-attachments/assets/4d551f79-30aa-42d2-8dbf-295831959464" />

- Updated Profile
  
  <img width="250" height="555" alt="7f760db0-0c60-4387-80c8-709198f45d20" src="https://github.com/user-attachments/assets/c043a402-9336-4c7c-a87f-2c024a75034a" />

- Profile Picture/Camera

  <img width="250" height="555" alt="d6aa3c8d-b3d5-4dd2-bd00-a3ea6301ba39" src="https://github.com/user-attachments/assets/6ccd7ef0-f525-4131-af3c-6f236babc3fb" />

- Logout
  
 <img width="250" height="555" alt="f2c808e8-de35-413e-bca6-0748062abf1a" src="https://github.com/user-attachments/assets/6eb1e394-5711-439e-889b-7002071d7d9c" />

- A database view showing the profiles table (for example, the Supabase table editor)
  
  <img width="264" height="351" alt="image" src="https://github.com/user-attachments/assets/08ff0084-e36e-4205-a1bb-f0395f79d0d6" />
  <img width="959" height="236" alt="Screenshot 2026-09-27 155651" src="https://github.com/user-attachments/assets/a67bfc73-7fe8-4243-b18f-c1f40dee4e62" />

