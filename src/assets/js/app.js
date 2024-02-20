import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

import { reviews } from "./data";
import { projects } from "./projects";
const bar = document.querySelector(".loading__bar--inner");
const counter_num = document.querySelector(".loading__counter--number");

//scrollbar
class DisableScrollPlugin extends ScrollbarPlugin {
  static pluginName = "disableScroll";

  static defaultOptions = {
    direction: "",
  };

  transformDelta(delta) {
    if (this.options.direction) {
      delta[this.options.direction] = 0;
    }

    return { ...delta };
  }
}

// load the plugin
Scrollbar.use(DisableScrollPlugin);

class AnchorPlugin extends ScrollbarPlugin {
  static pluginName = "anchor";

  onHashChange = () => {
    this.jumpToHash(window.location.hash);
  };

  onClick = (event) => {
    const { target } = event;

    if (target.tagName !== "A") {
      return;
    }

    const hash = target.getAttribute("href");

    if (!hash || hash.charAt(0) !== "#") {
      return;
    }

    this.jumpToHash(hash);
  };

  jumpToHash = (hash) => {
    const { scrollbar } = this;

    if (!hash) {
      return;
    }

    // reset scrollTop
    scrollbar.containerEl.scrollTop = 0;

    scrollbar.scrollIntoView(document.querySelector(hash));
  };

  onInit() {
    this.jumpToHash(window.location.hash);

    window.addEventListener("hashchange", this.onHashChange);

    this.scrollbar.contentEl.addEventListener("click", this.onClick);
  }

  onDestory() {
    window.removeEventListener("hashchange", this.onHashChange);

    this.scrollbar.contentEl.removeEventListener("click", this.onClick);
  }
}

// usage
Scrollbar.use(AnchorPlugin);

let c = 0;

let barInterval = setInterval(() => {
  bar.style.width = c + "%";
  counter_num.innerText = c + "%";
  c++;

  if (c === 101) {
    clearInterval(barInterval);
    gsap.to(".loading__bar", {
      duration: 3,
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

      setTimeout(() => {
        let options = {
          damping: 0.1,
          alwaysShowTracks: true,
          plugins: {
            disableScroll: {
              direction: "x",
            },
          },
        };
        let pageSmoothScroll = Scrollbar.init(document.body, options);
        pageSmoothScroll.track.xAxis.element.remove();
      }, 4000);
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

// projects
// Assuming you have a container element to hold the projects
const projectContainer = document.querySelector(".projects");

// Loop through the projects and create the HTML structure dynamically
projects.forEach((project, index) => {
  const projectElement = document.createElement("div");
  projectElement.classList.add("project");
  projectElement.innerHTML = `
      <div class="project__header">
        <span>${index + 1}/8</span>
        <span>Feb 2024</span>
      </div>
      <div class="project__infos">
        <h1 class="project__infos--name">
          ${project.name} <span>(${project.description})</span>
        </h1>
      </div>
      <div class="project__img">
        <img src="${project.imageSrc}" alt="" />
        <div class="project__links">
          <a href="${project.githubLink}" target="_blank">
            <button class="coolButton">
              <span>Github</span>
            </button>
          </a>
          <a href="${
            project.liveVersionLink
          }" class="coolCircleEyeButton" target="_blank">
          <svg class="textcircle" viewBox="0 0 500 500">
          <defs>
            <path
              id="textcircle"
              d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
            />
          </defs>
          <text>
            <textPath
              xlink:href="#textcircle"
              aria-label=".Click to see the live version."
              textLength="900"
            >
              .Click to see the live version.
            </textPath>
          </text>
        </svg>
        <svg
          class="eye"
          aria-hidden="true"
          class="eye"
          viewBox="0 0 70 70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="eye__outer"
            d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
          />
          <path
            class="eye__lashes-up"
            d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
          />
          <path
            class="eye__lashes-down"
            d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
          />
          <circle class="eye__iris" cx="35" cy="35.31" r="5.221" />
          <circle class="eye__inner" cx="35" cy="35.31" r="10.041" />
        </svg>
          </a>
        </div>
        <div class="project__tags">
          ${project.tags
            .map(
              (tag) => `
            <a href="#" class="coolFunnyLink" title="${tag}">
              <span>${tag}</span>
              <svg width="100%" height="9" viewBox="0 0 101 9">
                <!-- SVG path for tag -->
              </svg>
            </a>
          `
            )
            .join("")}
        </div>
      </div>
    `;

  projectContainer.appendChild(projectElement);
});
