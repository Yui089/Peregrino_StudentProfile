document.addEventListener('DOMContentLoaded', async () => {

  /* =====================================================
     1. DEFAULT PROFILE FALLBACK DATA
  ====================================================== */
  const defaultProfile = {
    intro:
      '"He who plants a tree plants hope."\n\nWelcome to my little corner of the internet, where school projects, experiments, and ideas come together. Take a look around to see what I\'ve learned, what I\'ve built, and where I\'m headed next.\n\nMy time in IT has taken me through more than just programming. I\'ve explored web development, databases, networking, and mobile applications, each giving me a different perspective on what technology can do. Some projects have been smooth, while others have involved a lot of "why isn\'t this working?" moments.\n\nThis website brings those pieces together. You\'ll find a little bit of my work, the skills I\'m developing, and the direction I\'m exploring as I continue building my place in the world of IT.',
    fullName: 'Haiana Peregrino',
    course: 'Information Technology',
    yearLevel: '3rd Year',
    about:
      'I am a student of Information Technology whose interest in the field developed from a curiosity about how technology functions and how it can be applied to solve everyday problems. Throughout my studies, I have been introduced to web development, databases, networking, programming, and mobile application development.',
    interests:
      'Web Development — Working with HTML, CSS, and JavaScript to construct organized and responsive interfaces.\n\nDatabases — Studying MySQL and the methods by which information is stored, organized, and retrieved.\n\nUser Interface and Design — Attention to layout, spacing, consistency, and the overall experience of the user.\n\nNetworking — A developing understanding of how devices and networks communicate, which has clarified the infrastructure supporting the applications in common use.\n\nLearning Through Projects — A preference for acquiring knowledge through practical construction and the examination of how individual components function together.',
    education:
      'Bachelor of Science in Information Technology — Currently Pursuing\nA candidate for the degree of Bachelor of Science in Information Technology, with coursework encompassing programming, database management, networking, web development, mobile applications, and related areas of the discipline.\n\nSenior High School — Xavier University — Ateneo de Cagayan · 2022–2024\nCompleted a period of work immersion at A Brown Company Inc.',
    goals:
      'A professional objective of pursuing a career as a Data Analyst.',
    skills: [
      { name: 'Database Management', rating: 4 },
      { name: 'Data Analysis', rating: 3 },
      { name: 'SQL', rating: 4 },
      { name: 'Web Development', rating: 4 },
      { name: 'Data Visualization', rating: 3 },
      { name: 'Problem Solving', rating: 4 },
      { name: 'Computer & IT Fundamentals', rating: 4 },
      { name: 'Responsive Design', rating: 3 }
    ],
    orgs: [
      {
        name: 'Ateneo Red Cross Youth (ARCY)',
        description:
          'A member of the Ateneo Red Cross Youth, taking part in campus outreach and volunteer initiatives that support first aid awareness and community service.',
        images: '../../img/arcy1.jpg, ../../img/arcy2.jpg, ../../img/arcy3.jpg'
      },
      {
        name: 'Xavier Circle of Information Technology Students (XCITeS)',
        description:
          'Treasurer for XCITeS, our student organization for computer enthusiasts, handling budgeting and liquidation reports for the org\'s projects and events.',
        images: '../../img/org1.jpg, ../../img/org2.jpg, ../../img/org3.jpg'
      }
    ]
  };

  /* =====================================================
     2. HELPER FUNCTIONS & RENDERING
  ====================================================== */
  function starsForRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? '★' : '☆';
    }
    return stars;
  }

  function displayProfile(profile) {
    const profileIntro = document.getElementById('profileIntro');
    const profileName = document.getElementById('profileName');
    const profileCourseYear = document.getElementById('profileCourseYear');
    const profileAbout = document.getElementById('profileAbout');
    const profileInterests = document.getElementById('profileInterests');
    const profileEducation = document.getElementById('profileEducation');
    const profileGoals = document.getElementById('profileGoals');
    const profileSkills = document.getElementById('profileSkills');
    const profileSkillsList = document.getElementById('profileSkillsList');
    const profileOrgsList = document.getElementById('profileOrgsList');
    const profileImg = document.getElementById('profileImg');

    if (profile.profilePicture && profileImg) {
      profileImg.src = profile.profilePicture;
    }

    if (profileIntro) profileIntro.textContent = profile.intro;
    if (profileName) profileName.textContent = profile.fullName;

    if (profileCourseYear) {
      profileCourseYear.textContent =
        `${profile.course} · ${profile.yearLevel} · Xavier University — Ateneo de Cagayan`;
    }

    if (profileAbout) profileAbout.textContent = profile.about;
    if (profileInterests) profileInterests.textContent = profile.interests;
    if (profileEducation) profileEducation.textContent = profile.education;
    if (profileGoals) profileGoals.textContent = profile.goals;

    /* SKILLS: Tag List */
    if (profileSkills) {
      profileSkills.innerHTML = '';
      (profile.skills || []).forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'tag';
        skillTag.textContent = typeof skill === 'string' ? skill : skill.name;
        profileSkills.appendChild(skillTag);
      });
    }

    /* SKILLS: Detailed Star List */
    if (profileSkillsList) {
      profileSkillsList.innerHTML = '';
      (profile.skills || []).forEach(skill => {
        const row = document.createElement('div');
        row.className = 'skill';

        const check = document.createElement('span');
        check.className = 'skill-check';
        check.textContent = '✓';

        const body = document.createElement('div');
        body.className = 'skill-body';

        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = typeof skill === 'string' ? skill : skill.name;

        const stars = document.createElement('span');
        stars.className = 'star-rating';
        stars.textContent = starsForRating(skill.rating || 3);

        body.appendChild(name);
        body.appendChild(stars);
        row.appendChild(check);
        row.appendChild(body);
        profileSkillsList.appendChild(row);
      });
    }

    /* ORGANIZATIONS */
    if (profileOrgsList) {
      profileOrgsList.innerHTML = '';
      (profile.orgs || []).forEach(org => {
        const article = document.createElement('article');
        article.className = 'org';

        const h3 = document.createElement('h3');
        h3.textContent = org.name;

        const p = document.createElement('p');
        p.textContent = org.description;

        article.appendChild(h3);
        article.appendChild(p);

        if (org.images && org.images.trim() !== '') {
          const gallery = document.createElement('div');
          gallery.className = 'org-gallery';

          const imageList = org.images.split(',').map(img => img.trim());
          imageList.forEach(imgSrc => {
            if (imgSrc) {
              const img = document.createElement('img');
              img.src = imgSrc;
              img.alt = `${org.name} photo`;
              gallery.appendChild(img);
            }
          });
          article.appendChild(gallery);
        }
        profileOrgsList.appendChild(article);
      });
    }
  }

  /* =====================================================
     3. SKILLS EDITOR (STAR PICKER & ADD/REMOVE)
  ====================================================== */
  const skillsEditor = document.getElementById('skillsEditor');
  const addSkillBtn = document.getElementById('addSkillBtn');

  function createSkillRow(name, rating) {
    const row = document.createElement('div');
    row.className = 'skill-edit-row';
    row.dataset.rating = String(rating || 0);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'skill-name-input';
    nameInput.placeholder = 'e.g. Web Development';
    nameInput.value = name || '';

    row.appendChild(nameInput);

    const starPicker = document.createElement('div');
    starPicker.className = 'star-picker';

    for (let i = 1; i <= 5; i++) {
      const starBtn = document.createElement('button');
      starBtn.type = 'button';
      starBtn.className = 'star';
      starBtn.dataset.value = String(i);
      starBtn.textContent = '★';

      starBtn.addEventListener('click', () => {
        row.dataset.rating = String(i);
        updateStarPickerDisplay(starPicker, i);
      });
      starPicker.appendChild(starBtn);
    }

    updateStarPickerDisplay(starPicker, rating || 0);
    row.appendChild(starPicker);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-skill-btn';
    removeBtn.textContent = '✕';

    removeBtn.addEventListener('click', () => row.remove());
    row.appendChild(removeBtn);

    return row;
  }

  function updateStarPickerDisplay(starPicker, rating) {
    const stars = starPicker.querySelectorAll('.star');
    stars.forEach(starBtn => {
      const value = Number(starBtn.dataset.value);
      if (value <= rating) {
        starBtn.classList.add('filled');
      } else {
        starBtn.classList.remove('filled');
      }
    });
  }

  function fillSkillsEditor(skills) {
    if (!skillsEditor) return;
    skillsEditor.innerHTML = '';
    (skills || []).forEach(skill => {
      skillsEditor.appendChild(createSkillRow(skill.name, skill.rating));
    });
  }

  if (addSkillBtn && skillsEditor) {
    addSkillBtn.addEventListener('click', () => {
      const row = createSkillRow('', 3);
      skillsEditor.appendChild(row);
      const newInput = row.querySelector('.skill-name-input');
      if (newInput) newInput.focus();
    });
  }

  function collectSkillsFromEditor() {
    if (!skillsEditor) return [];
    const rows = skillsEditor.querySelectorAll('.skill-edit-row');
    const skills = [];

    rows.forEach(row => {
      const nameInput = row.querySelector('.skill-name-input');
      const name = nameInput ? nameInput.value.trim() : '';
      const rating = Number(row.dataset.rating) || 0;

      if (name !== '') {
        skills.push({ name, rating });
      }
    });

    return skills;
  }

  /* =====================================================
     4. ORGANIZATIONS EDITOR
  ====================================================== */
  const orgsEditor = document.getElementById('orgsEditor');
  const addOrgBtn = document.getElementById('addOrgBtn');

  function createOrgRow(name = '', description = '', images = '') {
    const card = document.createElement('div');
    card.className = 'org-edit-card';

    card.innerHTML = `
      <div class="org-edit-header">
        <label>Organization Name</label>
        <button type="button" class="remove-skill-btn remove-org-btn" aria-label="Remove organization">✕</button>
      </div>
      <input type="text" class="org-name-input" value="${name}" placeholder="e.g. Ateneo Red Cross Youth (ARCY)">
      
      <label style="margin-top: 10px;">Description</label>
      <textarea class="org-desc-input" rows="3" placeholder="Describe your involvement or responsibilities...">${description}</textarea>
      
      <label style="margin-top: 10px;">Image URLs / Paths (comma-separated)</label>
      <input type="text" class="org-images-input" value="${images}" placeholder="../../img/org1.jpg, ../../img/org2.jpg">
    `;

    card.querySelector('.remove-org-btn').addEventListener('click', () => card.remove());
    return card;
  }

  function fillOrgsEditor(orgs) {
    if (!orgsEditor) return;
    orgsEditor.innerHTML = '';
    (orgs || []).forEach(org => {
      orgsEditor.appendChild(createOrgRow(org.name, org.description, org.images));
    });
  }

  if (addOrgBtn && orgsEditor) {
    addOrgBtn.addEventListener('click', () => {
      const row = createOrgRow('', '', '');
      orgsEditor.appendChild(row);
      const input = row.querySelector('.org-name-input');
      if (input) input.focus();
    });
  }

  function collectOrgsFromEditor() {
    if (!orgsEditor) return [];
    const rows = orgsEditor.querySelectorAll('.org-edit-card');
    const orgs = [];

    rows.forEach(row => {
      const name = row.querySelector('.org-name-input').value.trim();
      const description = row.querySelector('.org-desc-input').value.trim();
      const images = row.querySelector('.org-images-input').value.trim();

      if (name !== '') {
        orgs.push({ name, description, images });
      }
    });

    return orgs;
  }

  /* =====================================================
     5. FORM DOM ELEMENTS & EDIT TOGGLE LISTENERS
  ====================================================== */
  const editProfileBtn = document.getElementById('editProfileBtn');
  const editProfileSection = document.getElementById('editProfileSection');
  const editProfileForm = document.getElementById('editProfileForm');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const editProfileMessage = document.getElementById('editProfileMessage');

  const editIntro = document.getElementById('editIntro');
  const editFullName = document.getElementById('editFullName');
  const editCourse = document.getElementById('editCourse');
  const editYearLevel = document.getElementById('editYearLevel');
  const editAbout = document.getElementById('editAbout');
  const editInterests = document.getElementById('editInterests');
  const editEducation = document.getElementById('editEducation');
  const editGoals = document.getElementById('editGoals');

  let currentProfile = defaultProfile;

  function fillEditForm(profile) {
    if (editIntro) editIntro.value = profile.intro || '';
    if (editFullName) editFullName.value = profile.fullName || '';
    if (editCourse) editCourse.value = profile.course || '';
    if (editYearLevel) editYearLevel.value = profile.yearLevel || '';
    if (editAbout) editAbout.value = profile.about || '';
    if (editInterests) editInterests.value = profile.interests || '';
    if (editEducation) editEducation.value = profile.education || '';
    if (editGoals) editGoals.value = profile.goals || '';

    fillSkillsEditor(profile.skills);
    fillOrgsEditor(profile.orgs);
  }

  if (editProfileBtn && editProfileSection) {
    editProfileBtn.addEventListener('click', () => {
      fillEditForm(currentProfile);
      if (editProfileMessage) {
        editProfileMessage.textContent = '';
        editProfileMessage.className = 'form-message';
      }
      editProfileSection.removeAttribute('hidden');
      editProfileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (cancelEditBtn && editProfileSection) {
    cancelEditBtn.addEventListener('click', () => {
      editProfileSection.setAttribute('hidden', 'true');
    });
  }

  /* =====================================================
     6. AUTH & DATABASE DATA FETCHING
  ====================================================== */
  let user = null;

  try {
    const sessionResponse = await supabase.auth.getUser();
    user = sessionResponse.data?.user;
  } catch (err) {
    console.warn('Supabase auth not initialized or offline. Using default profile mode.');
  }

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && data) {
      currentProfile = {
        fullName: data.full_name || defaultProfile.fullName,
        course: data.course || defaultProfile.course,
        yearLevel: data.year_level || defaultProfile.yearLevel,
        intro: data.intro || defaultProfile.intro,
        about: data.about || defaultProfile.about,
        interests: data.interests || defaultProfile.interests,
        education: data.education || defaultProfile.education,
        goals: data.goals || defaultProfile.goals,
        skills: Array.isArray(data.skills) && data.skills.length > 0 ? data.skills : defaultProfile.skills,
        orgs: Array.isArray(data.orgs) && data.orgs.length > 0 ? data.orgs : defaultProfile.orgs,
        profilePicture: data.profile_picture || null
      };
    }
  }

  displayProfile(currentProfile);

  /* =====================================================
     7. SAVE FORM SUBMISSION & VALIDATION
  ====================================================== */
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', async event => {
      event.preventDefault();

      const intro = editIntro ? editIntro.value.trim() : '';
      const fullName = editFullName ? editFullName.value.trim() : '';
      const course = editCourse ? editCourse.value.trim() : '';
      const yearLevel = editYearLevel ? editYearLevel.value.trim() : '';
      const about = editAbout ? editAbout.value.trim() : '';
      const interests = editInterests ? editInterests.value.trim() : '';
      const education = editEducation ? editEducation.value.trim() : '';
      const goals = editGoals ? editGoals.value.trim() : '';

      const skills = collectSkillsFromEditor();
      const orgs = collectOrgsFromEditor();

      if (!intro) { showMessage('Please enter your Introduction.', 'error'); return; }
      if (!fullName) { showMessage('Please enter your Full Name.', 'error'); return; }
      if (!course) { showMessage('Please enter your Course.', 'error'); return; }
      if (!yearLevel) { showMessage('Please enter your Year Level.', 'error'); return; }
      if (!about) { showMessage('Please enter your About Me information.', 'error'); return; }
      if (!interests) { showMessage('Please enter your Interests.', 'error'); return; }
      if (!education) { showMessage('Please enter your Educational Background.', 'error'); return; }
      if (!goals) { showMessage('Please enter your Goals & Aspirations.', 'error'); return; }
      if (skills.length === 0) { showMessage('Please add at least one skill.', 'error'); return; }

      const updatedProfile = {
        intro, fullName, course, yearLevel, about, interests, education, goals, skills, orgs,
        profilePicture: currentProfile.profilePicture
      };

      if (user) {
        showMessage('Saving changes to Supabase database...', 'info');
        const { error } = await supabase.from('profiles').upsert({
          id: user.id,
          full_name: fullName,
          course: course,
          year_level: yearLevel,
          intro: intro,
          about: about,
          interests: interests,
          education: education,
          goals: goals,
          skills: skills,
          orgs: orgs
        });

        if (error) {
          showMessage('Database Error: ' + error.message, 'error');
          return;
        }
      }

      currentProfile = updatedProfile;
      displayProfile(currentProfile);
      showMessage('Profile updated successfully!', 'success');

      setTimeout(() => {
        if (editProfileSection) editProfileSection.setAttribute('hidden', 'true');
      }, 700);
    });
  }

  function showMessage(message, type) {
    if (!editProfileMessage) return;
    editProfileMessage.textContent = message;
    editProfileMessage.className = `form-message ${type}`;
  }

  /* =====================================================
     8. CORDOVA CAMERA & DATABASE PICTURE SAVE
  ====================================================== */
  const changeProfilePicture = document.getElementById('changeProfilePicture');
  const avatarWrap = document.getElementById('avatarWrap');
  const profileImg = document.getElementById('profileImg');

  function takeProfilePicture() {
    if (!navigator.camera || !window.Camera) {
      alert('Camera plugin not detected. Please run on a Cordova device or emulator.');
      return;
    }

    navigator.camera.getPicture(
      async function onPhotoSuccess(imageData) {
        if (!profileImg) return;
        const imageSource = imageData.startsWith('data:') ? imageData : 'data:image/jpeg;base64,' + imageData;
        profileImg.src = imageSource;
        currentProfile.profilePicture = imageSource;

        if (user) {
          const { error } = await supabase
            .from('profiles')
            .upsert({ id: user.id, profile_picture: imageSource });

          if (error) {
            alert('Failed to save profile picture to database: ' + error.message);
          } else {
            alert('Profile picture saved!');
          }
        }
      },
      function onPhotoError(error) {
        if (error && (error.toLowerCase().includes('cancel') || error === 'No Image Selected')) {
          return;
        }
        console.error('Camera error:', error);
      },
      {
        quality: 70,
        destinationType: window.Camera.DestinationType.DATA_URL,
        sourceType: window.Camera.PictureSourceType.CAMERA,
        encodingType: window.Camera.EncodingType.JPEG,
        mediaType: window.Camera.MediaType.PICTURE,
        correctOrientation: true,
        targetWidth: 500,
        targetHeight: 500
      }
    );
  }

  if (changeProfilePicture) changeProfilePicture.addEventListener('click', takeProfilePicture);
  if (avatarWrap) {
    avatarWrap.addEventListener('click', takeProfilePicture);
    avatarWrap.style.cursor = 'pointer';
  }

  /* =====================================================
     9. DELETE RECORD & LOGOUT LISTENERS
  ====================================================== */
  const deleteProfileBtn = document.getElementById('deleteProfileBtn');
  if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener('click', async (e) => {
      e.preventDefault(); // Prevent default link/button action
      
      if (confirm('Are you sure you want to delete your profile record?')) {
        try {
          if (user) {
            const { error } = await supabase.from('profiles').delete().eq('id', user.id);
            if (error) throw error;
            await supabase.auth.signOut();
          }
          alert('Profile deleted.');
          window.location.href = '../Auth/Login.html';
        } catch (err) {
          alert('Delete failed: ' + err.message);
        }
      }
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault(); // <-- Prevents page from jumping before sign-out completes
      
      try {
        await supabase.auth.signOut();
        // Clear local session storage if any exists
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to Login page
        window.location.href = '../Auth/Login.html';
      } catch (err) {
        console.error('Logout error:', err);
        // Force redirect even if signout call throws a network error
        window.location.href = '../Auth/Login.html';
      }
    });
  }
  }); // <-- Closes DOMContentLoaded listener

// Cordova ready logging
document.addEventListener('deviceready', () => {
  console.log('Cordova device ready. Camera available.');
}, false);