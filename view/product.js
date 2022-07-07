function productSet(p_name,p_id,_id,price,counts){
  let product = `
  <div class="col-3">
    <div class="product">
      <div class="product-header">
        <h3 class="product_name">${p_name}</h3>
      </div>
      <div class="product-body">
        <div class="product-img">
          <img
            src="../public/img/1.jpg"
            alt=""
            class="p-img img-full"
          />
        </div>
        <div class="product-details">
          <p>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Incidunt libero, fugiat tenetur voluptatum possimus
              praesentium nesciunt quasi cupiditate.
            </span>
          </p>
          <p>
            Price :
            <span>Rs. ${price}</span>
          </p>
          <p>
            Purchases :
            <span>${counts} </span>
          </p>
        </div>
      </div>
      <div class="product-footer">
        <div class="btns">
          <button type="button" class="purchase">Purchase</button>
          <button type="button" class="add_to_cart" onclick='function addToCart(${p_id},${_id},${price},${p_name})'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
  return product;
}
