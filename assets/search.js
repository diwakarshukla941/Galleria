window.onload = function(){
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search)

    if(!search_params.has('q') || search_params.get('q') == ""){
        window.location.href = './'
    }

    fetch(`https://api.unsplash.com/search/photos?per_page=25&query=${search_params.get('q')}&client_id=${API_KEY}`).then(convert_to_json)
    .then((data)=>{
        generateCards(data.results);
        document.getElementsByName('q')[0].value = search_params.get('q ')
        document.getElementById('search_query').innerText = search_params.get('q');
    })
}

const generateCards =(data) =>{
    console.log(data)
    const container = document.getElementById('result_container')
    for(let i = 0;i<data.length;i++){
        const singleItem = data[i];
        const card       = document.createElement('div');
        const anchor     = document.createElement('a');
        const img        = document.createElement('img');

        card.classList.add('item');
        anchor.href = `./details.html?id=${singleItem.id}`;
        card.style.backgroundColor = singleItem.color;
        img.src = singleItem.urls.thumb;

        anchor.appendChild(img);
        card.appendChild(anchor);
        container.appendChild(card);
    }
} 