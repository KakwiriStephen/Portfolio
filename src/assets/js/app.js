import gsap from "gsap";
import imagesLoaded from "imagesloaded";

import { reviews } from "./data";
const bar = document.querySelector(".loading__bar--inner");
const counter_num = document.querySelector(".loading__counter--number");

let c = 0;

let barInterval = setInterval(() => {
    bar.style.width = c + "%";
    counter_num.innerText = c + "%";
    c++;

    if (c === 101) {
        clearInterval(barInterval);
        gsap.to(".loading__bar", {
            duration: 5,
            rototate: "90deg",
            left: "1000%",
            top: "1000%",
        });
        gsap.to(".loading__text, .loading__counter", {
            duration: 0.5,
            opacity: 0,
        });
        gsap.to(".loading__box", {
            duration: 1,
            height: "500px",
            borderRadius: "50%",
        });
        gsap.to(".loading__svg", {
            duration: 8,
            opacity: 1,
            rotate: "360deg",
        });
        gsap.to(".loading__box", {
            delay: 2,
            duration: 2,
            border: "none",
        });
        imagesLoaded(document.querySelector("img"), () => {
            gsap.to(".loading", {
                delay: 4,
                duration: 2,
                zIndex: -99,
                background: "transaprent",

                opacity: 0,
            });
            gsap.to(".loading__svg", {
                delay: 2,
                duration: 100,
                rotate: "360deg",
            });
            gsap.to("header", {
                duration: 2,
                delay: 4,
                top: "0",
            });
            gsap.to(".socials", {
                duration: 2,
                delay: 4.5,
                bottom: "10rem",
            });
            gsap.to(".scrollDown", {
                duration: 2,
                delay: 5,
                bottom: "3rem",
            });
        });
    }
}, 20);

const swiper_container = document.querySelector(".swiper-wrapper");
reviews.map((review) => {
    let template = `<div class="swiper-slide"> <div class="review"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-quote" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" /> <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" /> </svg> <div class="review__card"> <div class="review__topborder"></div> <div class="review__text"> <span>${review.review.substring(
    0,
    1
  )}</span> ${review.review.substring(
    1,
    review.review.length
  )} </div> <img src=${
    review.image
  } alt="" class="review__img" /> <div class="review__profile"> <span>${
    review.name
  }</span> <span>${review.position}</span> </div> </div> </div> </div>`;
    swiper_container.innerHTML += template;
});

const questions = [...document.querySelectorAll(".question")];
questions.map((question) => {
    let q_text = question.querySelector("h3");
    q_text.addEventListener("click", () => {
        questions
            .filter((q) => q !== question)
            .map((q) => q.classList.remove("open"));

        question.classList.toggle("open");
    });
});