'use client';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import { discountedPrice, paiseToRupee } from '../../../utils/calculation';
const MyCartPage = () => {
  const { cart } = useGlobalContext();

  const [totalPrice, setTotalPrice] = useState(0);
  const [disPrice, setDisPrice] = useState(0);
  const [totalSavedMoney, setTotalSavedMoney] = useState(0);

  console.log(cart);

  const calculate = () => {
    let toPrice = 0;
    let discountPrice = 0;
    let savedMoney = 0;
    cart.forEach((pro) => {
      toPrice = toPrice + paiseToRupee(pro.price);
      discountPrice =
        discountPrice + paiseToRupee(discountedPrice(pro.price, pro.discount));
    });
    savedMoney = toPrice - discountPrice;
    setTotalPrice(toPrice);
    setDisPrice(discountPrice);
    setTotalSavedMoney(savedMoney);
  };

  useEffect(() => {
    calculate();
  }, [cart]);

  return (
    <div className="grid grid-cols-8 gap-2">
      <section className="col-span-5 border">
        {cart.map((product) => (
          <div className="flex gap-3 items-center">
            <img src={product.product_thumbnail} className="h-40" />
            <div>
              <h3>{product.product_name}</h3>
              <p>Quantity {product.quantity}</p>
              <p>
                &#8377;{' '}
                {paiseToRupee(discountedPrice(product.price, product.discount))}
              </p>
            </div>
          </div>
        ))}
      </section>
      <div className="col-span-3">
        <h3>Total : {totalPrice}</h3>
        <h3>Total Discount : {totalSavedMoney}</h3>

        <h3>Final Amount : {disPrice}</h3>
        <button className="bg-yellow-600 text-white px-5 py-1.5 mt-4 rounded-md">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default MyCartPage;
