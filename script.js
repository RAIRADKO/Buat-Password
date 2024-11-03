const passwordInput = document.getElementById('password-input');
const showPasswordBtn = document.getElementById('show-password');
const generatePasswordBtn = document.getElementById('generate-password');
const message = document.getElementById('message');

const criteria = {
    length: document.getElementById('length'),
    lowercase: document.getElementById('lowercase'),
    uppercase: document.getElementById('uppercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
    spaces: document.getElementById('spaces'),
};

function validatePassword(password) {
    let allCriteriaMet = true;

    if (password.length >= 8 && password.length <= 20) {
        updateCriteriaStatus(criteria.length, true);
        criteria.length.parentElement.classList.add('criteria-met');
    } else {
        updateCriteriaStatus(criteria.length, false);
        criteria.length.parentElement.classList.remove('criteria-met');
        allCriteriaMet = false;
    }

    updateCriteriaStatus(criteria.lowercase, /[a-z]/.test(password), allCriteriaMet);
    criteria.lowercase.parentElement.classList.toggle('criteria-met', /[a-z]/.test(password));

    updateCriteriaStatus(criteria.uppercase, /[A-Z]/.test(password), allCriteriaMet);
    criteria.uppercase.parentElement.classList.toggle('criteria-met', /[A-Z]/.test(password));

    updateCriteriaStatus(criteria.numbers, /\d.*\d/.test(password), allCriteriaMet);
    criteria.numbers.parentElement.classList.toggle('criteria-met', /\d.*\d/.test(password));

    updateCriteriaStatus(criteria.symbols, /[!@#$%^&*]/.test(password), allCriteriaMet);
    criteria.symbols.parentElement.classList.toggle('criteria-met', /[!@#$%^&*]/.test(password));

    updateCriteriaStatus(criteria.spaces, !/\s/.test(password), allCriteriaMet);
    criteria.spaces.parentElement.classList.toggle('criteria-met', !/\s/.test(password));

    message.style.display = allCriteriaMet ? 'block' : 'none';

    if (allCriteriaMet) {
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    } else {
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
    }
}

function updateCriteriaStatus(element, isValid, allCriteriaMet) {
    element.classList.toggle('valid', isValid);
    element.classList.toggle('error', !isValid);
    
    element.parentElement.classList.toggle('criteria-met', isValid);
    
    if (!isValid) allCriteriaMet = false;
}

passwordInput.addEventListener('input', () => validatePassword(passwordInput.value));

function generateRandomPassword() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    let password = '';
    
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(numbers);
    password += getRandomChar(numbers);
    password += getRandomChar(symbols);

    const allChars = lowercaseChars + uppercaseChars + numbers + symbols;
    while (password.length < 12) {
        password += getRandomChar(allChars);
    }

    return shuffleString(password);
}

function getRandomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

function shuffleString(str) {
    return str.split('').sort(() => 0.5 - Math.random()).join('');
}

generatePasswordBtn.addEventListener('click', () => {
    const randomPassword = generateRandomPassword();
    passwordInput.value = randomPassword;
    validatePassword(randomPassword);
});

showPasswordBtn.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    showPasswordBtn.textContent = passwordInput.type === 'password' ? '🫣' : '😮';
});
