const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];

let matchedProd = document.querySelector("#matchedProd");

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;

  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-prev]")) {
    incrementor = -1;
  }

  if (incrementor == null) return;

  const inputs = [...formSteps[currentStep].querySelectorAll("input")];

  const allValid = inputs.some((input) => {
    return input.checked;
  });

  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
  } else {
    alert("Please select any option");
  }
  matchedProd.innerHTML = `
    <div class='loader-container'>
      <img src='${object_name.templateUrl}/images/ball-triangle.svg' />
      <h4>Please wait. We are finding the best match...</h4>
    </div>
  
  `;
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

multiStepForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let customerData = [];

  if (e.target.elements) {
    [...e.target.elements].slice(1).forEach((element) => {

      if (element.checked) {
        customerData.push(element.value);
      }
    });
  }



jQuery.ajax({
    type: "POST",
    url: this.sbiajaxurl,
    data: {
      action: "lip_finder_response",
      customerData: customerData,
    },

    success: function (data) {
      if(data.success == true){
        setTimeout(() => {
          matchedProd.innerHTML = `
          <h3>Your Lip Finder Product</h3>
        <div class='qodef-woo-product-list' id='qodef-woo-page'>
          <div class='qodef-woo-product-inner'>
            <div class='qodef-woo-product-image'>
              ${data.data.image}
            </div>
            <div class='qodef-woo-product-content'>
              <h5 class='qodef-woo-product-title woocommerce-loop-product__title'>${data.data.name}</h5>
              <span class='price'>${data.data.price}</span>
              <a class='button wp-element-button product_type_simple add_to_cart_button ajax_add_to_cart' 
              data-product-id='${data.data.id}' href=${data.data.addtocart}>Add to cart </a>
            </div>
          </div>
        </div>
      
      `
        }, 3000)
      }
      else{
        setTimeout(() => {
          matchedProd.innerHTML = '<div class="loader-container"><h3>Sorry we could not find anything matched your query. Please try again<small>(Refresh the window)</small>...</h3></div>'
        }, 3000)
      }

    },
    error: function (err) {
      matchedProd.innerHTML = err.data
    },
  });
});
