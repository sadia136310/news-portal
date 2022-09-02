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
        // console.log(data);

        const { category_name } = data;
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
             <h5 onclick="loadDataDetails('${data.category_id}')">${category_name}</h5>

        `;
        newsContainer.appendChild(newsDiv);

    });
}

const loadDataDetails = (id) => {
    // console.log(id);
    url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(response => response.json())
        .then(data => loadDataDetailsDisplay(data.data))
}

const loadDataDetailsDisplay = (datas) => {
    console.log(datas);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    datas.forEach(data => {
        // console.log(data);

        const { thumbnail_url, title, details, image_url, author, total_view } = data
        cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
         <div class="card mb-5">
                <div class="row g-0 shadow-lg">
                    <div class="col-lg-3 col-sm-6">
                        <img src="${thumbnail_url}" class="img-fluid rounded-start p-4 shadow-lg" alt="...">
                    </div>
                    <div class="col-lg-9 col-sm-6">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details}</p>
                             
                           <div class="d-flex g-5">
                             <div>
                             <img src="${author.img}" class="img-fluid rounded-circle" style="width: 6rem;"alt="...">
                             </div>
                            <div class="p-3">
                             <p class="card-text fw-bold"> ${author.name}</p>
                             <p class="card-text text-muted"> ${author.published_date}</p>
                            </div>
                         <div  class="p-3">
                          <p class="card-text fw-bold">view : ${total_view}</p>
                         </div>
                          <div  class="p-3">
                         <i class="fa-solid fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         <i class="fa-regular fa-star text-warning"></i>
                         </div>
                          <div  class="p-3">
                           
                             <button onclick="modalDetails()" type="button" class="btn btn-primary" data-bs-toggle="modal"    data-bs-target="#exampleModal">
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
    })
}

const modalDetails = () => {

    url = 'https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a'
    fetch(url)
        .then(response => response.json())
        .then(data => modalDetailsDisplay(data.data[0]))
}

const modalDetailsDisplay = (datas) => {
    console.log(datas);



    const modalSection = document.getElementById('modal-section');
    const { thumbnail_url, title, details, image_url, author, total_view } = datas;
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    
     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <p class="card-text fw-bold">Author name: ${author.name === null ? author.name('not found') : author.name}</p>
         <p class="card-text fw-bold">Author name: ${total_view}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    `
    modalSection.appendChild(modalDiv)

}
// loadDataDetailsDisplay()
dataLoad();