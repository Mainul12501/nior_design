//this is the button
var acc = document.getElementsByClassName("nior-custom-accordion");
var i;
//variables

var coursePanel = document.getElementsByClassName("nior-custom-panel");
var courseAccordion = document.getElementsByClassName("nior-custom-accordion");
var courseAccordionActive = document.getElementsByClassName(
  "nior-custom-accordion active"
);

for (i = 0; i < acc.length; i++) {
  acc[0].classList.add("active");

  acc[0].nextElementSibling.style.maxHeight = "100%";

  acc[i].onclick = function () {
    var panel = this.nextElementSibling;
    /*if pannel is already open - minimize*/
    if (panel.style.maxHeight) {
      //minifies current pannel if already open
      panel.style.maxHeight = null;
      //removes the 'active' class as toggle didnt work on browsers minus chrome
      this.classList.remove("active");
    } else {
      //pannel isnt open...
      //goes through the buttons and removes the 'active' css (+ and -)
      for (var ii = 0; ii < courseAccordionActive.length; ii++) {
        courseAccordionActive[ii].classList.remove("active");
      }
      //Goes through and removes 'activ' from the css, also minifies any 'panels' that might be open
      for (var iii = 0; iii < coursePanel.length; iii++) {
        this.classList.remove("active");
        coursePanel[iii].style.maxHeight = null;
      }
      //opens the specified pannel
      panel.style.maxHeight = panel.scrollHeight + "px";
      //adds the 'active' addition to the css.
      this.classList.add("active");
    }
  }; //closing to the acc onclick function
} //closing to the for loop.

//Product Features Title Splitting

let productFeatureTitle = document.querySelector(".product-features h3");

let splittedItems = productFeatureTitle.innerHTML.split(",");

if (splittedItems) {
  for (let i = 0; i < splittedItems.length; i++) {
    splittedItems[i] = splittedItems[i] + "<br>";
  }
}

splittedItems = splittedItems.join("");

productFeatureTitle.innerHTML = splittedItems;

//Product Variation Color Picker
// (function ($, window, document) {
//   $(".single_variation_wrap").on("show_variation", function (event, variation) {
//     $("#show-single-shade-name").html(
//       "Selected Shade: " + makeTitle(variation.attributes.attribute_pa_shades)
//     );
//   });
// })(jQuery, window, document);
//
function makeTitle(slug) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}



jQuery( '.single_variation_wrap' ).on( 'show_variation', function( event, variation ) {


  let key = Object.keys(variation.attributes)[0];
	
	console.log( key );

  if(key === 'attribute_pa_flavor'){
    document.querySelector('#show-single-shade-name').innerHTML = 'Selected Flavor: '+ makeTitle(variation.attributes.attribute_pa_flavor)
  }

  if (key === 'attribute_pa_shades'){
    document.querySelector('#show-single-shade-name').innerHTML = 'Selected Shade: '+ makeTitle(variation.attributes.attribute_pa_shades)
  }
	
	
  if (key === 'attribute_pa_glitter-shades'){
    document.querySelector('#show-single-shade-name').innerHTML = 'Selected Shade: '+ makeTitle(variation.attributes['attribute_pa_glitter-shades'])
  }
	


});

