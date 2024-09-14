import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constant";

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const { id } = useParams(); // advance destructuring
  // const {id} = params; // basic destructuring
  // console.log(params);

  useEffect(() => {
    getApiData();
  }, []);

  const url =
    "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING";

  // Fetching API DATA
  async function getApiData() {
    const data = await fetch(url + id);
    const json = await data.json();
    console.log(
      json?.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );

    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    const restaurantData = restaurants.find((val) => val.info.id === id);
    setRestaurant(restaurantData ? restaurantData.info : null);
  }

  // if the restaurant is not found then show the error
  if (!restaurant) {
    return (
      <>
        <div>
          <h1>Loading.........</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>Restaurant id: {id}</h1>
        <h2>{restaurant.name}</h2>
        {restaurant.cloudinaryImageId && (
          <img
            src={IMG_CDN_URL + restaurant.cloudinaryImageId}
            alt={restaurant.name}
          />
        )}
        <h3>{restaurant.avgRating}</h3>
        <h3>{restaurant.costForTwo}</h3>
      </div>
    </>
  );
};

export default RestaurantMenu;

// type.googleapis.com/swiggy.presentation.food.v2.ItemCategory
