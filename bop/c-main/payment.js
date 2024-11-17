document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("paymentForm");

    // Load existing cart items
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault();  // Prevent form from refreshing the page

        // Get the values from the form fields
        const name = document.getElementById("name").value;
        const contact = document.getElementById("contact").value;
        const address = document.getElementById("address").value;
        const landmark = document.getElementById("landmark").value;
        const postalCode = document.getElementById("postalCode").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        // Create an object for the payment details
        const paymentDetails = {
            name,
            contact,
            address,
            landmark,
            postalCode,
            paymentMethod
        };

        // Save payment details to localStorage
        localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));

        // Save cart items to localStorage (optional if you want to keep cart state)
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Redirect to confirmation page
        window.location.href = "confirmation.html";
    });
});
