document.addEventListener("DOMContentLoaded", () => {
    const approvalData = JSON.parse(localStorage.getItem("approvalData"));

    // Check if approvalData is found in localStorage
    if (!approvalData) {
        alert("No approval data found.");
        return;
    }

    const buyerAndProductDetailsTableBody = document.getElementById("buyerAndProductDetails").querySelector("tbody");

    // Debugging: Log the approvalData to check the content
    console.log("Approval Data: ", approvalData);

    const { buyer, products } = approvalData;

    // Check if there are products in the approvalData
    if (products && products.length > 0) {
        // Render the buyer and product details in the same row
        products.forEach((product, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${buyer.name}</td>
                <td>${buyer.contact}</td>
                <td>${buyer.address}</td>
                <td>${buyer.landmark || "N/A"}</td>
                <td>${buyer.postalCode}</td>
                <td>${buyer.paymentMethod}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>₱${product.price}</td>
                <td>₱${(product.price * product.quantity).toFixed(2)}</td>
                <td>
                    <button class="action-btn approve" data-index="${index}">Approve</button>
                    <button class="action-btn reject" data-index="${index}">Reject</button>
                </td>
                <td class="status">Pending</td> <!-- Default status -->
            `;

            buyerAndProductDetailsTableBody.appendChild(row);
        });
    } else {
        buyerAndProductDetailsTableBody.innerHTML = "<tr><td colspan='12'>No products found.</td></tr>";
    }

    // Event delegation for Approve and Reject buttons
    buyerAndProductDetailsTableBody.addEventListener("click", (event) => {
        const target = event.target;
        const index = target.getAttribute("data-index");

        if (target.classList.contains("approve")) {
            const statusCell = target.closest("tr").querySelector(".status");
            statusCell.textContent = "Approved";
            alert(`Product ${products[index].name} approved.`);
            // Save the approved product details to localStorage
            const approvedProduct = products[index];
            localStorage.setItem("approvedProduct", JSON.stringify(approvedProduct));

        } else if (target.classList.contains("reject")) {
            // Update the status to "Rejected"
            const statusCell = target.closest("tr").querySelector(".status");
            statusCell.textContent = "Rejected";
            alert(`Product ${products[index].name} rejected.`);
            // Handle rejection logic here
        }
    });
});
