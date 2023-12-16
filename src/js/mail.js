// script.js
const myForm = document.getElementById("myForm");
const email = document.getElementById("email");
const successMessage = document.getElementById("successMessage"); // Add a div for success message


document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Send the data using fetch
    fetch("https://api.apispreadsheets.com/data/vYKIsl4QyFldd4hj/", {
      method: "POST",
      headers: {
        // Specify the content type as JSON
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"data": {"email": email.value}})
    })
      .then(function (res) {
        if (res.status === 201) {
          // Clear input
          email.value = "";
          // Show the success message
          successMessage.innerHTML = "Sėkmingai užsiprenumeravote mūsų naujienas!";
        } else {
          // ERROR: Handle error here
          alert("There was an error :(");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
