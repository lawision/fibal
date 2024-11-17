document.addEventListener("DOMContentLoaded", () => {
    const salesTableBody = document.getElementById("salesTableBody");

    // Get the current user's email from localStorage
    const currentUserEmail = localStorage.getItem("currentUser");

    if (!currentUserEmail) {
        alert("No current user found. Please log in first.");
        return;
    }

    // Get the sales data associated with the current user's email
    const salesData = JSON.parse(localStorage.getItem(currentUserEmail + "_salesData")) || [];

    // Function to render the sales data
    function renderSales() {
        salesTableBody.innerHTML = ""; // Clear any existing rows

        // Loop through each sale and create a table row
        salesData.forEach(sale => {
            const row = document.createElement("tr");

            // Calculate the total amount for this sale
            let totalAmount = 0;
            sale.products.forEach(product => {
                totalAmount += product.price * product.quantity;
            });

            const formattedTotalAmount = `₱${totalAmount.toFixed(2)}`;

            // Display the sale details, including the buyer's email
            row.innerHTML = `
                <td>${sale.orderId}</td>
                <td>${sale.date}</td>
                <td>${sale.products.map(product => product.name).join(", ")}</td>
                <td>${formattedTotalAmount}</td>
                <td>${currentUserEmail}</td> <!-- Displaying the email directly -->
            `;

            salesTableBody.appendChild(row);
        });
    }

    // Render the sales data when the page loads
    renderSales();
});
