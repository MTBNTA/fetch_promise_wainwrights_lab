// create global variable
let wainwrightsReturnData;

const wainwrightsList = document.getElementById("wainwrights-list");

// #1: grab data from API/resource
const getAllWainwrights = async () => {
    // create async function
    try {
        const response = await fetch("https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json");
        const jsonData = await response.json();
        //assign response to wainwrightsReturnData global variable
        wainwrightsReturnData = jsonData;
    
        mapWainwrights(wainwrightsReturnData);
    } catch (error) {
        alert("Oops, something went wrong, please try again later!")
        // call function to send actual error message with code included
        // through a monitoring tool/logging tool
    }
};

// #2: display wainwrights info, create list to populate
const mapWainwrights = (wainwrightsArray) => {
    // inner text of list set to an empty string, so we can filter and change what's inside
    wainwrightsList.innerText = "";

    // create li element for each wainwright
    for (wainwright of wainwrightsArray){
        let wainwrightsData = document.createElement("li");

        addWainwrightInfoToElement(wainwrightsData);
        wainwrightsList.appendChild(wainwrightsData);
    }
};

// #3: add info to each element
const addWainwrightInfoToElement = (data) => {
    wainwrightsReturnData.forEach((data) => {
        const wainwrightName = document.createElement("li");
        console.log(data);
        wainwrightName.innerText = data.name;
        wainwrightsList.appendChild(wainwrightName);

        const wainwrightHeightMetres = document.createElement("p");
        wainwrightHeightMetres.innerText = "Height in metres: " + data.heightMetres;
        wainwrightsList.appendChild(wainwrightHeightMetres);

        const wainwrightArea = document.createElement("p");
        wainwrightArea.innerText = "Area name:  " + data.area.areaName;
        wainwrightsList.appendChild(wainwrightArea);
    });   
};

// #4: filtering
const wainwrightsForm = document.getElementById("wainwrights-form");

wainwrightsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // clean whole list before filtering then repopulate
    wainwrightsList.innerText = "";
    let userInput = event.target["user-input"].value.toLowerCase();
    console.log(userInput);
    filterWainwrights(userInput);
});

// 4i: filter wainwright function
const filterWainwrights = async (userInput) => {
    let filteredList = await wainwrightsReturnData.filter(wainwright => wainwright.name.toLowerCase().includes(userInput));
    mapWainwrights(filteredList);
};

getAllWainwrights();