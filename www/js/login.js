document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        alert('Login Failed: ' + error.message);
      } else {
        alert('Logged in successfully!');
        // Adjust path to point to your Index.html
        window.location.href = '../Profile/Index.html'; 
      }
    });
  }
});