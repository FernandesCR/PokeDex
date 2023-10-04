const logoutButton = document.getElementById('logout-button');
const userEmail = localStorage.getItem('userEmail');
const username = localStorage.getItem('username');

function updateLoginLink(username, userEmail) {
  const configNome = document.getElementById('nome');
  const configEmail = document.getElementById('email');
  
  if (username) {
    const configUser = document.createElement('a');
    configUser.textContent = username
  
    configNome.innerHTML = '';
    configNome.appendChild(configUser);
  }

  if (userEmail) {
    const configUser = document.createElement('a');
    configUser.textContent = userEmail
  
    configEmail.innerHTML = '';
    configEmail.appendChild(configUser);
  }
}

updateLoginLink(username, userEmail);


logoutButton.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    window.location.href = '/frontend/paginas/login/index.html';
});