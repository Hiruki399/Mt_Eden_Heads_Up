// Define error variables
const errorAddress = document.getElementById("errorAddress");
const errorPostType = document.getElementById("errorPostType");

// Finds post form, waits till form is subkitted and runs below code. Event stores information of what happened and async allos to use await later in the code.
document.getElementById("postForm").addEventListener("submit", async function (event) {
  // Stops normal form behaviour so js can handle the submission 
  event.preventDefault();
  // Clears error messages
  errorPostType.textContent = "";
  errorAddress.textContent = "";

  // Which radio is selected and makes sure it is selected.
  const selected = document.querySelector('input[name="type"]:checked');
  if (!selected) {
   errorPostType.textContent = "Please enter a post type!";
   return;
  }

  // Reads and trim the address
  const address = (document.getElementById('address')?.value || '').trim();
  
  // Prepare coordinates
  let latitude = null;
  let longitude = null;

  // Checks the input address and checks if the geocode returned is valid and has 'Eden' to check if it is in Mt Eden
  if (address) {

    try {
        const geocode = await geocodeAddress(address);
        
        if (!geocode.display_name.includes("Eden")) {
            errorAddress.textContent = "Please enter an valid address in Mt Eden (the entire address eg: Kenyon Avenue, Mt Eden)";
            return;
}

        // Gets the returned lat and lon values.
        latitude = parseFloat(geocode.lat);
        longitude = parseFloat(geocode.lon);

    // If address check fails prints message in console and webpage to allow debugging
    } catch (err) {
        console.error(err);
        errorAddress.textContent = "Address check failed.";
        return;
    }

    // Checks if address was entered or else displays text.
} else {
    errorAddress.textContent = "Please enter an address.";
    return;
}
  
  
  // Gets already saved posts
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  // Creates new post object
  const post = {
    // Creates unique ID
    id: Date.now(),
    // Stores radio button value
    type: selected.value,
    // Gets address
    address: address,
    //
    latitude: latitude,
    longitude: longitude,
  };

  // Adds new post and saves to local storage. Then redirects the user to the appropriate oage
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  // Redirect based on type
  if (selected.value === "Crime") {
    window.location.href = "crime.html";
  } else if (selected.value === "Lost Property") {
    window.location.href = "lost_property.html";
  } 
});

// Gets the address the user entered 
async function geocodeAddress(address) {
  // Opens Nominatim search service
  const url = new URL('https://nominatim.openstreetmap.org/search');
  // Response format(JSON)
  url.searchParams.set('format', 'json');
  url.searchParams.set('q', address);
  // Asks Nominatim for the first matching result
  url.searchParams.set('limit', '1');
  // Sends request to Nominatim and waits (using await)
  const res = await fetch(url.toString(), { headers: { 'Accept-Language': 'en' } });
  // Checks if request works if not creates an error
  if (!res.ok) throw new Error('Geocoding request failed: ' + res.status);
  // Converts response to JS data
  const results = await res.json();
  // Checks if result exists and only contains 1. Then returns the result
  if (results && results.length > 0) {
    return results[0];
} else {
    return null;
}
}
