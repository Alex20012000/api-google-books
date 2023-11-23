import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

export default function initSlider() {
  const swiper = new Swiper(".intro__swiper", {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".intro__swiper-pagination",
      clickable: true,
    },
    modules: [Pagination, Autoplay],
  });
}
