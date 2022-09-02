const dataLoad = () => {
    url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(response => response.json())
        .then(data => loadDataDisplay(data.data.news_category))
}
const loadDataDisplay = (datas) => {

    // console.log(datas);

    const newsContainer = document.getElementById('news-container');
    datas.forEach(data => {
        console.log(data);

        const { category_name } = data;
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
             <h5>${category_name}</h5>
        `;
        newsContainer.appendChild(newsDiv)

    });
}
dataLoad();