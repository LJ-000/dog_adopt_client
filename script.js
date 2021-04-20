const BASE_URL = "http://localhost:3000/dogs/"


handleFetch()


function handleFetch(){
    const viewAdoptees = document.querySelector("#")
    fetchButton.addEventListener('click', () => {

        fetch(BASE_URL)
            .then( (res) => res.json() )
            .then( (dogData) => dogData.forEach(renderAdoptees) )
    })
}

function renderAdoptees(dog){
    const dogLi = document.createElement('li')

    dogLi.innerText = dog.name 
    dogLi.innerText = dog.breed
    dogLi.innerHTML = dog.age 
    dogLi.innerHTML = dog.image 

    dogLi.className = "list-group-item"
    
    document.querySelector(".list-group").appendChild(dogLi)
}
