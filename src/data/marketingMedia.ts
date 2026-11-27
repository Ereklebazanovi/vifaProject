import foodPhotos from "./galleries/food.json";

export const foodReel = "/gallery/food/reel.mp4";
export const foodReelPoster = "/gallery/food/reel-poster.webp";
export const foodPhoto = (number: number) => foodPhotos[number - 1];

