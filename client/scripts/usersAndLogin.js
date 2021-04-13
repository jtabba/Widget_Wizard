//////////////                                     //////////////////////
/////////////       login from and handlers       //////////////////////

const loginSpan = document.querySelector('.login-span')
const signupSpan = document.querySelector('.signup-span')
const loginDiv = document.querySelector('.login-div')
const signupDiv = document.querySelector('.signup-div')

const loginMenuDiv = document.querySelector('.login-menu-div')

const loginForm = document.querySelector('.login_form')
const loginEmailInput = document.querySelector('.login_email_input')
const loginPasswordInput = document.querySelector('.login_password_input')

const signupForm = document.querySelector('.signup_form')
const firstNameInput = document.querySelector('.first_name_input')
const lastNameInput = document.querySelector('.last_name_input')
const emailInput = document.querySelector('.email_input')
const passwordInput = document.querySelector('.password_input')

const loginErrorSpan = document.querySelector('.login-error-span')
const signupErrorSpan = document.querySelector('.signup-error-span')


function displayLogin() {
    loginSpan.style.color = '#F4F44F';
    signupSpan.style.color = 'white';
    loginDiv.classList.remove('hide-logins-items')
    signupDiv.classList.add('hide-logins-items')
}

displayLogin();

function displaySignup() {
    signupSpan.style.color = '#F4F44F';
    loginSpan.style.color = 'white';
    loginDiv.classList.add('hide-logins-items')
    signupDiv.classList.remove('hide-logins-items')
}

function handleLogin(e) {
    e.preventDefault()
    axios.post('/api/sessions', { email: loginEmailInput.value, password: loginPasswordInput.value}).then(res => {
        if (res.data.login == 'success') {  
            displayWelcomeUser(res.data.name)
            loadUserWidgets()
        } else if (res.data.login == 'password incorrect') {
            displayPasswordIncorrect()
        } else {
            displayPleaseSignUp()
        }
    })
}

loginForm.addEventListener('submit', handleLogin)


///////////                                            ///////////////////
//////////          new user from and handler         ///////////////////

function handleNewUser(e) {
    e.preventDefault()
    console.log("create new user pressed")
    if (incompleteSignupForm()) {
        displayIncompleteSignupMessage()
    } else {
        console.log("sending new user request to server")
        axios.post('/api/users', {
            firstName: firstNameInput.value, 
            lastName: lastNameInput.value, 
            email: emailInput.value, 
            password: passwordInput.value
        }).then(res => {
            displayWelcomeUser(res.data.name)
            saveWidgetProfileData();         
        })  
    }
}

signupForm.addEventListener('submit', handleNewUser)


///////////////                           ///////////////
//////////////      logout handler       ///////////////

const logoutBtn = document.querySelector('.logout-btn')

function handleLogout() {
    console.log("logout activated")
    // save the widgets that the user has enabled
    // saveUserState()
    // tuns out, only need to destroy the session.user_id
    axios.delete('/api/sessions', { widgets: "settings"}).then(res => {
        
        })

    displayLogoutState()
}

logoutBtn.addEventListener('click', handleLogout)


////////////////
///////////////     display functions

function displayWelcomeUser(name) { 
    //displays user name and hides login and signup
    const welcomeUserDiv = document.querySelector('.welcome-user-div')
    welcomeUserDiv.classList.remove('hide-logins-items')           
    let welcomeMessageH4 = document.createElement('h4')
    welcomeMessageH4.textContent = `Welcome, ${name}`
    welcomeUserDiv.prepend(welcomeMessageH4)

    loginDiv.classList.add('hide-logins-items')
    signupDiv.classList.add('hide-logins-items')

    loginMenuDiv.classList.add('hide-logins-items')
}

function displayLogoutState() {
    //reset the display to no user logged in
    const welcomeUserDiv = document.querySelector('.welcome-user-div')
    welcomeUserDiv.classList.add('hide-logins-items')    
    welcomeUserDiv.removeChild(welcomeUserDiv.childNodes[0]);      

    loginDiv.classList.add('hide-logins-items')
    signupDiv.classList.add('hide-logins-items')

    loginMenuDiv.classList.remove('hide-logins-items')

    // clear the forms
    loginEmailInput.value = ""
    loginPasswordInput.value = ""
    firstNameInput.value = ""
    lastNameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
}

function displayPasswordIncorrect() {
    loginErrorSpan.textContent = "please try again"
}

function clearErrorMessage() {
    loginErrorSpan.textContent = ""
    signupErrorSpan.textContent = ""

}

function displayPleaseSignUp() {
    loginErrorSpan.textContent = "please sign up"
}

function incompleteSignupForm() {
    console.log("checking from")
    let incompleteStatus = false
    if (firstNameInput.value == "") {incompleteStatus = true}
    else if (lastNameInput.value == "") {incompleteStatus = true}
    else if (emailInput.value == "") {incompleteStatus = true}
    else if (passwordInput.value == "") {incompleteStatus = true}

    return incompleteStatus
}

function displayIncompleteSignupMessage() {
    signupErrorSpan.textContent = "form incomplete"

}


////////////////  Handy functions

function currentUser() {
    axios.get('/api/sessions',{}).then(res => {
            console.log('current user id is ' + res.data.name)
            // return res.data.loggedInUserId
    })
}
 
function getUserWidgets() {
    axios.get('/api/users/widgets',{}).then(res => {
        console.log(res.data.savedWidgets)
    })
}


////////////////////////////// Check the if there is already a session user_id and reload the wigets for that session. Ie. The user might have reloaded the page without logging out.. So we need to reload the widgets.

// if (currentUser()) {
//     console.log("there is a current user")
//     displayWelcomeUser(res.data.name)
//     loadUserWidgets()
// } else {
//     console.log("no current user")
// }


function loadAlreadyLoggedInState() {
    // used if the page is reloaded without logging out. If there's a session user_id already, then load the user widgets for that user_id
    axios.get('/api/sessions',{}).then(res => {
        if (res.data.name) {
            displayWelcomeUser(res.data.name)
            loadUserWidgets()
        }
    })
}

loadAlreadyLoggedInState()