document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     NAVIGATION
  ====================================================== */

  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {

    link.addEventListener('click', () => {

      navLinks.forEach(l => {
        l.classList.remove('active');
      });

      link.classList.add('active');

    });

  });


  /* =====================================================
     PROFILE PHOTO FALLBACK
  ====================================================== */

  const avatarWrap = document.getElementById('avatarWrap');
  const profileImg = document.getElementById('profileImg');

  if (profileImg && avatarWrap) {

    profileImg.addEventListener('error', () => {

      profileImg.style.display = 'none';
      avatarWrap.classList.add('no-photo');

    });

  }


  /* =====================================================
     DEFAULT PROFILE INFORMATION
  ====================================================== */

  const defaultProfile = {

    intro:
      '"He who plants a tree plants hope."\n\nWelcome to my little corner of the internet, where school projects, experiments, and ideas come together. Take a look around to see what I\'ve learned, what I\'ve built, and where I\'m headed next.\n\nMy time in IT has taken me through more than just programming. I\'ve explored web development, databases, networking, and mobile applications, each giving me a different perspective on what technology can do. Some projects have been smooth, while others have involved a lot of "why isn\'t this working?" moments.\n\nThis website brings those pieces together. You\'ll find a little bit of my work, the skills I\'m developing, and the direction I\'m exploring as I continue building my place in the world of IT.',

    fullName: 'Haiana Peregrino',

    course: 'Information Technology',

    /*
     * Change this to your actual year level if necessary.
     */
    yearLevel: '3rd Year',

    about:
      'I am a student of Information Technology whose interest in the field developed from a curiosity about how technology functions and how it can be applied to solve everyday problems. Throughout my studies, I have been introduced to web development, databases, networking, programming, and mobile application development.',

    skills:
      'Database Management, Data Analysis, SQL, Web Development, Data Visualization, Problem Solving, Computer & IT Fundamentals, Responsive Design'

  };


  /* =====================================================
     GET SAVED PROFILE
  ====================================================== */

  function getProfile() {

    const savedProfile = localStorage.getItem('studentProfileData');

    if (!savedProfile) {

      return defaultProfile;

    }

    try {

      const parsedProfile = JSON.parse(savedProfile);

      return {
        ...defaultProfile,
        ...parsedProfile
      };

    } catch (error) {

      console.error('Unable to read saved profile:', error);

      return defaultProfile;

    }

  }


  /* =====================================================
     DISPLAY PROFILE INFORMATION
  ====================================================== */

  function displayProfile(profile) {

    const profileIntro =
      document.getElementById('profileIntro');

    const profileName =
      document.getElementById('profileName');

    const profileCourseYear =
      document.getElementById('profileCourseYear');

    const profileAbout =
      document.getElementById('profileAbout');

    const profileSkills =
      document.getElementById('profileSkills');


    /* ---------- INTRODUCTION ---------- */

    if (profileIntro) {

      profileIntro.textContent =
        profile.intro;

    }


    /* ---------- NAME ---------- */

    if (profileName) {

      profileName.textContent = profile.fullName;

    }


    /* ---------- COURSE + YEAR ---------- */

    if (profileCourseYear) {

      profileCourseYear.textContent =
        `${profile.course} · ${profile.yearLevel} · Xavier University — Ateneo de Cagayan`;

    }


    /* ---------- ABOUT ---------- */

    if (profileAbout) {

      profileAbout.textContent =
        profile.about;

    }


    /* ---------- SKILLS ---------- */

    if (profileSkills) {

      profileSkills.innerHTML = '';

      const skillsArray =
        profile.skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill !== '');


      skillsArray.forEach(skill => {

        const skillTag =
          document.createElement('span');

        skillTag.className = 'tag';

        skillTag.textContent = skill;

        profileSkills.appendChild(skillTag);

      });

    }

  }


  /* =====================================================
     EDIT PROFILE ELEMENTS
  ====================================================== */

  const editProfileBtn =
    document.getElementById('editProfileBtn');

  const editProfileSection =
    document.getElementById('editProfileSection');

  const editProfileForm =
    document.getElementById('editProfileForm');

  const cancelEditBtn =
    document.getElementById('cancelEditBtn');

  const editProfileMessage =
    document.getElementById('editProfileMessage');


  const editIntro =
    document.getElementById('editIntro');

  const editFullName =
    document.getElementById('editFullName');

  const editCourse =
    document.getElementById('editCourse');

  const editYearLevel =
    document.getElementById('editYearLevel');

  const editAbout =
    document.getElementById('editAbout');

  const editSkills =
    document.getElementById('editSkills');


  /* =====================================================
     LOAD PROFILE
  ====================================================== */

  let currentProfile = getProfile();

  displayProfile(currentProfile);


  /* =====================================================
     PUT CURRENT INFORMATION INTO FORM
  ====================================================== */

  function fillEditForm(profile) {

    if (editIntro) {
      editIntro.value = profile.intro;
    }

    if (editFullName) {
      editFullName.value = profile.fullName;
    }

    if (editCourse) {
      editCourse.value = profile.course;
    }

    if (editYearLevel) {
      editYearLevel.value = profile.yearLevel;
    }

    if (editAbout) {
      editAbout.value = profile.about;
    }

    if (editSkills) {
      editSkills.value = profile.skills;
    }

  }


  /* =====================================================
     OPEN EDIT PROFILE
  ====================================================== */

  if (editProfileBtn && editProfileSection) {

    editProfileBtn.addEventListener('click', () => {

      fillEditForm(currentProfile);

      if (editProfileMessage) {
        editProfileMessage.textContent = '';
        editProfileMessage.className = 'form-message';
      }

      editProfileSection.hidden = false;

      editProfileSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    });

  }


  /* =====================================================
     CANCEL EDIT
  ====================================================== */

  if (cancelEditBtn && editProfileSection) {

    cancelEditBtn.addEventListener('click', () => {

      /*
       * Refill the form with the saved/current information.
       * Nothing is written to localStorage.
       */

      fillEditForm(currentProfile);

      if (editProfileMessage) {

        editProfileMessage.textContent = '';

        editProfileMessage.className =
          'form-message';

      }

      editProfileSection.hidden = true;

    });

  }


  /* =====================================================
     SAVE PROFILE
  ====================================================== */

  if (editProfileForm) {

    editProfileForm.addEventListener('submit', event => {

      event.preventDefault();


      /* ---------- GET FORM VALUES ---------- */

      const intro =
        editIntro.value.trim();

      const fullName =
        editFullName.value.trim();

      const course =
        editCourse.value.trim();

      const yearLevel =
        editYearLevel.value.trim();

      const about =
        editAbout.value.trim();

      const skills =
        editSkills.value.trim();


      /* =================================================
         VALIDATION
      ================================================= */

      if (!fullName) {

        showMessage(
          'Please enter your full name.',
          'error'
        );

        editFullName.focus();

        return;

      }


      if (!course) {

        showMessage(
          'Please enter your course.',
          'error'
        );

        editCourse.focus();

        return;

      }


      if (!yearLevel) {

        showMessage(
          'Please enter your year level.',
          'error'
        );

        editYearLevel.focus();

        return;

      }


      if (!about) {

        showMessage(
          'Please enter something in About Me.',
          'error'
        );

        editAbout.focus();

        return;

      }


      /* =================================================
         CREATE UPDATED PROFILE
      ================================================= */

      const updatedProfile = {

        intro: intro,

        fullName: fullName,

        course: course,

        yearLevel: yearLevel,

        about: about,

        skills: skills

      };


      /* =================================================
         SAVE TO LOCAL STORAGE
      ================================================= */

      try {

        localStorage.setItem(
          'studentProfileData',
          JSON.stringify(updatedProfile)
        );

      } catch (error) {

        console.error(
          'Unable to save profile:',
          error
        );

        showMessage(
          'The profile could not be saved. Please try again.',
          'error'
        );

        return;

      }


      /* =================================================
         UPDATE CURRENT PROFILE
      ================================================= */

      currentProfile = updatedProfile;

      displayProfile(currentProfile);


      /* =================================================
         SUCCESS MESSAGE
      ================================================= */

      showMessage(
        'Profile saved successfully!',
        'success'
      );


      /* =================================================
         CLOSE EDIT FORM
      ================================================= */

      setTimeout(() => {

        if (editProfileSection) {

          editProfileSection.hidden = true;

        }

      }, 700);

    });

  }


  /* =====================================================
     FORM MESSAGE FUNCTION
  ====================================================== */

  function showMessage(message, type) {

    if (!editProfileMessage) {
      return;
    }

    editProfileMessage.textContent = message;

    editProfileMessage.className =
      `form-message ${type}`;

  }

});