document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      // 1. Sign up user in Auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        alert('Registration Failed: ' + error.message);
        return;
      }

      // 2. Insert blank profile record in public.profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id }]);

        if (profileError) {
          console.error('Error initializing profile row:', profileError);
        }
      }

      alert('Account created! You can now log in.');
      window.location.href = 'Login.html';
    });
  }
});