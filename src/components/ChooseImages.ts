import apple from "../assets/images/food/apple.png";
import icecream from "../assets/images/food/icecream.png";
import mochi from "../assets/images/food/mochi.png";
import melon from "../assets/images/food/melon.png";
import burger from "../assets/images/food/burger.png";
import donut from "../assets/images/food/donut.png";

import alien from "../assets/images/space/alien.png";
import astronaut from "../assets/images/space/astronaut.png";
import earth from "../assets/images/space/earth.png";
import flag from "../assets/images/space/flag.png";
import mars from "../assets/images/space/mars.png";
import sun from "../assets/images/space/sun.png";

import car from "../assets/images/toy/car.png";
import crayon from "../assets/images/toy/crayon.png";
import block from "../assets/images/toy/block.png";
import bear from "../assets/images/toy/bear.png";
import magic from "../assets/images/toy/magic.png";
import abacus from "../assets/images/toy/abacus.png";

import flower1 from "../assets/images/plant/flower1.png";
import flower2 from "../assets/images/plant/flower2.png";
import flower3 from "../assets/images/plant/flower3.png";
import flower4 from "../assets/images/plant/flower4.png";
import flower5 from "../assets/images/plant/flower5.png";
import flower6 from "../assets/images/plant/flower6.png";

const foodImages = [apple, icecream, melon, mochi, burger, donut];
const spaceImages = [alien, astronaut, earth, flag, mars, sun];
const toyImages = [car, crayon, block, bear, magic, abacus];
const plantImages = [flower1, flower2, flower3, flower4, flower5, flower6];

const ChooseImages = (category: string) => {
  if (category == "Plant") {
    return plantImages;
  } else if (category == "Space") {
    return spaceImages;
  } else if (category == "Toy") {
    return toyImages;
  } else if (category == "Food") {
    return foodImages;
  } else {
    return foodImages;
  }
};

export default ChooseImages;
