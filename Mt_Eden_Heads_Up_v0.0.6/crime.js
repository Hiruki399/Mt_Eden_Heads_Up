// Load old posts
const posts = JSON.parse(localStorage.getItem("posts")) || [];

// Filter out other posts except for ones labaled with Crime
const crimePosts = posts.filter(post => post.type === "Crime");

// Find container box on crime.html page
const container = document.getElementById("crimePostsContainer");

// If no crimes then display message else list the crimes
if (crimePosts.length === 0 ) {
    container.innerHTML = "<p> No crimes reported yet. </p>";
} else {
    // Looks through already existing posts and orders them.
    crimePosts.forEach((post, index) => {
        const originalIndex = posts.indexOf(post);
        // Creates a new p tag for each post
        const postElement = document.createElement("p");
        // Responsible for text shown in crime page
        postElement.innerHTML = `
            Crime ${index + 1} <br>
            Address: ${post.address}
        `;

        // Creating a delete button for each post
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = " Delete";
        deleteBtn.classList.add("delete-btn");

        // Add click event to delete this specific item
        deleteBtn.addEventListener("click", () => {

            // Remove 1 item at the original index position
            posts.splice(originalIndex, 1);                
            // Save the newly updated array back to localStorage
            localStorage.setItem("posts", JSON.stringify(posts)); 
                
            // Refresh the page to show the updated list
            location.reload(); 
            });

            // Put the button inside the paragraph, then put the paragraph in the container
            postElement.appendChild(deleteBtn);
            container.appendChild(postElement);
        })
}
