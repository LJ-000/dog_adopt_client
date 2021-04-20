const BASE_URL = "http://localhost:3000/dogs/"

// Initial block
//
createNav()                                             // This should run first
createDivContainer()
handleFetch()

createHomePage()

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
    resetContainer()
    document.getElementById('container').innerText = "Welcome to Dog Adoption"
}

//Reset Container after each navigation bar click
function resetContainer () {
document.querySelector("#container").innerHTML = " "
}

// Load the List a Dog (Form)

// Load the My Preferences


// Add event listener for View Adoptees 
function handleFetch(){
    const viewAdoptees = document.querySelector("#ViewAdoptees")
    viewAdoptees.addEventListener('click', () => {

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
    const dogImg = document.createElement('image')
    dogImg.src = dog.image 
    dogProfile.append(dogImg)

    const dogInfo = ['name', 'breed', 'age']
    dogInfo.forEach (dogLi => {
        const anotherLi = document.createElement('li')
        anotherLi.innerText = dogLi + ": " + dog[dogLi]
    
           dogProfile.append(anotherLi)
})
} 