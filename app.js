//Listen for submit
document.getElementById("loan-form").addEventListener("submit", e => {
  e.preventDefault();
  //Hide results
  document.getElementById("results").style.display = "none";
  //Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateReasults, 2000);
});

//Calculate Results
function calculateReasults(e) {
  console.log("Calcultaing...");
  //UI vars
  const UIamount = document.getElementById("amount");
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");
  const UImonthlyPayment = document.getElementById("monthly-payment");
  const UItotalPayment = document.getElementById("total-payment");
  const UItotalInterest = document.getElementById("total-interest");

  const UIprincipal = parseFloat(UIamount.value);
  const UIcalculateInterest = parseFloat(UIinterest.value) / 100 / 12;
  const UIcalculatePayments = parseFloat(UIyears.value) * 12;

  //Compute mothly payment
  const x = Math.pow(1 + UIcalculateInterest, UIcalculatePayments);
  const monthly = (UIprincipal * x * UIcalculateInterest) / (x - 1); //Monthñy payment

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * UIcalculatePayments).toFixed(2);
    UItotalInterest.value = (
      monthly * UIcalculatePayments -
      UIprincipal
    ).toFixed(2);

    //Show results
    document.getElementById("results").style.display = "block";

    //Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

//Function to show error
function showError(error) {
  //Hide results
  document.getElementById("results").style.display = "none";

  //Hide loader
  document.getElementById("loading").style.display = "none";
  //Create a div
  const errorDiv = document.createElement("div");

  //Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //Add class
  errorDiv.className = "alert alert-danger";

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
