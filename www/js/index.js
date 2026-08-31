document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const avatarWrap = document.getElementById('avatarWrap');
  const profileImg = document.getElementById('profileImg');

  if (profileImg && avatarWrap) {
    profileImg.addEventListener('error', () => {
      profileImg.style.display = 'none';
      avatarWrap.classList.add('no-photo');
    });
  }

});