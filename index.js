document.getElementById("food").addEventListener("click", handleCat);
document.getElementById("shopping").addEventListener("click", handleCat);
document.getElementById("travel").addEventListener("click", handleCat);
document.getElementById("entertainment").addEventListener("click", handleCat);
document.getElementById("payments").addEventListener("click", handleCat);
document.getElementById("medical").addEventListener("click", handleCat);
document.getElementById("transaction").addEventListener("click", handleCat);
document.getElementById("misc").addEventListener("click", handleCat);

const trackForm = document.getElementById("trackForm");
trackForm.addEventListener("submit", handleSubmit);

function handleCat(cat) {
  cat = cat.target;
  let subCats = {
    Food: ["Tea/Coffee", "Street Food", "Restaurants", "Snacks"],
    Shopping: [
      "Groceries",
      "Cosmetics",
      "Dress",
      "Accessories",
      "Education",
      "Household",
    ],
    Travel: [
      "Bus",
      "Auto",
      "Cab",
      "Train",
      "Fuel",
      "Toll",
      "Parking",
      "Air",
      "Service",
    ],
    Entertainment: ["Movie", "Tour", "Games", "Toys"],
    Payments: [
      "Rent",
      "Car Loan",
      "ICICI Due Repay",
      "HDFC Due Repay",
      "Chit",
      "Gold Chit",
      "RD",
      "Phone Bill",
      "EB Bill",
      "Cable TV",
      "Maintenance",
      "Gas",
      "Mutual Fund",
      "iWish",
    ],
    Medical: ["Medicine", "Lab Test", "Consultation"],
    Transactions: [
      "Cash Withdraw",
      "To ICICI",
      "To HDFC",
      "To Paytm",
      "Savings",
      "WHC",
      "To Home",
    ],
    "Misc.": [],
  };
  let subCatSelect = document.getElementById("subCatSelect");
  let subCatMisc = document.getElementById("subCatMisc");
  subCatSelect.innerHTML = "";
  if (cat.value === "Misc.") {
    subCatSelect.value = "";
    subCatSelect.style.display = "none";
    subCatMisc.style.display = "block";
  } else {
    subCatMisc.value = "";
    subCatMisc.style.display = "none";
    subCatSelect.style.display = "block";
    var opt = document.createElement("option");
    opt.value = "";
    opt.innerHTML = "Select SubCategory";
    subCatSelect.appendChild(opt);
    for (element in subCats[cat.value]) {
      opt = document.createElement("option");
      opt.value = subCats[cat.value][element];
      opt.innerHTML = subCats[cat.value][element];
      subCatSelect.appendChild(opt);
    }
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  let result = document.getElementById("result");
  if (
    formProps.amount &&
    formProps.source &&
    formProps.category &&
    (formProps.subCat || formProps.subCatMisc)
  ) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      let submitBtn = document.getElementById("submitBtn");
      if (this.readyState == 4 && this.status == 200) {
        var res = this.responseText;
        result.innerHTML = "Added";
        e.target.reset();
        submitBtn.disable = "false";
        setTimeout(function () {
          result.style.visibility = "hidden";
        }, 2000);
      } else {
        result.style.visibility = "visible";
        result.innerHTML = "Adding the Transaction";
        submitBtn.disable = "true";
      }
    };
    let emojis = {
      'egg': '🥚',
      'mango': '🥭',
      'corn': '🌽',
      'pumpkin': '🎃',
      'coconut': '🥥',
      'carrot': '🥕',
      'lemon': '🍋',
      'banana': '🍌',
      'rice': '🌾',
      'wheat': '🌾',
      'burger': '🍔',
      'fries': '🍟'
    }
    let convertedCommentsArr = [];
    formProps.comments.split(',').forEach(word => {
      convertedWordArr = [];
      word.split(' ').forEach(tag => {
        convertedWordArr.push(emojis[tag.toLowerCase()] || tag)
      });
      convertedCommentsArr.push(convertedWordArr.join(' '))
    });
    let convertedComments = convertedCommentsArr.join(',');
    let row = "row=";
    row += formProps.subCat || formProps.subCatMisc;
    row += "|||";
    row += formProps.amount;
    row += "|||";
    row += formProps.source;
    row += "|||";
    row += formProps.category;
    row += "|||";
    row += convertedComments;
    row += "|||||||||create||||||";
    row += new Date()
      .toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(" ", "-")
      .replace(",", "")
      .replace("at", "");
    xhttp.open(
      "GET",
      `https://script.google.com/macros/s/AKfycbzp29Qzo_oLjAgi2UnhkRDl798lXFiU99Jy-aqXIuuE8NF0Ejlq/exec?${row}`
    );
    xhttp.send();
  } else {
    result.style.visibility = "visible";
    result.innerHTML = "Please fill";
  }
}
