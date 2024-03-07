//slider tour detail
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  thumb: {
    swiper: imagesThumb
  }
});
//End slider tour detail

//Thông báo thêm vào giỏ hàng thành công
const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]");
  elementAlert.classList.remove("alert-hidden");
  
  setTimeout(() => {
    elementAlert.classList.add("alert-hidden");
  }, 3000);

  const closeAlert = elementAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    elementAlert.classList.add("alert-hidden");
  })
}
// Hết Thông báo thêm vào giỏ hàng thành công

//Mini cart
const showMiniCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if(cart){
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const miniCart = document.querySelector("[mini-cart]");
    miniCart.innerHTML = totalQuantity;
  }
  
}
showMiniCart();
//End mini cart

//Cart
// Kiểm tra xem localStorage có tồn tại cart chưa, nếu chưa thì phải tạo cart mới
const cart = localStorage.getItem("cart");
if(!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Thêm tour vào cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();

    const quantity = parseInt(event.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));


    if(quantity > 0 && tourId) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const isExistTour = cart.findIndex(item => item.tourId == tourId);

      if(isExistTour == -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      } else {
        cart[isExistTour].quantity = cart[isExistTour].quantity + quantity;
      }

      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSuccess();

      showMiniCart();
    }
  });
}