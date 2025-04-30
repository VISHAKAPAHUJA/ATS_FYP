document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input, select, textarea");
  const saveBtn = document.getElementById("saveBtn");
  const editBtn = document.getElementById("editBtn");
  const uploadBtn = document.querySelector(".upload-btn");
  const removeBtn = document.querySelector(".remove-btn");
  const profileImage = document.querySelector(".profile-image");

  // Function to toggle the disabled state of inputs
  function toggleInputs(disabled) {
      inputs.forEach(input => {
          input.disabled = disabled;
      });

      // Toggle button visibility
      saveBtn.style.display = disabled ? "none" : "inline-block";
      editBtn.style.display = disabled ? "inline-block" : "none";
  }

  // Initially, inputs are enabled (editable), and only "Save Changes" is visible
  toggleInputs(false);

  // Save Changes: Validate form and disable inputs if valid
  saveBtn.addEventListener("click", function () {
      const allValid = Array.from(inputs).every(input => {
          if (input.required) {
              return input.value.trim() !== "";
          }
          return true;
      });

      if (allValid) {
          toggleInputs(true);
          alert("Changes saved successfully!"); // Optional success message
      } else {
          alert("Please fill all required fields."); // Error message for incomplete fields
      }
  });

  // Edit Information: Enable inputs and show "Save Changes"
  editBtn.addEventListener("click", function () {
      toggleInputs(false);
  });

  // Upload Button: Open file selector
  uploadBtn.addEventListener("click", function () {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*"; // Only accept image files

      // Listen for file selection
      fileInput.addEventListener("change", function () {
          const file = fileInput.files[0];
          if (file) {
              const reader = new FileReader();

              // Load the image into the profile circle
              reader.onload = function (e) {
                  profileImage.src = e.target.result;

                  // Hide "Upload" button and show "Remove" button
                  uploadBtn.style.display = "none";
                  removeBtn.style.display = "inline-block";
              };

              reader.readAsDataURL(file);
          }
      });

      fileInput.click(); // Programmatically open the file selector
  });

  // Remove Button: Reset profile image to placeholder
  removeBtn.addEventListener("click", function () {
      profileImage.src = "https://via.placeholder.com/100"; // Reset to default placeholder

      // Hide "Remove" button and show "Upload" button
      removeBtn.style.display = "none";
      uploadBtn.style.display = "inline-block";
  });

  // Initial state: Show only "Upload" button
  removeBtn.style.display = "none"; // Hide "Remove Photo" button initially
  uploadBtn.style.display = "inline-block"; // Show "Upload" button initially
});