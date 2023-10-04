const userForm = document.querySelector('#user-form');

userForm.addEventListener('submit', async (event) => {
    console.log('Evento de envio do formulário executado.');
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const userData = {
        name,
        email,
        password,
    };

    try {
        const response = await fetch('http://localhost:8080/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            console.log('Usuário cadastrado com sucesso!');
        } else {
            console.error('Erro ao cadastrar o usuário.');
        }
    } catch (error) {
        console.error('Erro ao enviar a solicitação:', error);
    }
});

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
    console.log('Evento de envio do formulário executado.');
    event.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    const userData = {
        email,
        password,
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        
        if (response.ok) {
            const data = await response.json();
            const userEmail = data.userEmail;
            const username = data.username;
            localStorage.setItem('username',username);
            localStorage.setItem('userEmail',userEmail);
            console.log('Login com sucesso!');
            window.location.href = '/FrontEnd/index.html';
        } else {
            console.error('Erro usuário não existe.');
        }
    } catch (error) {
        console.error('Erro ao enviar a solicitação:', error);
    }
});
