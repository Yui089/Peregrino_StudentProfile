document.addEventListener('DOMContentLoaded', () => {

  // ----- Nav menu: highlight the clicked link -----
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ----- Profile picture placeholder -----
  // If "profile-photo.jpg" isn't found next to this HTML file (i.e. you
  // haven't added your photo yet), show a placeholder icon instead of a
  // broken image.
  const avatarWrap = document.getElementById('avatarWrap');
  const profileImg = document.getElementById('profileImg');

  if (profileImg && avatarWrap) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      avatarWrap.classList.add('no-photo');
    });
  }

});