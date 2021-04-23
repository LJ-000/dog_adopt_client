const BASE_URL = "http://localhost:3000/dogs/"
// Initial block
//
createNav()                                   // This should run first
createDivContainer()                          // default
createHomePage()        // Page "link"
displayDogs()           // Page "link"
displayForm()           // Page "link"
displayPreferences()    // Page "link"
callbackHomePage()      // Load home page
// Create Navigation Bar including 'Home, Listing Dogs for Adoption, Preferences, etc.'
function createNav() {
    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //         <li></li>
    //         <li></li>
    //         <li></li>
    //         <li></li>
    // </nav>
    const body = document.querySelector('body')
    const newNav = document.createElement('nav')
    newNav.className = "navbar navbar-expand-lg navbar-light"
    newNav.style = "background-color: #026670; color: #9FEDD7; width: 100vw"
    body.appendChild(newNav)
    const navItems = ['Home','List A Dog 4 Adoption','View Adoptees', 'My Preferences']
    navItems.forEach(element => {
        const newLi = document.createElement('li')
        newLi.innerText = element
        newLi.id = element.replaceAll(' ','')
        newLi.className = 'mx-auto'
        // newLi.style.color = "white"
        newNav.appendChild(newLi)
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
    home.addEventListener('click', callbackHomePage) 
}

function callbackHomePage () {
        resetContainer()

        // Modify main Div Container
        const container = document.getElementById('container')
        container.className = "row align-items-center"
        container.style = "height: 100vh; width: 100vw; background-color: #FCE181;"

        // Left Div
        const leftDiv = document.createElement('div')
        leftDiv.className = "col" // border border-success
        leftDiv.style = "height: 100vh; width: 45vw"
        // Right Div
        const rightDiv = document.createElement('div')
        rightDiv.className = "col" // border border-primary
        rightDiv.style = "height: 100vh; width: 50vw"
        // Top Right Div
        const topRightDiv = document.createElement('div')
        topRightDiv.className = "text-center" // border border-danger
        topRightDiv.style = "padding-top: 200px; font-size: 7em; color: white; width: 100%;"
        topRightDiv.innerText = "Happy Pups"
        // Horizontal Rule
        const horizontalRule = document.createElement('hr')
        // Bottom Right Div
        const bottomRightDiv = document.createElement('div')
        bottomRightDiv.className = "row text-center" // border border-danger
        bottomRightDiv.innerText = "11 am - 4pm DC’s Baked Joint has selected Happy Pups as their April Rescue Partner! Join us this Saturday, April 24th, for Pupapalooza! A portion of this weekend’s sales will directly support Happy Pup in delivering the best care and happy homes for all of our dogs"
        bottomRightDiv.style = "padding: 2em; background-color: #026670; color: white; opacity: 0.7; margin-top: 5%"

        // Add image
        const newImg = document.createElement('img')
        newImg.src = "https://media3.s-nbcnews.com/j/newscms/2020_32/3401973/senior-dog-food-kr-2x1-tease-200804_2a0cf418702af763dcc6507172e355b3.fit-2000w.jpg"
        newImg.style = "height: 100%; width: auto%;"

        document.getElementById('container').append(leftDiv,rightDiv)
        leftDiv.append(newImg)
        rightDiv.append(topRightDiv, horizontalRule, bottomRightDiv)
}

//Reset Container after each navigation bar click
function resetContainer() {
    // Reset changes made in Home Page (future self: pay attention to the my preferences page with two div's having id of container)
    const container = document.getElementById('container')
    container.className = ""
    container.style = ""

    // The original reset Container clean up line
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
        const container = document.getElementById('container')
        container.style = "background-color: #EDEAE5; height: 120vh;"
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
        // Javascript CSS here: 
        formElem.style = "padding: 5% 10% 5% 10%;"
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
    myPreferences.addEventListener('click', updateDisplayPreferences)
}

//function to reload my preferences page
function updateDisplayPreferences() {

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
                        // debugger
                        // remove dog with div id of 
                        fetch(BASE_URL+adopteeID, {
                            method: "DELETE",
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log("Deleted: "+ adopteeName)
                                //page refresh to not show newly adopted dog 
                                updateDisplayPreferences()
                            })
                    }
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
    // Javascript CSS here: 
    adoptForm.style = "padding-left: 5%; padding-bottom: 5%; margin-top: 5%;"
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
        // debugger
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => data.forEach(renderAdoptees))
    })
}
// Load the View Adoption
// function renderAdoptees(dog){
//     const dogProfile = document.createElement('div')
//     //Within larger div, aka "container" we are adding/appending dogProfile
//     const dogContainer = document.getElementById("container")
//     dogContainer.append(dogProfile)
//     dogContainer.className = "row align-self-md-center margin-top: auto margin-bottom: auto"
//     //creating class name for dog profile card to allow css commands 
//     dogProfile.className = "col border border-white rounded margin-top: auto margin-bottom: auto"
//     dogProfile.style = "background-color: #026670; width: 70%; height: 100%; color: white; display: align-center" 
//     //Adding image
//     const dogImg = document.createElement('img')
//     dogImg.src = dog.image 
//     dogImg.className = "border border-white rounded align-self-center"
//     dogImg.style.width = "40%"
//     dogImg.style.height = "40%"
//     //creating a dataset property for reference in patch request 
//     // saving just incase -- dogImg.dataset.index = dog.id 
//     dogProfile.append(dogImg)
//     const dogInfo = ['name', 'breed', 'age','id']
//     dogInfo.forEach (dogLi => {
//         const anotherLi = document.createElement('li')
//         anotherLi.innerText = dogLi + ": " + dog[dogLi]
//         // // Hide id
//         if(dogLi === 'id'){
//             anotherLi.hidden = true
//             dogProfile.id = dog[dogLi]
//         }
//         dogProfile.append(anotherLi)
//     })
//     createButton(dog)
// } 

// Load the View Adoption
function renderAdoptees(dog){
    // Create a placard for Dog Profile, then migrate everything inside bigger placard
    const dogPlacard = document.createElement('div')
    const dogProfile = document.createElement('div')
    //Within larger div, aka "container" we are adding/appending dogProfile
    const dogContainer = document.getElementById("container")
    dogContainer.append(dogPlacard)     // dogProfile used to be here
    dogPlacard.append(dogProfile)       // dogProfile now lives here
    // Bootstrap rules
    dogContainer.className = "classCont row justify-content-center"
    document.querySelector(".classCont").style = "background-image: url('https://i.pinimg.com/474x/6d/b8/35/6db8354e2f3ab38fb4b0c309a08c8db2.jpg');"
    dogPlacard.className = "" // border border-success
    dogPlacard.style = "width: 33vw"
    //creating class name for dog profile card to allow css commands
    dogProfile.className = "text-center"
    dogProfile.id = "dog-profile"
    document.getElementById("dog-profile").style = "margin: 10%; background-color: #026670; padding-top: 5%; color: white; border: solid white 3px;"
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
        heartButton.style.color = "#9fedd7"
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
        if (+event.target.dataset.clickcount % 2 !== 0) { 
            heartButton.style.color = "#9fedd7";

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