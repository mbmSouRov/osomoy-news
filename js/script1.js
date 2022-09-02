const catagorySection = document.getElementById("catagory-section");
const sectionItemsFound = document.getElementById("section-itemsFound");
const newsArticle = document.getElementById("news-article");

const showCatagory = () => {
  const url1 = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url1)
    .then((res) => res.json())
    .then((datas) => showData(datas.data.news_category));

  showData = (datas) => {
    datas.forEach((data) => {
      const newDiv = document.createElement("li");
      newDiv.innerHTML = `
    <a
                style="cursor: pointer"
                onclick="showNews('${data.category_id}','${data.category_name}')"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-red-900 dark:hover:bg-gray-700 dark:hover:text-red md:dark:hover:bg-transparent"
                >${data.category_name}</a
              >
    `;
      catagorySection.appendChild(newDiv);
    });
  };
};
const showNews = (catagoryNo, catagoryName) => {
  const url2 = `https://openapi.programming-hero.com/api/news/category/${catagoryNo}`;
  fetch(url2)
    .then((res) => res.json())
    .then((allNews) => showNewsDetails(allNews));

  showNewsDetails = (allNews) => {
    newsArticle.innerHTML = "";
    const newss = allNews.data;

    sectionItemsFound.innerHTML = `
          ${newss.length} items found for category ${catagoryName}
          `;
    newss.forEach((news) => {
      const newDiv1 = document.createElement("div");
      if (news.author.published_date === null) {
        news.author.published_date = `Date Not Found`;
      }
      if (news.total_view === null) {
        news.total_view = `No Info`;
      }
      if (news.author.name === null) {
        news.author.name = `Name Not Found`;
      }
      newDiv1.innerHTML = `
      <a
          class="flex flex-col items-center bg-white rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-white dark:hover:bg-gray-200 mb-4"
        >
          <img
            class="object-cover w-full h-full rounded-t-lg md:h-1/2 md:w-1/2 md:rounded-none md:rounded-l-lg p-2"
            src="${news.thumbnail_url}"
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5
              class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black"
            >
              ${news.title}
            </h5>
            <p class="mb-3 text-sm text-gray-700 dark:text-gray-700">
            ${news.details.slice(0, 400)}
            </p>
            <!-- END SECTOPM -->
            <div
              class="mt-4 flex flex-col gap-0 justify-between items-center sm:flex-row"
            >
              <!-- Image + Name + Date -->
              <div class="flex items-center gap-2">
                <img
                  class="w-7 h-7 rounded-full"
                  src="${news.author.img}"
                  alt=""
                />
                <div>
                  <p class="text-sm text-black">${news.author.name}</p>
                  <p class="text-xs text-slate-400">${
                    news.author.published_date
                  }</p>
                </div>
              </div>
              <div class="flex items-baseline gap-2">
                <i class="fa fa-light fa-eye"></i>
                <p class="font-semibold text-slate-700">${news.total_view}</p>
              </div>
              <!-- Stars -->
              <div>
                <i class="fa fa-regular fa-star-half-stroke text-gray-700"></i>
                <i class="fa fa-regular fa-star text-gray-700"></i>
                <i class="fa fa-regular fa-star text-gray-700"></i>
                <i class="fa fa-regular fa-star text-gray-700"></i>
                <i class="fa fa-regular fa-star text-gray-700"></i>
              </div>
              <div>
              <!-- Modal toggle -->
              <button
                class="block text-red-900 border bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center dark:bg-white dark:hover:text-white dark:hover:bg-red-900"
                type="button"
                data-modal-toggle="modal"
              >
                See More!
              </button>

              <!-- Main modal -->
              <div
                aria-hidden="true"
                class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
                id="modal"
                tabindex="-1"
                aria-modal="false"
              >
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                  <!-- Modal content -->
                  <div
                    class="relative bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <!-- Modal header -->
                    <div
                      class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
                    >
                      <h3
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                      >
                        Terms of Service
                      </h3>
                      <button
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="defaultModal"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                      <p
                        class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                      >
                        With less than a month to go before the European Union
                        enacts new consumer privacy laws for its citizens,
                        companies around the world are updating their terms of
                        service agreements to comply.
                      </p>
                      <p
                        class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
                      >
                        The European Union's General Data Protection
                        Regulation (G.D.P.R.) goes into effect on May 25 and
                        is meant to ensure a common set of data rights in the
                        European Union. It requires organizations to notify
                        users as soon as possible of high-risk data breaches
                        that could personally affect them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </a>
      `;
      newsArticle.appendChild(newDiv1);
    });
  };
};

showCatagory();
