const BASE_URL = "http://localhost:3000/dogs/"

// Initial block
//
createNav()                                   // This should run first
createDivContainer()                          // default
createHomePage()        // Page "link"
displayDogs()           // Page "link"
displayForm()           // Page "link"

// Create Navigation Bar including 'Home, Listing Dogs for Adoption, Preferences, etc.'
function createNav() {
    const body = document.querySelector('body')
    const newUl = document.createElement('ul')
    body.appendChild(newUl)

    const navItems = ['Home','List A Dog 4 Adoption','View Adoptees', 'My Preferences']
    navItems.forEach(element => {
        const newLi = document.createElement('li')
        newLi.innerText = element
        newLi.id = element.replaceAll(' ','')
       
        newUl.appendChild(newLi)
    })
}

// Create our primary container which will display web pages
function createDivContainer() {
    const body = document.querySelector('body')
    const newDiv = document.createElement('div')
    newDiv.id = "container"
    body.appendChild(newDiv)
}

// Load the Home Page
function createHomePage() {
    const home = document.querySelector("#Home")
    home.addEventListener('click', () => {
        resetContainer()
        document.getElementById('container').innerText = "Welcome to Dog Adoption"
    })
}

//Reset Container after each navigation bar click
function resetContainer() {
    document.querySelector("#container").innerHTML = ""
}

// Load the List a Dog (Form)
function displayForm() {
    const liForm = document.querySelector("#ListADog4Adoption")
    liForm.addEventListener('click', (event) => {
        resetContainer()

        // Create form below to contain
        //  name, breed, age, image
        // <form id="dog-form">
        //     <div class="form-group">
        //         <label for="dog-name">Name</label>
        //         <input name="dogName" type="text" class="form-control" id="dog-name" placeholder="Enter a dog name" >
        //     </div>
        //     <div class="form-group">
        //         <label for="dog-breed">Breed</label>
        //         <input name="dogBreed" type="text" class="form-control" id="dog-breed" placeholder="Enter a dog breed" >
        //     </div>
        //     <div class="form-group">
        //         <label for="dog-age">Age</label>
        //         <input name="dogAge" type="text" class="form-control" id="dog-age" placeholder="Enter dog's age" >
        //     </div>
        //     <div class="form-group">
        //         <label for="dog-img">Upload a Photo</label>
        //         <input name="dogImg" type="text" class="form-control" id="dog-img" placeholder="Enter url of dog's photo" >
        //     </div>
        // </form>

        // Create form
        const formElem = document.createElement('form')
        formElem.id = "dog-form"

        // Create each form group
        const formItems = ['name','breed','age','img']
        formItems.forEach(element => {
            // Create div wrapper
            const newDiv = document.createElement('div')
            newDiv.className = "form-group"
            formElem.appendChild(newDiv)

            // Create label and input
            const upperCaseElem = element[0].toUpperCase()+element.slice(1,element.length)
            const newLabel = document.createElement('label')
            newLabel.for = `dog-${element}`
            newLabel.innerText = upperCaseElem + ": "

            const newInput = document.createElement('input')
            newInput.name = `dog${upperCaseElem}`
            newInput.className = "form-control"
            newInput.id = `dog-${element}`
            newInput.placeholder = `Enter dog ${element}`

            // Append Label and Input
            newDiv.append(newLabel, newInput)
        })

        // Append to container
        document.getElementById('container').appendChild(formElem)

        // Add Submit button
        const newInput = document.createElement('input')
        newInput.type = "submit"
        formElem.appendChild(newInput)

        // Add event listener for submit form 
        formElem.addEventListener('submit', e => {
            e.preventDefault()

            // Post new dog to server, and don't need to reflect on DOM
            // since displayDogs does that for us already
            const postObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": e.target.children[0].children[1].value,
                    "breed": e.target.children[1].children[1].value,
                    "age": e.target.children[2].children[1].value,
                    "image": e.target.children[3].children[1].value,
                    "likes": false
                })
            }
            fetch(BASE_URL, postObj)
                .then(res => res.json())
                .then(data => data)
        })

    })
}

// Load the My Preferences


// Add event listener for View Adoptees 
function displayDogs(){
    // debugger
    const viewAdoptees = document.querySelector("#ViewAdoptees")
    viewAdoptees.addEventListener('click', () => {
        resetContainer()
        fetch(BASE_URL)
            .then( (res) => res.json() )
            // .then (console.log("Hello"))
            .then( (dogData) => dogData.forEach(renderAdoptees) )
    })
}

// Load the View Adoption
function renderAdoptees(dog){
    // debugger
    const dogProfile = document.createElement('div')
    //Within larger div, aka "container" we are adding/appending dogProfile
    document.querySelector("#container").append(dogProfile)
    //Adding image
    const dogImg = document.createElement('img')
    dogImg.src = dog.image 
    dogImg.style.width = "100px"
    dogImg.style.height = "100px"
    //creating a dataset property for reference in patch request 
    // saving just incase -- dogImg.dataset.index = dog.id 

    dogProfile.append(dogImg)
    createButton(dog)

    const dogInfo = ['name', 'breed', 'age']
    dogInfo.forEach (dogLi => {
        const anotherLi = document.createElement('li')
        anotherLi.innerText = dogLi + ": " + dog[dogLi]
    
           dogProfile.append(anotherLi)
})
} 

//write a function that will add “<3” after 3rd li
function createButton(dogParam) {
    // console.log(“heerroo”)
    const heartButton = document.createElement('img')
    heartButton.src = "../dog_adopt_backend/png-transparent-computer-icons-icon-design-like-button-heartshaped-love-heart-heartshaped-vector.png"
    // heartButton.style.border = “#0000FF”
    heartButton.style.width = "20px"
    heartButton.style.height = "15px"

    heartButton.dataset.index = dogParam.id 

    document.querySelector("#container").append(heartButton)
    
    //add click event that will change <3 to red & patches like from false to true in server then shows it on My Preferences
    
    heartButton.addEventListener ("click", clickFunction) 
    function clickFunction (event) {
        // debugger
        const dogId =  event.target.dataset.index

        fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({likes: true}),
        })
        .then((r) => r.json())
        .then((data) => { ()
            
            //document.body.style.background = "red";
            

        })
    }
    }