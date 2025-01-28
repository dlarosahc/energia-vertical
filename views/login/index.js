const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formBtn = document.querySelector('#form-btn');
const errorText = document.querySelector('#error-text');

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#*$%^&()_.,])[a-zA-Z0-9!@#$%*^&()_.,-]{6,}$/;

let emailValidation = false;
let passwordValidation = false;

//Funcion de Validacion
const validateInput = (input, validation) => {
   
    formBtn.disabled = emailValidation && passwordValidation ? false : true;

    if(input.value === ''){
        input.classList.remove('focus:outline-green-500');
        input.classList.remove('focus:outline-red-500');
    } else if (validation){
        input.classList.add('focus:outline-green-500');
        input.classList.remove('focus:outline-red-500')
    } else {
            input.classList.remove('focus:outline-green-500');
            input.classList.add('focus:outline-red-500');
        }
}

//Eventos

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validateInput(emailInput, emailValidation);  
});

passwordInput.addEventListener('input', async e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    validateInput(passwordInput, passwordValidation);  
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        
        const user = {
        email: emailInput.value,
        password: passwordInput.value,
        }
        await axios.post('/api/login', user);
       
            window.location.pathname =  `/dashboard/`;
        
        
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
    }
});