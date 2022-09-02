const catagorySection = document.getElementById("catagory-section");

const showCatagory = () => {
  const url1 = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url1)
    .then((res) => res.json())
    .then((datas) => showData(datas.data.news_category));

  showData = (datas) => {
    datas.forEach((data) => {
      console.log(data.category_name);
      const newDiv = document.createElement("li");
      newDiv.innerHTML = `
    <a
                href="#"
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-black dark:hover:bg-gray-700 dark:hover:text-red md:dark:hover:bg-transparent"
                >${data.category_name}</a
              >
    `;
      catagorySection.appendChild(newDiv);
    });
  };
};
showCatagory();
