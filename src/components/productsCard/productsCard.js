import { Link } from "react-router-dom";

import "./productsCard.css";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StarIcon from "@mui/icons-material/Star";
import ButtinSave from "../buttinSave/buttinSave";
import { currency } from "../../constens/constens";

export default function ProductsCard({
  _id,
  title,
  price,
  priceBeforeDiscount,
  discountPercent,
  imageCover,
  quantity,
  sold,
  ratingsAverage,
  ratingsQuantity,
  save,
}) {
  return (
    <div className="products_card">
      <section className="sec_1">
        <div className="ab_img">
          <Link
            to={`/product/${_id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={imageCover}
              alt=""
              loading="lazy"
              className="img"
              onError={(e) => {
                e.target.src = require("../../imgs/Product image on error.png");
              }}
            />
          </Link>
          <div className="save">
            <ButtinSave _id={_id} save={save} />
          </div>
          <div className="ratingsAverage_and_ratingsQuantity">
            <div className="ratingsAverage">
              <p className="number">{ratingsAverage}</p>
              <StarIcon className="icon" />
            </div>
            <div className="ratingsQuantity">
              <p className="number">{ratingsQuantity}</p>
            </div>
          </div>
        </div>
      </section>
      <Link
        to={`/product/${_id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <section className="sec_2">
          <h1 className="product_title">{title}</h1>
          <div className="price">
            <p className="currency">{currency}</p>
            <p className="number">{price.toFixed(2).replace(".", ",")}</p>
          </div>
          {priceBeforeDiscount && discountPercent ? (
            <div className="ab_discount">
              <p className="price">
                {priceBeforeDiscount.toFixed(2).replace(".", ",") + " " + currency}
              </p>
              <p className="discount">
                {`-${discountPercent}%`}
              </p>
            </div>
          ) : null}
          <div className="sold_and_quantity">
            <div className="sold">
              <div className="ab_icon">
                <ShoppingCartCheckoutIcon className="icon" />
              </div>
              <p className="number">{`${sold} sold recently`}</p>
            </div>
            <div className="quantity">
              <div className="ab_icon">
                <Inventory2Icon className="icon" />
              </div>
              <p className="number" style={{
                color: quantity === 0 && "var(--color-of-error)"
              }}>
                {quantity === 0 ? `Out of stock.` : `only ${quantity} left in stock`}
              </p>
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
}
