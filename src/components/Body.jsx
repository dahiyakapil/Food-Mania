// import { useEffect, useState } from "react";
// import { restaurantList } from "../constant";
// import Restaurant from "../components/Restaurant";

// function filterData(searchText, restaurants) {
//   const filterData = restaurants.filter((restaurants) =>
//     restaurants?.info?.name.toLowerCase().includes(searchText)
//   );

//   return filterData;
// }

// // Conditional rendering
// // if restaurant is empty => shimmar UI
// // if restaurant has data => actual Data UI
// const Body = () => {
//   // const searchText = "hello";

//   const [restaurants, setRestaurants] = useState();
//   const [searchText, setSearchText] = useState(""); // returns = [variable name, function to update the variable]

//   useEffect(() => {
//     getRestaurant();
//   }, []);

//   const url =
//    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"

//   async function getRestaurant() {
//     try {
//       const data = await fetch(url);
//       const json = await data.json();
//       setRestaurants(
//         json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <div>
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchText}
//           onChange={(e) => {
//             setSearchText(e.target.value);
//           }}
//         />
//         <button
//           onClick={() => {
//             // need to filter the data
//             const data = filterData(searchText, restaurants);
//             // update the states - restaurants
//             setRestaurants(data);
//           }}
//         >
//           Search
//         </button>
//       </div>
//       <div className="flex flex-wrap">
//         {restaurants.map((restaurants) => {
//           return <Restaurant {...restaurants?.info} key={restaurant?.info?.id} />;
//         })}
//       </div>
//     </>
//   );
// };

// export default Body;

import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react"; /* This is named export */
import Shimmer from "../components/Shimmer"; /* This is default export */
import { Link } from "react-router-dom";

// Filter the restaurant data according input type
function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}

// Body Component for body section: It contain all restaurant cards
const Body = () => {
  // useState: To create a state variable, searchText, allRestaurants and filteredRestaurants is local state variable
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);

  const url =
    "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING";

  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(url);
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  // if allRestaurants is empty don't render restaurants cards
  if (!allRestaurants) return null;

  return (
    <>
      <div className="flex justify-center items-center mt-5 rounded-lg">
        <input
          className="bg-white border border-zinc-400 p-1 text-black"
          type="text"
          placeholder="Search restaurant..."
          value={searchText}
          // update the state variable searchText when we typing in input box
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="bg-red-600 text-white  p-1"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>

      {errorMessage && (
        <div className="flex justify-center items-center m-5 text-xl text-zinc-600">
          {errorMessage}
        </div>
      )}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap">
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Body;
