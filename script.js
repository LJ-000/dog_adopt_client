const BASE_URL = "http://localhost:3000/dogs/"
// Initial block
//
createNav()                                   // This should run first
createDivContainer()                          // default
createHomePage()        // Page "link"
displayDogs()           // Page "link"
displayForm()           // Page "link"
displayPreferences()    // Page "link"
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
    document.querySelectorAll('#container').forEach(elem => {elem.innerHTML = ""})
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
                .then(data => {
                    // add new P that says 'Submitted!
                    const newP = document.createElement('p')
                    newP.innerText = 'Submitted Dog 4 Adoption!'
                    document.getElementById('container').appendChild(newP)
                })
        })
    })
}
// Load the My Preferences
function displayPreferences() {
    const myPreferences = document.querySelector("#MyPreferences")
    myPreferences.addEventListener('click', (event) => {
        resetContainer()
        // Show dogs that have been liked
        // I temporarily made Lucky's and Luna's like: true so we can have an example
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                const myDogs = []
                data.forEach(element => {
                    if(element.likes === true) {
                        // If dog is liked, display this dog
                        renderAdoptees(element)
                        myDogs.push(element.id)
                    }
                })
                // Create Adopt me button
                adoptMeButton(data,myDogs)
                // If Adopt me button is clicked, remove dog
                document.getElementById('adopt-me').addEventListener('submit', (event) => {
                    event.preventDefault()
                    // Remove dog
                    // convert Lucky to id
                    const adopteeName = event.target.children[1].value // this tells u which dog
                    const adopteeArray = [] // stores all possibilities in container
                    myDogs.forEach(elem => {
                        const str = document.getElementById(elem).children[1].innerText
                        // str.slice(6,str.length)
                        adopteeArray.push(str.slice(6,str.length))
                    })
                    // Tell us which divider contains the dog
                    adopteeArray.forEach(elem => {
                        if(elem === adopteeName){
                            const indexID = adopteeArray.indexOf(elem)
                            const adopteeID = myDogs[indexID]
                            debugger
                            // remove dog with div id of 
                            fetch(BASE_URL+adopteeID, {
                                method: "DELETE",
                            })
                                .then(res => res.json())
                                .then(console.log("Deleted: "+ adopteeName))
                        }
                    })
                })
            })
    })
}
function adoptMeButton(data,dogs) {
    // Button will have a select drop down of liked dogs
    // Submit button says "adopt me"
    // on Submit, remove dog from library
    // somehow match current iteration with dog profile button, need dog id in div or something else
    // Create drop down
    // <form id='adopt-me'>
    //     <label for="dogs">Choose a dog:</label>
    //     <select name="dogs" id="dogs">
    //         <option value="Lucy">Lucy</option>
    //         <option value="Taco">Taco</option>
    //         <option value="Waco">Waco</option>
    //     </select>
    //     <br><br>
    //     <input type="submit" value="Submit">
    // </form>
    // Div after container
    const newNewDiv = document.createElement('div')
    newNewDiv.id = "container"
    document.querySelector('body').appendChild(newNewDiv)
    // Form
    const adoptForm = document.createElement('form')
    adoptForm.id = "adopt-me"
    newNewDiv.appendChild(adoptForm)
    // Label
    const newLabel = document.createElement('label')
    newLabel.for = "dogs"
    newLabel.innerText = "Who would you like to adopt?"
    // Select
    const newSelect = document.createElement('select')
    newSelect.name = 'dogs'
    newSelect.id = 'select-dogs'
    // Breaker
    const newBreaker = document.createElement('br')
    adoptForm.append(newLabel, newSelect, newBreaker)
    // Options
    // Get all liked dogs names into array
    const dogNames = []
    dogs.forEach(element => {
        dogNames.push(data[element-1].name)
    })
    // Create all options
    // Default Options
    // const newOption = document.createElement('option')
    // newOption.value = 'Please select'
    // newOption.innerText = 'Please select'
    // document.getElementById('select-dogs').appendChild(newOption)
    // All liked dog Options
    dogNames.forEach(element => {
        const newOption = document.createElement('option')
        newOption.value = element
        newOption.innerText = element
        // Append Option under Select
        document.getElementById('select-dogs').appendChild(newOption)
    })
    // Create Input
    const newInput = document.createElement('input')
    newInput.type = 'submit'
    newInput.value = 'Adopt Me!'
    adoptForm.append(newInput)
}
// Add event listener for View Adoptees 
function displayDogs(){
    const viewAdoptees = document.querySelector("#ViewAdoptees")
    viewAdoptees.addEventListener('click', () => {
        resetContainer()
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => data.forEach(renderAdoptees))
    })
}
// Load the View Adoption
function renderAdoptees(dog){
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
    const dogInfo = ['name', 'breed', 'age','id']
    dogInfo.forEach (dogLi => {
        const anotherLi = document.createElement('li')
        anotherLi.innerText = dogLi + ": " + dog[dogLi]
        // // Hide id
        if(dogLi === 'id'){
            anotherLi.hidden = true
            dogProfile.id = dog[dogLi]
        }
        dogProfile.append(anotherLi)
    })
    createButton(dog)
} 
// Write a function that will add "<3" after 3rd li
function createButton(dogParam) {
    // Create heart button
    const heartButton = document.createElement('i')
    heartButton.className = 'bi bi-heart'
    heartButton.dataset.index = dogParam.id

    // This section makes sure heart button reflects the database
    // if dogParam.likes = false, make it black & set click count
    if(dogParam.likes === false) {
        heartButton.style.color = "black"
        heartButton.dataset.clickcount = +0
    }
    // if dogParam.likes = true, make it red
    if(dogParam.likes === true) {
        heartButton.style.color = "red"
        heartButton.dataset.clickcount = +1
    }

    document.getElementById(dogParam.id).append(heartButton)

    // Add click event that will change <3 to red & patches like from false to true in server then shows it on My Preferences
    heartButton.addEventListener("click", clickFunction) 
    function clickFunction(event) {
        const dogId =  event.target.dataset.index
        //debugger

        // In fetch check to see if likes = true or false in database
        // Sets clickcount equal to even/odd
        
// ** This is what we needed to comment out. It was redundant? I guess`     

        // fetch(BASE_URL+dogId)
        //     .then(res => res.json())
        //     .then(data => {
        //         data.likes === false? event.target.dataset.clickcount = +0 : event.target.dataset.clickcount = +1
        //     })
    
        event.target.dataset.clickcount = +event.target.dataset.clickcount + 1
        console.log(event.target.dataset.clickcount)
        if (+event.target.dataset.clickcount % 2 !== 0) { 
            heartButton.style.color = "red";

            fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({likes: true}),
            })
            .then(res => res.json())
            .then()
        }

        if (+event.target.dataset.clickcount % 2 === 0) {
            heartButton.style.color = "black";
            // event.target.removeEventListener("click", clickFunction);
            fetch(`http://localhost:3000/dogs/${dogId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({likes: false}),
            })
                .then((r) => r.json())
                .then()
        }   
}
}