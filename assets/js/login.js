document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const errorBox = document.getElementById('form-errors');
    const errorMessage = document.getElementById('error-message');

    const inputs = [usernameInput, passwordInput];

    // Esconde a mensagem de erro assim que o utilizador começa a digitar
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            errorBox.style.display = 'none';
        });
    });

    // Validação do envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        inputs.forEach(input => input.classList.remove('input-error'));
        errorBox.style.display = 'none';

        if (!usernameInput.value.trim()) {
            showError('Por favor, insira o seu username.', usernameInput);
            return;
        }

        if (!passwordInput.value.trim()) {
            showError('Por favor, insira a sua password.', passwordInput);
            return;
        }

        // Simulação de autenticação (substituir pela chamada à API/Backend)
        alert('Login efetuado com sucesso!');
        window.location.href = '../index.html';
        form.reset();
    });

    function showError(message, inputElement) {
        errorMessage.textContent = message;
        errorBox.style.display = 'block';
        if (inputElement) {
            inputElement.classList.add('input-error');
            inputElement.focus();
        }
    }
});