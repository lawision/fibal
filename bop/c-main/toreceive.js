document.addEventListener("DOMContentLoaded", () => {
    const productDetailsTableBody = document.getElementById("productDetailsTable").querySelector("tbody");

    // Retrieve the approved product details from localStorage
    const approvedProduct = JSON.parse(localStorage.getItem("approvalData"));

    // Check if the retrieved data is an array or an object
    if (!approvedProduct || !Array.isArray(approvedProduct.products)) {
        alert("No approved product data found or incorrect data format.");
        return;
    }

    // Loop through the products (if it's an array of products)
    approvedProduct.products.forEach((product, index) => {
        // Display each product details on the order page
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>₱${product.price}</td>
            <td>₱${(product.price * product.quantity).toFixed(2)}</td>
            <td>
                <button class="action-btn received">Order Received</button>
                <button class="action-btn returned">Returned</button>
            </td>
        `;
        productDetailsTableBody.appendChild(row);

        // Event listener for Order Received button
        row.querySelector(".received").addEventListener("click", () => {
            alert("Order marked as received.");

            const currentUser = localStorage.getItem("currentUser"); // Get current user from localStorage
            const salesHistoryKey = currentUser + "_salesHistory";

            // Get existing sales history from localStorage or initialize as an empty array
            const salesHistory = JSON.parse(localStorage.getItem(salesHistoryKey)) || [];

            // Create a new sale entry
            const newSale = {
                orderId: `ORD${Date.now()}`, // Unique order ID based on timestamp
                date: new Date().toLocaleString(), // Record the date and time
                products: [product],  // Use the specific product from the approved list
                totalAmount: (product.price * product.quantity).toFixed(2),
            };

            // Add the new sale to the sales history array
            salesHistory.push(newSale);

            // Save the updated sales history back to localStorage
            localStorage.setItem(salesHistoryKey, JSON.stringify(salesHistory));

            // Now remove the product from the main products array in localStorage (shop inventory)
            let products = JSON.parse(localStorage.getItem("products")) || [];

            // Find and remove the product from the products array
            products = products.filter(item => item.name !== product.name || item.size !== product.size);

            // Save the updated products list back to localStorage
            localStorage.setItem("products", JSON.stringify(products));

            // Remove the received product from the approved products array
            approvedProduct.products.splice(index, 1);

            // Update the localStorage with the modified approvedProduct (product removed)
            localStorage.setItem("approvalData", JSON.stringify(approvedProduct));

            // Redirect to the purchase history page
            window.location.href = "purchaseHistory.html"; // Adjust the path as needed
        });

        // Event listener for Order Returned button
        row.querySelector(".returned").addEventListener("click", () => {
            alert("Order marked as returned.");
            // Additional logic for handling returned orders can be implemented here
        });
    });
});
