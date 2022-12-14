const dataLoad = () => {
    url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(response => response.json())
        .then(data => loadDataDisplay(data.data.news_category))
        .catch(error => console.log(error))
}
const loadDataDisplay = (datas) => {
    // console.log(datas);

    const newsContainer = document.getElementById('news-container');
    datas.forEach(data => {
        // console.log(data);

        const { category_name } = data;
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `

             <h5 onclick="loadDataDetails('${data.category_id}')"> ${category_name} </h5>
            
        `;

        newsContainer.appendChild(newsDiv);

    });
}
document.getElementById('news-container').addEventListener('click', function () {
    spiner(true);
})

const spiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    console.log(loaderSection)
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
const loadDataDetails = (id) => {
    // console.log(id);
    url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => loadDataDetailsDisplay(data.data))
        .catch(error => console.log(error))
}


const loadDataDetailsDisplay = (datas) => {
    // console.log(datas);
    if (datas.length === 0) {
        spiner(false)
    }
    datas.sort((a, b) => {
        return b.rating.number - a.rating.number;
    });


    const messageFound = document.getElementById('message-found');
    messageFound.innerText = ''
    const messageDiv = document.createElement('div')
    messageDiv.innerHTML = `
    <h3> ${datas.length === 0 ? "no" : datas.length} items are found </h3>
    `;
    messageFound.appendChild(messageDiv);



    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';


    datas.forEach(data => {
        // console.log(data);
        const { thumbnail_url, title, details, image_url, author, rating } = data
        cardDiv = document.createElement('div');



        cardDiv.innerHTML = `
         <div class="card mb-5">
                <div class="row g-0 shadow-lg">
                    <div class="col-lg-4 col-sm-6">
                        <img src="${thumbnail_url}" class="img-fluid rounded-start p-4 shadow-lg" alt="...">
                    </div>
                    <div class="col-lg-8 col-sm-6">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details.length > 400 ? details.slice(0, 400) + '...' : details}</p>
                             
                           <div class="d-lg-flex">
                             <div>
                             <img src="${author.img}" class="img-fluid rounded-circle" style="width: 8rem;" alt="...">
                             </div>
                            <div class="p-3">
                             <p class="card-text fw-bold"> ${author.name ? author.name : 'name not found'}</p>
                             <p class="card-text text-muted"> ${author.published_date ? author.published_date : 'not found'}</p>
                            </div>
                         <div  class="p-3">
                          <p class="card-text fw-bold"><i class="fa-solid fa-eye"></i> ${rating.number}</p>
                         </div>
                          <div class="p-3">
                         <i class="fa-solid fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         </div>
                          <div  class="p-3">
                           
                             <button onclick="modalDetails('${data._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                       See Details
                       </button>
                          </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
        spiner(false);
    })
}


const modalDetails = (item) => {

    url = `https://openapi.programming-hero.com/api/news/${item}`

    fetch(url)
        .then(response => response.json())
        .then(data => modalDetailsDisplay(data.data))
        .catch(error => console.log(error))
}

const modalDetailsDisplay = (datas) => {
    // console.log(datas);

    const modalSection = document.getElementById('modal-Section');
    modalSection.innerHTML = '';

    datas.forEach(data => {
        const { thumbnail_url, author, total_view, title } = data

        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `

         <h6 class="card-text fw-bold p-3">title: ${title}</h6>
      <img src="${thumbnail_url}" class="img-fluid rounded-start p-5" alt="...">
         <p class="card-text fw-bold ps-3">Author name: ${author.name ? author.name : 'name not found'}</p>
         <p class="card-text fw-bold ps-3">view: ${total_view ? total_view : 'not found'}</p>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

      </div>
    `;
        modalSection.appendChild(modalDiv);
    });

}
// loadDataDetailsDisplay()
dataLoad();