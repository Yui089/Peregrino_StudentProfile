document.addEventListener('DOMContentLoaded', () => {


  const defaultProfile = {
    intro: 'Welcome to my little corner of the internet.',
    fullName: 'Student',
    course: 'BS Information Technology',
    yearLevel: '3rd Year',
    about: 'I am a student of Information Technology.',
    interests: '',
    education: '',
    goals: '',
    skills: [],
    orgs: []
  };

  let currentUserId = null;
  let currentProfile = { ...defaultProfile };

  const client = window.supabaseClient;

  /* =====================================================
     AUTH GUARD
     If nobody is signed in, send them to the login page
     before anything else on this page runs.
  ====================================================== */
  async function requireSession() {
    if (!client || !client.auth) {
      console.error('Supabase client is not available. Check that supabase-client.js loaded before index.js.');
      return null;
    }

    const { data, error } = await client.auth.getSession();
    if (error) {
      console.error('Unable to check the current session:', error);
    }

    if (!data || !data.session) {
      window.location.href = '../Login/Login.html';
      return null;
    }

    return data.session;
  }

  /* =====================================================
     LOAD PROFILE FROM THE DATABASE
  ====================================================== */
  async function loadProfileFromDb(userId) {
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Unable to load the profile:', error);
      return { ...defaultProfile };
    }

    return {
      intro: data.intro ?? defaultProfile.intro,
      fullName: data.full_name ?? defaultProfile.fullName,
      course: data.course ?? defaultProfile.course,
      yearLevel: data.year_level ?? defaultProfile.yearLevel,
      about: data.about ?? defaultProfile.about,
      interests: data.interests ?? defaultProfile.interests,
      education: data.education ?? defaultProfile.education,
      goals: data.goals ?? defaultProfile.goals,
      skills: Array.isArray(data.skills) ? data.skills : defaultProfile.skills,
      orgs: Array.isArray(data.orgs) ? data.orgs : defaultProfile.orgs,
      avatarData: data.avatar_data || null
    };
  }

  /* =====================================================
     SAVE PROFILE TO THE DATABASE
     Only the fields the edit form actually owns are sent,
     so the photo (saved separately) is never overwritten here.
  ====================================================== */
  async function saveProfileToDb(userId, profile) {
    const { error } = await client.from('profiles').upsert({
      id: userId,
      full_name: profile.fullName,
      course: profile.course,
      year_level: profile.yearLevel,
      intro: profile.intro,
      about: profile.about,
      interests: profile.interests,
      education: profile.education,
      goals: profile.goals,
      skills: profile.skills,
      orgs: profile.orgs,
      updated_at: new Date().toISOString()
    });

    return error;
  }

  /* =====================================================
     STAR RENDERING HELPER
  ====================================================== */
  function starsForRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? '★' : '☆';
    }
    return stars;
  }

  /* =====================================================
     APPLY THE SAVED PHOTO ON LOAD
  ====================================================== */
  function applySavedPhoto(avatarData) {
    const profileImg = document.getElementById('profileImg');
    if (avatarData && profileImg) {
      profileImg.src = avatarData;
    }
  }

  /* =====================================================
     DISPLAY PROFILE INFORMATION
  ====================================================== */
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
      profile.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'tag';
        skillTag.textContent = skill.name;
        profileSkills.appendChild(skillTag);
      });
    }

    /* SKILLS: Detailed List */
    if (profileSkillsList) {
      profileSkillsList.innerHTML = '';
      profile.skills.forEach(skill => {
        const row = document.createElement('div');
        row.className = 'skill';

        const check = document.createElement('span');
        check.className = 'skill-check';
        check.textContent = '✓';

        const body = document.createElement('div');
        body.className = 'skill-body';

        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = skill.name;

        const stars = document.createElement('span');
        stars.className = 'star-rating';
        stars.textContent = starsForRating(skill.rating);

        body.appendChild(name);
        body.appendChild(stars);
        row.appendChild(check);
        row.appendChild(body);
        profileSkillsList.appendChild(row);
      });
    }

    /* ORGANIZATIONS / COMMUNITY INVOLVEMENT */
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
     CAMERA / PROFILE PICTURE
     Attached here, inside DOMContentLoaded, instead of inside a
     'deviceready' listener. 'deviceready' fires once, early, and
     can fire before this script finishes loading (since it loads
     after the Supabase scripts), which meant the listener below
     was sometimes never attached at all. Checking for the camera
     plugin at the moment of the click avoids that race entirely.
  ====================================================== */
  const avatarWrap = document.getElementById('avatarWrap');
  const profileImg = document.getElementById('profileImg');
  const changeProfilePicture = document.getElementById('changeProfilePicture');

  async function savePhotoToDb(userId, imageSource) {
    const { error } = await client.from('profiles').upsert({
      id: userId,
      avatar_data: imageSource,
      updated_at: new Date().toISOString()
    });
    return error;
  }

  async function handlePhotoCaptured(imageData) {
    const imageSource = 'data:image/jpeg;base64,' + imageData;

    if (profileImg) {
      profileImg.src = imageSource;
    }

    if (!currentUserId) {
      alert('The photo was captured, but your account is still loading. Please try again in a moment.');
      return;
    }

    const error = await savePhotoToDb(currentUserId, imageSource);
    if (error) {
      console.error('Unable to save the profile picture:', error);
      alert('The photo was captured, but it could not be saved. Please try again.');
    }
  }

  function takePicture() {
    if (!navigator.camera) {
      alert('Camera plugin is not available.');
      console.error('navigator.camera is missing.');
      return;
    }

    navigator.camera.getPicture(
      function (imageData) {
        handlePhotoCaptured(imageData);
      },
      function (error) {
        console.error('Camera error:', error);
      },
      {
        quality: 70,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false
      }
    );
  }

  if (avatarWrap) {
    avatarWrap.addEventListener('click', takePicture);
    avatarWrap.style.cursor = 'pointer';
  }
  if (changeProfilePicture) {
    changeProfilePicture.addEventListener('click', takePicture);
  }

  /* =====================================================
     LOG OUT
  ====================================================== */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (client && client.auth) {
        await client.auth.signOut();
      }
      window.location.href = '../Login/Login.html';
    });
  }

  /* =====================================================
     ORGANIZATIONS EDITOR (ADD / REMOVE ORGS)
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

    card.querySelector('.remove-org-btn').addEventListener('click', () => {
      card.remove();
    });

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
     SKILLS EDITOR
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
     EDIT FORM POPULATION & EVENT LISTENERS
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

  function fillEditForm(profile) {
    if (editIntro) editIntro.value = profile.intro;
    if (editFullName) editFullName.value = profile.fullName;
    if (editCourse) editCourse.value = profile.course;
    if (editYearLevel) editYearLevel.value = profile.yearLevel;
    if (editAbout) editAbout.value = profile.about;
    if (editInterests) editInterests.value = profile.interests;
    if (editEducation) editEducation.value = profile.education;
    if (editGoals) editGoals.value = profile.goals;

    fillSkillsEditor(profile.skills);
    fillOrgsEditor(profile.orgs);
  }

  function openEditProfile() {
    if (!editProfileBtn || !editProfileSection) return;

    fillEditForm(currentProfile);

    if (editProfileMessage) {
      editProfileMessage.textContent = '';
      editProfileMessage.className = 'form-message';
    }

    editProfileSection.hidden = false;
    editProfileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (editProfileBtn && editProfileSection) {
    editProfileBtn.addEventListener('click', openEditProfile);
  }

  if (cancelEditBtn && editProfileSection) {
    cancelEditBtn.addEventListener('click', () => {
      fillEditForm(currentProfile);
      if (editProfileMessage) {
        editProfileMessage.textContent = '';
        editProfileMessage.className = 'form-message';
      }
      editProfileSection.hidden = true;
    });
  }

  /* =====================================================
     SAVE FORM SUBMISSION WITH VALIDATION
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
        intro, fullName, course, yearLevel, about, interests, education, goals, skills, orgs
      };

      if (!currentUserId) {
        showMessage('You are not signed in. Please log in again.', 'error');
        return;
      }

      const error = await saveProfileToDb(currentUserId, updatedProfile);
      if (error) {
        console.error('Unable to save profile:', error);
        showMessage('The profile could not be saved. Please try again.', 'error');
        return;
      }

      currentProfile = { ...currentProfile, ...updatedProfile };
      displayProfile(currentProfile);
      showMessage('Profile saved successfully!', 'success');

      setTimeout(() => {
        if (editProfileSection) {
          editProfileSection.hidden = true;
        }
      }, 700);
    });
  }

  function showMessage(message, type) {
    if (!editProfileMessage) return;
    editProfileMessage.textContent = message;
    editProfileMessage.className = `form-message ${type}`;
  }

  /* =====================================================
     DELETE DEMO (CRUD requirement)
     Separate table, separate from the real profile, so this
     never touches actual student data.
  ====================================================== */
  const deleteDemoStatus = document.getElementById('deleteDemoStatus');
  const createTestRecordBtn = document.getElementById('createTestRecordBtn');
  const deleteTestRecordBtn = document.getElementById('deleteTestRecordBtn');

  async function refreshDeleteDemoStatus() {
    if (!deleteDemoStatus || !client) return;

    const { data, error } = await client
      .from('delete_demo')
      .select('id, label, created_at')
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      deleteDemoStatus.textContent = 'Unable to check the test record.';
      console.error('Delete demo status error:', error);
      return;
    }

    if (data && data.length > 0) {
      deleteDemoStatus.textContent = `Current test record: "${data[0].label}"`;
    } else {
      deleteDemoStatus.textContent = 'No test record yet.';
    }
  }

  if (createTestRecordBtn) {
    createTestRecordBtn.addEventListener('click', async () => {
      if (!client) return;
      const { error } = await client
        .from('delete_demo')
        .insert([{ label: 'Sample test record created ' + new Date().toLocaleTimeString() }]);

      if (error) {
        console.error('Unable to create test record:', error);
        alert('Could not create the test record.');
        return;
      }
      refreshDeleteDemoStatus();
    });
  }

  if (deleteTestRecordBtn) {
    deleteTestRecordBtn.addEventListener('click', async () => {
      if (!client) return;

      const { data, error: fetchError } = await client
        .from('delete_demo')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error('Unable to find a test record to delete:', fetchError);
        alert('Could not find a test record to delete.');
        return;
      }

      if (!data || data.length === 0) {
        alert('There is no test record to delete. Create one first.');
        return;
      }

      const { error: deleteError } = await client
        .from('delete_demo')
        .delete()
        .eq('id', data[0].id);

      if (deleteError) {
        console.error('Unable to delete test record:', deleteError);
        alert('Could not delete the test record.');
        return;
      }

      refreshDeleteDemoStatus();
    });
  }

  /* =====================================================
     STARTUP
  ====================================================== */
  (async function init() {
    const session = await requireSession();
    if (!session) return; // already redirected to Login

    currentUserId = session.user.id;
    window.currentUserId = currentUserId;
    currentProfile = await loadProfileFromDb(currentUserId);

    displayProfile(currentProfile);
    applySavedPhoto(currentProfile.avatarData);
    refreshDeleteDemoStatus();
  })();
});