function transformUrl (urlInput) {

    // in case that the url input is false
    if (urlInput == null || urlInput == "") {
      return false
    } else {

       // firs we make sure that the url is absolute
         if (urlInput.startsWith("https://" || urlInput.startsWith("http://"))) {
            // I can leave this empty 
            newUrl = urlInput
         } else {
            newUrl = "https://" + urlInput
         }
         
         return newUrl
      }
}

exports.transformUrl = transformUrl