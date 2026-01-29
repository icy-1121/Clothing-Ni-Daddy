// Array of products (using loops and arrays from Chapter 4)
const productList = [
  { id: 1, name: "T-Shirt", price: 499, category: "tops", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 2, name: "Polo Shirt", price: 599, category: "tops", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 3, name: "Shorts", price: 399, category: "bottoms", image: "https://cdn.shopify.com/s/files/1/0643/3429/9321/files/PACK90_01.jpg?v=1747151067" },
  { id: 4, name: "Pants", price: 799, category: "bottoms", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 5, name: "Hoodie", price: 999, category: "outerwear", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 6, name: "Jacket", price: 1299, category: "outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 7, name: "Cap", price: 299, category: "accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 8, name: "Beanie", price: 249, category: "accessories", image: "https://www.apetogentleman.com/wp-content/uploads/2021/01/beaniebrands24.jpg" },
  { id: 9, name: "Sling Bag", price: 699, category: "accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80" },
  { id: 10, name: "Belt", price: 199, category: "accessories", image: "https://d3d71ba2asa5oz.cloudfront.net/53000599/images/bttac3505g.jpg" }
];

// Array for cart (using arrays from Chapter 4)
let shoppingCart = [];

// Variables for DOM elements (naming from Chapter 2)
const productContainer = document.getElementById("productContainer");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const totalPriceElement = document.getElementById("totalPrice");
const cartCountElement = document.getElementById("cartCount");

// Function to display products (using loops from Chapter 4)
function displayProducts(productsToShow) {
  productContainer.innerHTML = ""; // Clear the container
  productsToShow.forEach(function(product) { // Loop through the array
    productContainer.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₱${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Function to filter products (using if-else from Chapter 3 and loops from Chapter 4)
function filterProducts(selectedCategory) {
  let filteredProducts = [];
  if (selectedCategory === "all") {
    filteredProducts = productList; // Show all products
  } else {
    productList.forEach(function(product) { // Loop to filter
      if (product.category === selectedCategory) {
        filteredProducts.push(product);
      }
    });
  }
  displayProducts(filteredProducts);
}

// Function to search products (using if-else and loops)
function searchProducts() {
  const searchQuery = document.getElementById("searchBox").value.toLowerCase();
  let searchResults = [];
  productList.forEach(function(product) {
    if (product.name.toLowerCase().includes(searchQuery)) {
      searchResults.push(product);
    }
  });
  displayProducts(searchResults);
}

// Function to add to cart (using if-else and arrays)
function addToCart(productId) {
  let foundProduct = null;
  productList.forEach(function(product) { // Loop to find product
    if (product.id === productId) {
      foundProduct = product;
    }
  });
  if (foundProduct) { // If-else for safety
    let itemExists = false;
    shoppingCart.forEach(function(item) {
      if (item.id === productId) {
        item.quantity += 1; // Increase quantity
        itemExists = true;
      }
    });
    if (!itemExists) {
      shoppingCart.push({ ...foundProduct, quantity: 1 });
    }
    updateCart();
  }
}

// Function to update cart (using loops and arrays)
function updateCart() {
  cartItemsContainer.innerHTML = ""; // Clear cart display
  let cartTotal = 0; // Variable for total
  let itemCount = 0; // Variable for count
  shoppingCart.forEach(function(item, index) { // Loop through cart
    cartTotal += item.price * item.quantity;
    itemCount += item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        ${item.name} (x${item.quantity}) - ₱${item.price * item.quantity}
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
  totalPriceElement.textContent = cartTotal;
  cartCountElement.textContent = itemCount;
}

// Function to remove item (using arrays)
function removeItem(itemIndex) {
  shoppingCart.splice(itemIndex, 1); // Remove from array
  updateCart();
}

// Function to clear cart (using arrays)
function clearCart() {
  shoppingCart = []; // Reset array
  updateCart();
}

// Function to checkout (using if-else)
function checkout() {
  if (shoppingCart.length === 0) {
    alert("Your cart is empty! Add some items first.");
  } else {
    alert("Proceeding to checkout! Total: ₱" + totalPriceElement.textContent);
    clearCart(); // Clear after checkout
  }
}

// Initial display (using loops)
displayProducts(productList);