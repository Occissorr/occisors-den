document.addEventListener("DOMContentLoaded", function() {
    // Get references to the overlay and buttons
    var imageOverlay = document.getElementById("imageOverlay");
    var enlargedImage = document.getElementById("enlargedImage");
    var hideOverlayBtn = document.getElementById("hideOverlayBtn");

    // Add event listeners to show and hide the overlay
    document.querySelectorAll('.image').forEach(function(image) {
        image.addEventListener("click", function() {
            // Set the source of the enlarged image
            enlargedImage.src = image.src;

            // Show the overlay
            imageOverlay.style.display = "block";
        });
    });

    hideOverlayBtn.addEventListener("click", function() {
        // Hide the overlay
        imageOverlay.style.display = "none";
    });
});
