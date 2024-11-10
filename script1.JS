function plotLocation(xPercentage, yPercentage) {
    const floorplanContainer = document.getElementById('floorplan-container');
    const locationDot = document.getElementById('location-dot');

    // Calculate position based on the container size
    const xPos = floorplanContainer.clientWidth * (xPercentage / 100);
    const yPos = floorplanContainer.clientHeight * (yPercentage / 100);

    // Set the position and make the dot visible
    locationDot.style.left = `${xPos}px`;
    locationDot.style.top = `${yPos}px`;
    locationDot.style.display = 'block';
}

// Show "connecting" message
function showConnectingMessage() {
    const connectingMessage = document.createElement('div');
    connectingMessage.id = 'connecting-message';
    connectingMessage.textContent = 'Connecting to server...';
    connectingMessage.style.position = 'absolute';
    connectingMessage.style.top = '10px';
    connectingMessage.style.left = '50%';
    connectingMessage.style.transform = 'translateX(-50%)';
    connectingMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    connectingMessage.style.padding = '10px';
    connectingMessage.style.borderRadius = '5px';
    document.body.appendChild(connectingMessage);
}

// Hide "connecting" message
function hideConnectingMessage() {
    const messageElement = document.getElementById('connecting-message');
    if (messageElement) {
        document.body.removeChild(messageElement);
    }
}

// Simulate listening for updates from AWS (replace this with actual AWS logic)
function listenForUpdates() {
    showConnectingMessage();

    // Simulate receiving data from AWS after 3 seconds
    setTimeout(() => {
        hideConnectingMessage();
        // Replace with real data received from AWS
        const xPercentage = 50; // Simulated data
        const yPercentage = 30; // Simulated data
        plotLocation(xPercentage, yPercentage);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    // Apply initial background image (e.g., cat-themed background)
    document.body.style.backgroundImage = "url('./background.jpg')"; // Replace with your image path

    // Function to render the initial "Begin the journey" page
    function renderInitialPage() {
        document.body.classList.remove('blur', 'text-blur'); // Ensure no blur is applied initially
        document.body.style.backgroundImage = "url('./background.jpg')"; // Restore background image
        document.body.style.backgroundColor = ''; // Reset color to use the image

        document.body.innerHTML = `
            <button id="begin-button">Begin the journey</button>
        `;

        // Get the button element
        const button = document.getElementById('begin-button');

        // Add hover event listeners to the button
        button.addEventListener('mouseenter', () => {
            document.body.classList.add('blur', 'text-blur'); // Apply blur classes on hover
        });

        button.addEventListener('mouseleave', () => {
            document.body.classList.remove('blur', 'text-blur'); // Remove blur classes when not hovering
        });

        // Add event listener to the "Begin the journey" button to load the floor plan page
        button.addEventListener('click', () => {
            document.body.classList.remove('blur', 'text-blur'); // Ensure blur is removed
            document.body.style.transition = 'background-color 3s ease'; // Smooth transition for background color
            document.body.style.backgroundColor = '#f7f4e9'; // Transition to the specified color
            document.body.style.backgroundImage = 'none'; // Remove background image
            renderFloorPlanPage();
        });
    }

    // Function to render the floor plan page with a back button
    function renderFloorPlanPage() {
        document.body.style.backgroundColor = '#f7f4e9'; // Set solid background color
        document.body.style.filter = 'blur(0px)'; // Ensure no blur on floor plan page
        document.body.innerHTML = `
            <h1 id="floorplan-text">Floor Plan Location Plotter</h1>
            <div id="floorplan-container">
                <img id="floorplan" src="floorplan.jpg" alt="Floor Plan" style="width: 100%;">
                <div id="location-dot" class="dot" style="display: none; position: absolute; width: 10px; height: 10px; background-color: red; border-radius: 50%;"></div>
            </div>
            <button id="back-button">Back</button>
        `;
        listenForUpdates(); // Keep this function call for additional functionality

        // Add event listener to the "Back" button
        document.getElementById('back-button').addEventListener('click', () => {
            document.body.style.transition = 'background-color 3s ease'; // Smooth transition for returning
            document.body.style.backgroundColor = ''; // Reset to default background color
            document.body.style.backgroundImage = "url('./background.jpg')"; // Restore background image
            renderInitialPage();
        });
    }

    // Render the initial page on load
    renderInitialPage();
});