let select = document.querySelectorAll(".dropdown select");

var image_url = "https://flagsapi.com/BD/flat/64.png";

// Populate dropdowns
for (let i = 0; i < select.length; i++) {
    for (let j in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = j; // Country code
        newOption.value = countryList[j]; // Country name
        select[i].append(newOption);
    }
}

const findKey = (value) => {
    return Object.keys(countryList).find((key) => countryList[key] === value) || null;
};

// Initialize variables
let fromCurrency = "US";
let toCurrency = "BD";
let x1 = findKey(fromCurrency);
let x2 = findKey(toCurrency);

const baseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;

async function getExchangeRate() {
    if (x1 && x2) {
        const URL = `${baseURL}/${x1.toLowerCase()}.json`;
        try {
            let response = await fetch(URL);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            
            let responseJSON = await response.json();
            rate = responseJSON[x1.toLowerCase()][x2.toLowerCase()];
            // console.log(`Exchange rate from ${x1} to ${x2}:`, responseJSON[x1.toLowerCase()][x2.toLowerCase()]);
            let message = document.getElementById("unit");
            let amt = document.getElementById("input").value;
            let total = rate * amt;
            message.innerHTML = `${amt} ${x1} = ${total.toFixed(3)} ${x2}`;
        } catch (error) {
            console.error("Error fetching exchange rate:", error.message);
        }
    } else {
        console.error("Invalid currency selection.");
    }
}

// Dropdown event listeners
const currencyDropdown = document.getElementById("temp1");
currencyDropdown.addEventListener("change", function () {
    fromCurrency = this.value;
    x1 = findKey(fromCurrency);
    console.log("From Currency:", x1);

    const image = document.getElementById("myImage");
    image.src = `https://flagsapi.com/${fromCurrency}/flat/64.png`;

    // getExchangeRate(); // Update exchange rate when dropdown changes
});

const currencyDropdown1 = document.getElementById("temp2");
currencyDropdown1.addEventListener("change", function () {
    toCurrency = this.value;
    x2 = findKey(toCurrency);
    console.log("To Currency:", x2);

    const image1 = document.getElementById("myImage1");
    image1.src = `https://flagsapi.com/${toCurrency}/flat/64.png`;

    // getExchangeRate(); // Update exchange rate when dropdown changes
});

// Initial exchange rate fetch
let refresh = document.getElementById("show");
refresh.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});
// getExchangeRate();
window.addEventListener("load", () => {
    getExchangeRate();
  });