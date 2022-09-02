const catagorySection = document.getElementById("catagory-section");
const sectionItemsFound = document.getElementById("section-itemsFound");

const showCatagory = () => {
  const url1 = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url1)
    .then((res) => res.json())
    .then((datas) => showData(datas.data.news_category));

  showData = (datas) => {
    datas.forEach((data) => {
      //   console.log(data);
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
    .then((newss) => showNewsDetails(newss));

  showNewsDetails = (allNews) => {
    const newss = allNews.data;
    newss.forEach((news) => {
      if (allNews.status != true) {
        sectionItemsFound.innerHTML = `
          0 items found for category ${catagoryName}
          `;
      } else {
        sectionItemsFound.innerHTML = `
          ${newss.length} items found for category ${catagoryName}
          `;
      }
      console.log(news);
    });
  };
};

showCatagory();
