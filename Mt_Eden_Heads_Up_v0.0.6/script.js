// MAP

const mapElement = document.querySelector('#map');

// Creates map
const map = L.map(mapElement).setView([-36.877, 174.764], 14);
    // Gets map images 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // Maximum zoom set to 19
        maxZoom: 19,
        // Credits
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    // Load saved posts
    const posts = JSON.parse(localStorage.getItem("posts")) || [];


    // Add markers

    // Checks each post
    posts.forEach(post => {
        
        // Checks if post has coordinates
        if (post.latitude && post.longitude) {

            // Creates marker
            const marker = L.marker([
                post.latitude,
                post.longitude
            ]).addTo(map);

            // Adds popup with the details
            marker.bindPopup(`
                <b>${post.type}</b><br>
                Address: ${post.address}
            `);

        }

    });





    