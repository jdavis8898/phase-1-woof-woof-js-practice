const url = "http://localhost:3000/pups"


let dogsCopy
let displayedDogId
let goodDogList

function getDogs()
{
    fetch(url)
        .then(resp => resp.json())
        .then(dogData => {

            dogsCopy = dogData

            createNavBar(dogData)
            
            displayDogInfo(dogData[0])

            const filterButton = document.querySelector("#good-dog-filter")
            filterButton.addEventListener("click", () => filterGoodDog(dogData))
        })
}

function filterGoodDog(dogs)
{
    const filterButton = document.querySelector("#good-dog-filter")

    goodDogList = []
    const dogBarElement = document.getElementById("dog-bar")
    dogBarElement.innerText = ""

    if (filterButton.innerText.includes("OFF"))
    {
        filterButton.innerText = "Filter good dogs: ON"

        dogs.forEach(dog => 
        {
            if (dog.isGoodDog)
            {
                goodDogList.push(dog)
            }
        })

        createNavBar(goodDogList)
    }

    else
    {
        filterButton.innerText = "Filter good dogs: OFF"
        createNavBar(dogsCopy)
    }
}

function createNavBar(dogs)
{
    if (dogs.length > 0)
    {
        dogs.forEach(dog=> {
            const dogBarElement = document.getElementById("dog-bar")
            const dogNameSpanElement = document.createElement("span")
            dogNameSpanElement.textContent = dog.name
            dogBarElement.appendChild(dogNameSpanElement)
    
            dogNameSpanElement.addEventListener("click", () => displayDogInfo(dog))
        })
    }

    else
    {

        // displayedImgElement.src = ""
        // displayedNameElement. textContent = "No good dog to display"
        // goodBadButtonElement.textContent = "Error"

        alert("Oh no! There are no good dogs!")
    }
}

function displayDogInfo(dog)
{
    displayedDogId = dog.id
    const dogInfoElement = document.querySelector("#dog-info")

    dogInfoElement.innerHTML = ""

    const displayedImgElement = document.createElement("img")
    const displayedNameElement = document.createElement("h2")
    const goodBadButtonElement = document.createElement("button")

    displayedImgElement.src = dog.image
    displayedNameElement. textContent = dog.name
    goodBadButtonElement.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"

    dogInfoElement.append(displayedImgElement, displayedNameElement, goodBadButtonElement)

    goodBadButtonElement.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog

        let updatingData = {isGoodDog: dog.isGoodDog}

        patchDogStatus(displayedDogId, updatingData)
            .then(updatedDog=> {
                goodBadButtonElement.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
            })
    })
}

function patchDogStatus(urlId, updatingData)
{
    return fetch(`${url}/${urlId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatingData)
    })
    .then(resp => resp.json())
}

getDogs()