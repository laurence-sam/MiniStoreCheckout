function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    let rate;
    if (subtotal >= 5000) {
        rate = 0.10;
    } else if (subtotal >= 3000) {
        rate = 0.07;
    } else if (subtotal >= 1000) {
        rate = 0.05;
    } else {
        rate = 0;
    }
    return subtotal * rate;
}

function getDeliveryFee(option) {
    let fee;
    switch (option) {
        case 1: fee = 0; break;
        case 2: fee = 80; break;
        case 3: fee = 150; break;
        default: fee = 0;
    }
    return fee;
}

const productCountInput = document.getElementById('productCount');
const productsContainer = document.getElementById('productsContainer');

productCountInput.addEventListener('change', function () {
    const count = parseInt(productCountInput.value);
    productsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';
        div.innerHTML =
            `<strong>Product ${i + 1}</strong><br>` +
            `<label>Product Name:</label> <input type="text" id="productName-${i}"><br>` +
            `<label>Price:</label> <input type="number" step="0.01" id="productPrice-${i}"><br>` +
            `<label>Quantity:</label> <input type="number" id="productQuantity-${i}"><br>`;
        productsContainer.appendChild(div);
    }
});

document.getElementById('calculateBtn').addEventListener('click', function () {
    const customerName = document.getElementById('customerName').value.trim();
    const productCount = parseInt(document.getElementById('productCount').value);
    const deliveryOption = parseInt(document.getElementById('deliveryOption').value);
    const validationMessage = document.getElementById('validationMessage');
    const orderSummary = document.getElementById('orderSummary');

    validationMessage.textContent = '';
    orderSummary.textContent = '';

    let isValid = true;
    let subtotal = 0;
    let output = '';

    if (customerName === '') {
        validationMessage.textContent = 'Please enter your name.';
        isValid = false;
    }
    if (!productCount || productCount < 1) {
        validationMessage.textContent += '\nPlease enter valid product count.';
        isValid = false;
    }

    if (isValid) {
        output = `Customer: ${customerName}\n\n`;

        for (let i = 0; i < productCount; i++) {
            const name = document.getElementById(`productName-${i}`).value.trim();
            const price = parseFloat(document.getElementById(`productPrice-${i}`).value);
            const quantity = parseInt(document.getElementById(`productQuantity-${i}`).value);

            if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
                validationMessage.textContent = `Product ${i + 1}: Enter valid name, price, and quantity.`;
                isValid = false;
                break;
            }

            const amount = calculateItemAmount(price, quantity);
            subtotal += amount;

            output += `${i + 1}. ${name}\n`;
            output += `Price: P${price.toFixed(2)}\n`;
            output += `Quantity: ${quantity}\n`;
            output += `Amount: P${amount.toFixed(2)}\n\n`;
        }
    }

    if (!isValid) return;

    let discountPercent;
    if (subtotal >= 5000) discountPercent = '10%';
    else if (subtotal >= 3000) discountPercent = '7%';
    else if (subtotal >= 1000) discountPercent = '5%';
    else discountPercent = '0%';

    const discountAmount = calculateDiscount(subtotal);
    const deliveryFee = getDeliveryFee(deliveryOption);

    let deliveryType;
    if (deliveryOption === 1) deliveryType = 'Store Pickup';
    else if (deliveryOption === 2) deliveryType = 'Standard Delivery';
    else deliveryType = 'Express Delivery';

    const finalAmount = subtotal - discountAmount + deliveryFee;

    output += `ORDER SUMMARY\n`;
    output += `Subtotal:               P${subtotal.toFixed(2)}\n`;
    output += `Discount: ${discountPercent}           P${discountAmount.toFixed(2)}\n`;
    output += `Delivery Type:          ${deliveryType}\n`;
    output += `Delivery Fee:           P${deliveryFee.toFixed(2)}\n`;
    output += `                        --------\n`;
    output += `FINAL AMOUNT:           P${finalAmount.toFixed(2)}`;

    orderSummary.textContent = output;
});