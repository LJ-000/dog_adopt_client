const BASE_URL = "http://localhost:3000"

// Initial block
//
createNav()                                             // This should run first
createDivContainer()

createHomePage()

// Create Navigation Bar including 'Home, Listing Dogs for Adoption, Preferences, etc.'
function createNav() {
    const body = document.querySelector('body')
    const newUl = document.createElement('ul')
    body.appendChild(newUl)

    const navItems = ['Home','List A Dog 4 Adoption','View Adoptees', 'My Preferences']
    navItems.forEach(element => {
        const newLi = document.createElement('li')
        newUl.appendChild(newLi)

        const newA = document.createElement('a')
        newA.innerText = element
        newLi.appendChild(newA)
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
    document.getElementById('container').innerText = "Welcome to Dog Adoption"
}

// Load the View Adoption

// Load the List a Dog (Form)

// Load the My Preferences

