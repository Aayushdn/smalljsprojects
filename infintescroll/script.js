'use strict';

let posts = document.querySelectorAll('.post');
// console.log(posts);

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      //   console.log(entry);
      entry.target.classList.toggle('show', entry.isIntersecting);
      //   if (entry.isIntersecting) animObserver.unobserve(entry.target);
    });
  },
  {
    rootMargin: '100px',
  }
);

const infiObserver = new IntersectionObserver(
  (entries) => {
    if (!entries[0].isIntersecting) return;
    loadNewCard();
    infiObserver.unobserve(entries[0].target);
    infiObserver.observe(document.querySelector('.post:last-child'));
  },
  {
    rootMargin: '50px',
  }
);

infiObserver.observe(document.querySelector('.post:last-child'));

posts.forEach((post) => {
  animObserver.observe(post);
});

const postContainer = document.querySelector('.postContainer');
function loadNewCard() {
  for (let i = 0; i < 10; i++) {
    const html = `
      <div class="post">
          <div class="postHeader">
            <div class="dp">
              <img src="./assets/AvatarMaker.svg" alt="" />
            </div>
            <div class="name">
              <span class="boldText">Aaron Swartz</span><br />
              <span class="lightText">Tuesday, June 12, 2022</span>
            </div>
  
            <div class="menu">
              <img src="./assets/threeDots.svg" alt="" />
            </div>
          </div>
          <div class="postBody">
            <p class="contentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quidem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab
              vero laudantium at, impedit mollitia soluta obcaecati vitae eaque
              veritatis commodi odit facilis. Obcaecati iure repellat vel laborum
              explicabo assumenda rerum voluptas earum quas, reiciendis odit ipsum
              quis vero sint dicta in placeat hic esse nesciunt odio fugiat
              reprehenderit aperiam. Similique unde libero beatae possimus?
            </p>
          </div>
          <div class="postEnd">
            <div class="like feedIcon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272.73 244.8">
                <defs>
                  <style>
                    .cls-1 {
                      fill: transparent;
                      stroke: #e84826;
                      stroke-miterlimit: 10;
                      stroke-width: 15px;
                    }
                  </style>
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      class="cls-1"
                      d="M235.93,138.68,134.05,240.56,32.17,138.68C-47.95,58.55,53.92-43.32,134.05,36.8,222.12-51.26,324,50.62,235.93,138.68Z" />
                  </g>
                </g>
              </svg>
            </div>
            <div class="comment feedIcon">
              <img src="./assets/comment.svg" alt="" />
            </div>
            <div class="share feedIcon">
              <img src="./assets/share-2605.svg" alt="" />
            </div>
          </div>
        </div>`;
    const parser = new DOMParser();
    const elemHTML = parser.parseFromString(html, 'text/html');
    const bodyElem = elemHTML.body;
    const postElements = bodyElem.querySelectorAll('.post');
    console.log(postElements);

    postElements.forEach((postElement) => {
      animObserver.observe(postElement);
      postContainer.append(postElement);
    });
  }
}
