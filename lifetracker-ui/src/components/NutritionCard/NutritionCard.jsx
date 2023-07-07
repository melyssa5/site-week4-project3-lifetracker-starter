import React from "react";
import "./NutritionCard.css";

const NutritionCard = ({ nutrition }) => {
  console.log("nutrition in NutritionCard:", nutrition);

  function timestamp(stamp) {
    let time = new Date(stamp);
    return time.toLocaleTimeString();
  }

  return (
    <div>
      <div className="nutrition-card">
        <span className="nutrition-date">
          Today at {timestamp(nutrition.created_at)}
        </span>
        <div className="css-2plr3x">
          <div className="css-56yjmq">
            <span className="chakra-avatar css-xw1lzc">
              <div
                role="img"
                aria-label={nutrition.name}
                className="chakra-avatar__initials css-1ebyn6"
              >
                image
              </div>
            </span>
            <div className="css-1kw2fa0">
              <h2 className="chakra-heading css-y5314g">
                {nutrition.name}
                <span className="nutrition-category">{nutrition.category}</span>
              </h2>
            </div>
          </div>
          <div className="white css-1lekzkb">
            <div className="nutrition-calories">
              <dl>
                <dt className="chakra-stat__label css-14go5ty">Calories</dt>
                <dd className="chakra-stat__number css-1axeus7">
                  {nutrition.calories}
                </dd>
              </dl>
            </div>
            <div className="nutrition-quantity">
              <dl>
                <dt className="chakra-stat__label css-14go5ty">Quantity</dt>
                <dd className="chakra-stat__number css-1axeus7">
                  {nutrition.quantity}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
