const catagorySection = document.getElementById("catagory-section");
const sectionItemsFound = document.getElementById("section-itemsFound");
const newsArticle = document.getElementById("news-article");
const spinner = document.getElementById("spinner");
const modalTitle = document.getElementById("modal-title");
const authorName = document.getElementById("author-name");
const viewCount = document.getElementById("view-count");
const showSpinner = (tf) => {
  if (tf === true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
// showSpinner(true);

const showCatagory = () => {
  const url1 = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url1)
    .then((res) => res.json())
    .then((datas) => showData(datas.data.news_category))
    .catch("Error Loading API");

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
  showSpinner(true);
  const url2 = `https://openapi.programming-hero.com/api/news/category/${catagoryNo}`;
  fetch(url2)
    .then((res) => res.json())
    .then((allNews) => showNewsDetails(allNews))
    .catch("Error Loading API");

  showNewsDetails = (allNews) => {
    newsArticle.innerHTML = "";
    const newss = allNews.data;

    sectionItemsFound.innerHTML = `
          ${newss.length} items found for category ${catagoryName}
          `;
    newss.forEach((news) => {
      const newDiv1 = document.createElement("div");
      console.log(news._id);
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
            ${news.details.slice(0, 400) + "..."}
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
                  onclick="showInformation('${news._id}')"
                  type="button"
                  class="px-4 py-1.5 bg-red-900 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  See More!
                </button>
            </div>
            </div>
          </div>
        </a>
      `;
      newsArticle.appendChild(newDiv1);
      showSpinner(false);
    });
  };
};

const showInformation = (id) => {
  const url3 = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url3)
    .then((res) => res.json())
    .then((datas) => showInfos(datas.data[0]));

  const showInfos = (data) => {
    if (data.total_view === null) {
      data.total_view = `No Info`;
    }
    if (data.author.name === null) {
      data.author.name = `Author Not Found`;
    }
    modalTitle.innerText = `${data.title}`;
    authorName.innerText = `${data.author.name}`;
    viewCount.innerText = `${data.total_view}`;
  };
};

showCatagory();
