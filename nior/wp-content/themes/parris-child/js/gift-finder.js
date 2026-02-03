const giftFinderForm = document.querySelector("[data-gift-finder-form]");
const gifFormSteps = [...giftFinderForm.querySelectorAll("[data-step]")];
const giftFinderResponse = document.getElementById("gift-finder-response");
const giftfinderresponsetitle = document.getElementById('gift-finder-response-title');
const otherResponseData = document.getElementById('other-response-data');


let customerChoises = [];
let subcriberData = [];

let currentGiftFormStep = gifFormSteps.findIndex((step) => {
  return step.classList.contains("active");
});

function showCurrentGiftFinderStep() {
  gifFormSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentGiftFormStep);
  });
}

if (currentGiftFormStep < 0) {
  currentGiftFormStep = 0;
  showCurrentGiftFinderStep();
}

let incrementor;

giftFinderForm.addEventListener("click", (e) => {
  if (e.target.matches("[data-next-start]")) {
    incrementor = 1;
    currentGiftFormStep += incrementor;
    showCurrentGiftFinderStep();
  }

  if (e.target.matches("[data-next-radio]")) {
    incrementor = 1;


    if (e.target.checked) {

      customerChoises.push(e.target.value);
      currentGiftFormStep += incrementor;
      showCurrentGiftFinderStep();
    }
  }

  if (e.target.type === "submit") {
    e.preventDefault();

    const firstname = gifFormSteps[currentGiftFormStep].querySelector(
      "input[name=first-name]"
    );
    const lastName = gifFormSteps[currentGiftFormStep].querySelector(
      "input[name=last-name]"
    );
    const emailaddress =
      gifFormSteps[currentGiftFormStep].querySelector("input[name=email]");
    const phoneNumber = gifFormSteps[currentGiftFormStep].querySelector(
      "input[name=cell-number]"
    );

    if (firstname.value == "") {
      alert("First Name is required!");
      firstname.classList.add("invalid");
      return false;
    }

    if (lastName.value == "") {
      alert("Last Name is required!");
      lastName.classList.add("invalid");
      return false;
    }

    if (emailaddress.value == "") {
      alert("Email is required!");
      emailaddress.classList.add("invalid");
      return false;
    }

    if (phoneNumber.value == "") {
      alert("Phone number is required!");
      phoneNumber.classList.add("invalid");
      return false;
    }

    if (
      firstname.value !== "" &&
      lastName.value !== "" &&
      emailaddress.value !== "" &&
      phoneNumber.value !== ""
    ) {
      subcriberData.push(firstname.value +' '+ lastName.value);
      subcriberData.push(emailaddress.value);
      subcriberData.push(phoneNumber.value);
     
    }
    incrementor = 1;
    currentGiftFormStep += incrementor;
    showCurrentGiftFinderStep();
    otherResponseData.innerHTML = `
    <div class='loader-container' style="text-align: center;">
      <img src='${object_name.templateUrl}/images/ball-triangle.svg' />
      <h3 style="color: #fff;">Please wait. We are finding the best match...</h3>
    </div>
    `

    jQuery.ajax({
      type: "POST",
      url: this.sbiajaxurl,
      data: {
        action: "gift_finder_response",
        subscriberData: subcriberData,
        customerChoices: customerChoises,
      },

      success: function (data) {
        if(data.success == true){

          setTimeout(() => {
            giftfinderresponsetitle.innerHTML = data.data.title;
            otherResponseData.innerHTML = '';
            otherResponseData.style.display = 'none';
            (data.data.products).forEach(item => {
              
              giftFinderResponse.innerHTML += `
              
                <div class='qodef-e qodef-grid-item qodef-item--full product type-product'>
                  <div class='qodef-woo-product-inner'>
                    <div class='qodef-woo-product-image'>
                      ${item.image}
                    </div>
                    <div class='qodef-woo-product-content'>
                      <h5 class='qodef-woo-product-title woocommerce-loop-product__title'>${item.name}</h5>
                      <span class='price'>${item.price}</span>
                      <a href="?add-to-cart=${item.id}" data-quantity="1" 
                      class="button wp-element-button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="${item.id}" 
                      data-product_sku="NIORLIQUIDEYE" aria-label="Add “${item.name}” to your cart" rel="nofollow">Add to cart</a>
                    </div>
                  </div>
                </div>
            `
            })
            
          }, 3000)
        }
        else{
          setTimeout(() => {
            otherResponseData.innerHTML = '';
            // otherResponseData.style.display = 'none';
            otherResponseData.innerHTML = '<div class="loader-container"><h3>Sorry we could not find anything matched your query. Please try again<small>(Refresh the window)</small>...</h3></div>'
          }, 3000)
        }
  
      },
      error: function (err) {
        matchedProd.innerHTML = err.data
      },
    });

  
    
  } else if (e.target.matches("[data-prev]")) {
    incrementor = -1;
    customerChoises.splice(-1);
    currentGiftFormStep += incrementor;
    showCurrentGiftFinderStep();
  }

  if (incrementor == null) return;
});