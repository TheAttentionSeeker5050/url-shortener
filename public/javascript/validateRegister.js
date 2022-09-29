


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
    // if (!strongPasswordRegex.test(password.value)) {
    //     messages.push("Please use a stronger password (at least 1 letter, 1 digit, 1 special character and with size of 8 characters or more)")
    // }

    if (password.value != passwordConfirmation.value) {
        messages.push("Password and password confirmation dont match. ")
    }

    // test valid email 
    if (emailRegex.test(!emailAddress.value)) {
        messages.push("Invalid email")
    }

    // test email is not taken
    await fetch("/check-user", {method: "POST",
    headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({email: emailAddress.value})})
        .then(response => response.json())
        .then((data) => {
            console.log(data.userIsAvailable)
            if (data.userIsAvailable === false) {
                messages.push("Email is already taken")
            }
        })

    // print all the errors in the alert screen
    if (messages.length>0) {
        e.preventDefault()
        formValidationAlert.innerHTML = ""
        let ulNode = document.createElement("ul")

        // returns each error message
        messages.forEach((message) => {
            const alertElement = document.createElement("li")
            alertElement.innerText = message
            ulNode.appendChild(alertElement)
        })

        formValidationAlert.appendChild(ulNode)
    }



})

// // this is a function that will validate if the email is already taken
// function emailIsAvailable(emailInput) {
    
//     fetch("/check-user", {method: "post", body: JSON.stringify({emailAddress: emailInput})})
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data.userIsAvailable)
//             return true
//         })
    
// }