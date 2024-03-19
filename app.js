let wainwrightsReturnData;

const getAllWainwrights = async () => {
    const response = await fetch(`https://raw.githubusercontent.com/annahndr/annahndr.github.io/master/wainwrights_data/wainwrights.json`);
    const jsonData = await response.json();
    wainwrightsReturnData = jsonData;
    createWainwrightsList(wainwrightsReturnData);
};

    const wainwrightsList = document.getElementById("wainwrights-list");

    const createWainwrightsList = (wainwrightsData) => {
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

// const button = document.querySelector("button");

// button.addEventListener("click", () => {
//     getAllWainwrights();
// });

const wainwrightsForm = document.getElementById("wainwrights-form");

wainwrightsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = event.target["user-input"].value;

    wainwrightsList.innerText = "";
    const newInput = document.createElement("li");
    const dataToInput = document.createElement("p");

    newInput.appendChild(dataToInput);
    wainwrightsList.appendChild(newInput);

    const filteredData = wainwrightsReturnData.filter((data) => {
        // console.log(data);
        return data.name.toLowerCase().includes(userInput.toLowerCase())
    });
});

getAllWainwrights();