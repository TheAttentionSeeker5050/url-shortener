



// we get the for element variables
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const emailAddress = document.getElementById("emailAddress")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("passwordConfirmation")

// we get the form variable
const form = document.getElementById("registerForm")

// we get the error variable
const formValidationAlert = document.getElementById("formValidationAlert")

// formValidationAlert.innerText = "just testing that the public js directory works"

var strongPasswordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
var emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$")

form.addEventListener("submit", async e => {
    // validation on the frontend. 

    // first we prevent the default form post request
    e.preventDefault()

    // first we create an array called messages, and add all the alert warnings on it
    const messages = []
    if (firstName.value === "" || firstName.value == null) {
        messages.push("The first name is empty")
    } 

    if (lastName.value === "" || lastName.value == null) {
        messages.push("Last name is empty")
    }

    if (password.value.length < 8) {
        messages.push("The password should be 8 characters or more")
    }

    // test for valid password
    if (!strongPasswordRegex.test(password.value)) {
        messages.push("Please use a stronger password (at least 1 letter, 1 digit, 1 special character and with size of 8 characters or more)")
    }

    if (password.value != passwordConfirmation.value) {
        messages.push("Password and password confirmation dont match. ")
    }

    // test valid email 
    if (emailRegex.test(!emailAddress.value)) {
        messages.push("Invalid email")
    }



    // test that the email is not already taken
    await emailIsAvailable(emailAddress.value).then(data => {
        if (data === false) {
            messages.push("That email is already taken")
        }
    })

    // print all the errors in the alert screen
    if (messages.length>0) {

        // first we clear previous forms
        formValidationAlert.innerHTML = ""

        // now we make the error alert box visible
        formValidationAlert.classList.add("error")

        // create an unordered list element
        let ulNode = document.createElement("ul")

        // returns each error message
        messages.forEach((message) => {
            const alertElement = document.createElement("li")
            alertElement.innerText = message
            ulNode.appendChild(alertElement)
        })

        formValidationAlert.appendChild(ulNode)

        // erase password value
        password.value = ''
        passwordConfirmation.value = ''

    } else {

        // we remove the error alert, we will not notice but is ok
        formValidationAlert.classList.remove("error")

        // now we process the order
        await fetch("/register", {method: "POST",
        headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            emailAddress: emailAddress.value,
            password: password.value,
            passwordConfirmation: passwordConfirmation.value
          })})

          
          
        window.location.href = "/login"
    }
    
    



})

// // this is a function that will validate if the email is already taken
const emailIsAvailable = async (emailInput) => {
    var result 
    await fetch("/check-user", {method: "POST",
    headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({email: emailInput})})
      .then(response => response.json())
      .then(data => {
          //   if false, then the email is not available, if true email is available for account creation
        result = data.userIsAvailable
      })

    //   return a bool containing an availability result
      return result
        
    
}