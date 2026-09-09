document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordConfirmInput = document.getElementById('password-confirm');
    
    const errorBox = document.getElementById('form-errors');
    const errorMessage = document.getElementById('error-message');

    // Oculta a caixa de erro ao começar a digitar
    const inputs = [usernameInput, emailInput, passwordInput, passwordConfirmInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            errorBox.style.display = 'none';
        });
    });

    // Processa o envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpa erros anteriores
        inputs.forEach(input => input.classList.remove('input-error'));
        errorBox.style.display = 'none';

        // Validações Básicas
        if (!usernameInput.value.trim()) {
            showError('Por favor, digite um nome de usuário.', usernameInput);
            return;
        }


        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        
        if (!validateEmail(emailInput.value)) {
            showError('Por favor, insira um e-mail válido.', emailInput);
            return;
        }

        if (passwordInput.value.length < 6) {
            showError('A senha deve ter pelo menos 6 caracteres.', passwordInput);
            return;
        }

        if (passwordInput.value !== passwordConfirmInput.value) {
            showError('As senhas não coincidem.', passwordConfirmInput);
            return;
        }

        // Se passar por todas as validações:
        alert('Cadastro efetuado com sucesso!');
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