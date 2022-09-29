// we will display error messages if necessary
const formValidationAlert = document.getElementById("formValidationAlert")

// get query params
const queryParamsString = window.location.search.substring(1)


// if there is an error message, display it, otherwise hide the alert button
if (queryParamsString) {
    formValidationAlert.classList.add("error")
} else {
    formValidationAlert.classList.remove("error")
}