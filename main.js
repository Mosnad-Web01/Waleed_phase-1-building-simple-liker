// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

// Select elements from the DOM
const heartIcons = document.querySelectorAll(".like-glyph");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");

// Initially hide the modal
modal.classList.add("hidden");

// Add event listeners to all heart icons
heartIcons.forEach((heart) => {
  heart.parentElement.addEventListener("click", () => {
    if (heart.classList.contains("activated-heart")) {
      // If the heart is already full, change it back to empty
      heart.classList.remove("activated-heart");
      heart.innerText = EMPTY_HEART;
    } else {
      // If the heart is empty, simulate server call
      mimicServerCall()
        .then(() => {
          heart.classList.add("activated-heart");
          heart.innerText = FULL_HEART;
        })
        .catch(() => {
          // Show the error modal with a message
          modalMessage.innerText = "Error: Operation failed!";
          modal.classList.remove("hidden");

          // Hide the modal after 3 seconds
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 3000);
        });
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
