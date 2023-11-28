const url = "http://localhost:3000/pups"
const filterButton = document.querySelector("#good-dog-filer")
let dogsCopy
let displayedDogId

function getDogs()
{
    return fetch(url)
        .then(resp => resp.json())
        .then(dogData => {
            dogData.forEach(dog => createNavBar(dog))

            dogsCopy = dogData
            
            displayDogInfo(dogData[0])

            //filterGoodDog()
        })
}

// function filterGoodDog()
// {
//     filterButton.addEventListener("click", () => {
//         filterButton.innerText.includes("OFF") ? filterButton.innerText = 
//         "Filter good dogs: ON" : filterButton.innerText = "Filter good dogs: OFF"
//         updatedDogBar()
//     })
// }

// function updatedDogBar()
// {
//     if(filterButton.innerText.includes("OFF")
//     {
//         getDogs()
//             .then(dogs => addPupsToDogNavBar(dogs))
//     })

//     else
//     {
//         getDogs()
//             .then(dogs => addPupsToDogNavBar(dogs, true))
//     }
// }

// function addPupsToDogBar(dogData, filter = false)
// {
//     if(filter)
//     {
//         dogData.filter(dog => dog.isGoodDig)
//             .forEach(addDogSpanToNav)
//     }

//     else
//     {
//         dogData.forEach(addDogSpanToNav)
//     }
// }

// function addDogSpanToNav()
// {

// }

function createNavBar(dog)
{
    const dogBarElement = document.getElementById("dog-bar")
    const dogNameSpanElement = document.createElement("span")
    dogNameSpanElement.textContent = dog.name
    dogBarElement.appendChild(dogNameSpanElement)
    
    dogNameSpanElement.addEventListener("click", () => displayDogInfo(dog))
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