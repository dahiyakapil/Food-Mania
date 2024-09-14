import { IMG_CDN_URL } from "../constant";

const Restaurant = ({ name, cuisines, cloudinaryImageId, avgRating }) => {
  // const { name, cuisines, cloudinaryImageId, avgRating } = restaurant.data;
  // console.log(props);

  return (
    <>
      <div
        className="w-60 border border-zinc-600 p-5 m-5 ml-10"
        flex-wrap="true"
      >
        <img className="w-full" src={IMG_CDN_URL + cloudinaryImageId} />
        <h2 className="font-bold text-xl"> {name} </h2>
        <h3 className="text-sm text-zinc-500 mb-2"> {cuisines.join(", ")} </h3>
        <h4 className="text-sm bg-green-600 w-14 text-white font-bold ">
          {avgRating} stars
        </h4>
      </div>
    </>
  );
};

export default Restaurant;
