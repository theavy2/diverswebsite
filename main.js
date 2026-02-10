let totalMoney = 0;

function addOrder(name, price){

    // Add item to list
    let list = document.getElementById("orderList");
    let li = document.createElement("li");
    li.textContent = name + " - $" + price;
    list.appendChild(li);

    // Add money
    totalMoney += price;

    // Update total price
    document.getElementById("total").textContent = totalMoney.toFixed(2);
}

// Menu items 
let total = 0;

function addOrder(name, price){

let list = document.getElementById("orderList");

let li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";

li.innerHTML = `${name} <span>$${price}</span>`;

list.appendChild(li);

total += price;

document.getElementById("totalPrice").textContent = total.toFixed(2);

document.getElementById("orderMessage").classList.add("d-none");
}


function sendOrder(){

if(total === 0) return;

document.getElementById("orderMessage").classList.remove("d-none");

document.getElementById("orderList").innerHTML = "";

total = 0;

document.getElementById("totalPrice").textContent = "0";

}


// pratice code 

// Global Variables
let drinks = [];
let editIndex = null;

// Class
class Drink {
  constructor(name, rate) {
    this.name = name;
    this.rate = rate;
  }

  getStatus() {
    return this.rate >= 5 ? "Good" : "Poor";
  }
}

// Add or Edit Drink
function addDrink() {
  let name = document.getElementById("DrinkName").value.trim();
  let rate = Number(document.getElementById("Rate").value);

  // Validation
  if (name === "" || isNaN(rate)) {
    alert("Please enter valid name and rate");
    return;
  }

  if (rate < 1 || rate > 10) {
    alert("Rate must be between 1 and 10");
    return;
  }

  if (editIndex !== null) {
    drinks[editIndex].name = name;
    drinks[editIndex].rate = rate;
    editIndex = null;
  } else {
    let drink = new Drink(name, rate);
    drinks.push(drink);
  }

  clearForm();
  searchDrink();
}

// Display Drinks
function displayDrinks(list = drinks) {
  let table = document.getElementById("drinkTable"); // FIX HERE
  table.innerHTML = "";

  list.forEach((drink, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${drink.name}</td>
        <td>${drink.rate}</td>
        <td>
          <span class="badge ${
            drink.getStatus() === "Good" ? "bg-success" : "bg-danger"
          }">
            ${drink.getStatus()}
          </span>
        </td>
        <td>
          <button
            class="btn btn-sm btn-warning me-1"
            onclick="editDrink(${drinks.indexOf(drink)})"
          >
            Edit
          </button>
          <button
            class="btn btn-sm btn-danger"
            onclick="deleteDrink(${drinks.indexOf(drink)})"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// Search Drink
function searchDrink() {
  let keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  let filteredDrinks = drinks.filter(drink =>
    drink.name.toLowerCase().includes(keyword)
  );

  displayDrinks(filteredDrinks);
}

// Edit Drink
function editDrink(index) {
  let drink = drinks[index];
  document.getElementById("DrinkName").value = drink.name;
  document.getElementById("Rate").value = drink.rate;
  editIndex = index;
}

// Delete Drink
function deleteDrink(index) {
  if (confirm("Are you sure you want to delete this drink?")) {
    drinks.splice(index, 1);
    searchDrink();
  }
}

// Clear Form
function clearForm() {
  document.getElementById("DrinkName").value = "";
  document.getElementById("Rate").value = "";
}
