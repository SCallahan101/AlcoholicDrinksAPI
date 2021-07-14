
// API CONNECTIONS
const filterSearchAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
const popularDrinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php";
const randomDrinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const selectedIdSearchAPI = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php";

// Buttons Pathways
function goBack(){
    console.log("Previous Button clicked");
    window.history.back();
}

function goBackToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

$(document).on('submit', '#searchForm', function(e){
    e.preventDefault();
    $('#searchResultList').html(``);
    document.getElementById("goTopButton").style.visibility = "visible";
    let userInputValue = $('.searchValue').val();
    console.log('Value: ' + userInputValue);
    searchInfoPage(userInputValue);
    localStorage.setItem("searchTerm", userInputValue);
});

function searchInfoPage(userInputValue){
    let query = {
        i: `${userInputValue}`
    }
    $.getJSON(filterSearchAPI, query, function(inputData){
        console.log("It works :)");
        console.log("Received the list with selected ingredient " + JSON.stringify(inputData.drinks));
        let searchData = inputData.drinks;
        searchData.forEach(function(drinkData, i){
            console.log("Name of Drink: " + i + " " + drinkData.strDrink);
            let name = drinkData.strDrink;
            console.log("Name of Drink: " + drinkData.strDrinkThumb);
            let srcLink = drinkData.strDrinkThumb;
            console.log("Drink ID: " + drinkData.idDrink);
            let drinkID = drinkData.idDrink;
            $('#searchResultList').append(`
               <button class="drinkDataCube" value="${drinkID}">
                    <img src="${srcLink}" alt="${name}" class="drinkImg">
                    <div class="drinkName">${name}</div>
               </button>
            `);
        });
        $('.drinkDataCube').click(function(){
            document.getElementById("goTopButton").style.visibility = "hidden";
            let selectedDrinkValue = $(this).val();
            console.log('DataCube has been clicked! - ' + selectedDrinkValue);
            infoOnSelectedDrink(selectedDrinkValue);
        });
    });
}
function infoOnSelectedDrink(selectedData){
    let query = {
        i: `${selectedData}`
    }
    $.getJSON(selectedIdSearchAPI, query, function(outputData){
        console.log("Retrieval data starting: ");
        console.log("Received the list with selected ingredient " + JSON.stringify(outputData.drinks));
        $('#pathwayBox').html(`<button id="backToList" class="pageButton mainMenu psButton" onclick="backToSearchList()"><span>Back to List</span></button>
        <button class="pageButton mainMenu psButton"><span>Main Menu</span></button>`);
        let searchData = outputData.drinks;
        searchData.forEach(function(drinkData, i){
            console.log("Name of Drink: " + i + " " + drinkData.strDrink);
            let name = drinkData.strDrink;
            console.log(name);
            console.log("Name of Drink: " + drinkData.strDrinkThumb);
            let srcLink = drinkData.strDrinkThumb;
            $('#searchResultList').html(`
                <div id="cancelGrid">
                    <img class="selectedDrinkImg" alt="${name}" src="${srcLink}">
                    <h2>${name}</h2>
                    <p> ▼ Ingredients ▼ </p>
                    <ul id="ingredientsForUserSelectedDrink"></ul>
                </div>
            `);
        });
        let selectedDrinkIngredients = searchData.map(function(data){
            let ingredients = [
                data.strIngredient1, 
                data.strIngredient2, 
                data.strIngredient3, 
                data.strIngredient4, 
                data.strIngredient5, 
                data.strIngredient6, 
                data.strIngredient7, 
                data.strIngredient8, 
                data.strIngredient9, 
                data.strIngredient10
            ];
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
        });
        console.log("Info received: " + selectedDrinkIngredients);
        let legitArray = [];
        for(let i = 0; i < selectedDrinkIngredients.length; i++){
            legitArray.push(selectedDrinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#ingredientsForUserSelectedDrink");
        });
        document.getElementById("backToList").style.visibility = "visible";
        document.getElementById("backToSelected").style.visibility = "visible";
    });
};

function backToSearchList(){
    $('#searchResultList').html(``);
    $('#pathwayBox').html(`<button class="pageButton mainMenu psButton"><span>Main Menu</span></button>`);
    document.getElementById("goTopButton").style.visibility = "visible";
    let searchInput = localStorage.getItem("searchTerm");
    searchInfoPage(searchInput);
}

$("#main-container").on('click', ".ingredientBaseButton",function(){
    console.log('The ingredient base has been selected');
    console.log("Ingredient selected: " + $(this).attr("value"));
    let drinkIngredient = $(this).attr("value");
    console.log("Varible convert worked: " + drinkIngredient);
    selectedIngredientMain(drinkIngredient);
    selectedIngredientSecondary(drinkIngredient);
    localStorage.setItem("setIngredient", drinkIngredient);
});

function selectedIngredientMain(drinkIngredient){
    $("#main-container").html(`
    <div class="buttonsContainer">
        <div id="resultOfSelectedIngredient">
            <h3>The list of drinks with your ingredient choice: ${drinkIngredient}</h3>
            <div id="listOfDrinksSelectedIngredient"></div>
        </div>
        <div id="pathwayBox" class="spiritBox">
            <button class="pageButton spiritButton" onclick="goBackIngredientPage()"><span>Ingredients List</span></button>
            <button class="mainMenu spiritButton"><span>Main Menu</span></button>
        </div>
        <button id="goTopButton" onclick="goBackToTop()"><img id="upArrowImg" src="../Misc/up-arrow-box.png"></button>
    </div>
    `);
}

function selectedIngredientSecondary(drinkIngredient){
    let query = {
        i: `${drinkIngredient}`
    }
    $.getJSON(filterSearchAPI, query, function(data){
        console.log("Received the list with selected ingredient " + JSON.stringify(data.drinks));
        let selectedIngredientDrinks = data.drinks;
        let drinksWithingredient = selectedIngredientDrinks.map(function(drink){
            let infoList = drink.strDrink;
            return infoList;
        });
        console.log("Testing: " + drinksWithingredient + " all w/ " + drinkIngredient);
        selectedIngredientDrinks.forEach(function(ingredientDrink, i){
            console.log("Name of Drink: " + i + " " + ingredientDrink.strDrink);
            let name = ingredientDrink.strDrink;
            console.log("Name of Drink: " + ingredientDrink.strDrinkThumb);
            let srcLink = ingredientDrink.strDrinkThumb;
            let drinkID = ingredientDrink.idDrink;
            $('#listOfDrinksSelectedIngredient').append(`
            <div class="gridDivDrink" onclick="searchDrinkIdInfo(${drinkID})">
                <img src="${srcLink}" alt="${name}" class="drinkImg">
                <p class="drinkName">${name}</p>
            </div>`);
        });
    });
}

function searchDrinkIdInfo(dataID){
    console.log('Value: ' + dataID);
    let query = {
        i: `${dataID}`
    }
    $.getJSON(selectedIdSearchAPI, query, function(outputData){
        console.log("Retrieval data starting: ");
        document.getElementById("goTopButton").style.visibility = "hidden";
        console.log("Received the list with selected ingredient " + JSON.stringify(outputData.drinks));
        let searchData = outputData.drinks;
        searchData.forEach(function(drinkData, i){
            console.log("Name of Drink: " + i + " " + drinkData.strDrink);
            let name = drinkData.strDrink;
            console.log(name);
            console.log("Name of Drink: " + drinkData.strDrinkThumb);
            let srcLink = drinkData.strDrinkThumb;
            $('#listOfDrinksSelectedIngredient').html(`
                <div id="selectedIngredDrink">
                    <img class="selectedDrinkImg" alt="${name}" src="${srcLink}">
                    <h2>${name}</h2>
                    <p> ▼ Ingredients ▼ </p>
                    <ul id="ingSelectedDrink"></ul>
                    <button class="pageButton goBackList" onclick="goForwardSelectedIngredient()"><span>Back</span></button>
                </div>
            `);
        });
        let selectedDrinkIngredients = searchData.map(function(data){
            let ingredients = [
                data.strIngredient1, 
                data.strIngredient2, 
                data.strIngredient3, 
                data.strIngredient4, 
                data.strIngredient5, 
                data.strIngredient6, 
                data.strIngredient7, 
                data.strIngredient8, 
                data.strIngredient9, 
                data.strIngredient10
            ];
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
        });
        console.log("Info received: " + selectedDrinkIngredients);
        let legitArray = [];
        for(let i = 0; i < selectedDrinkIngredients.length; i++){
            legitArray.push(selectedDrinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#ingSelectedDrink");
        });
    });
}

function goBackIngredientPage(){
    console.log("back to ingredient page clicked");
    location.assign("../Pages/ingredientsDrink.html");
}
function goForwardSelectedIngredient(){
    console.log("Go forward works");
    let ingredient = localStorage.getItem("setIngredient");
    selectedIngredientMain(ingredient);
    selectedIngredientSecondary(ingredient);
}

$("#main-container").on('click', ".alcoholBaseChoice",function(){
    console.log('The alcohol base has been selected');
    console.log("Base selected: " + $(this).attr("value"));
    let base = $(this).attr("value");
    selectedSpiritMain(base);
    selectedSpiritSecondary(base);
    localStorage.setItem("selectedBase", base);
});

function selectedSpiritMain(base){
    let query = {
        i: `${base}`
    }
    $.getJSON(filterSearchAPI, query, function(data){
        console.log("Received the drink data " + JSON.stringify(data.drinks));
        let listOfDrinks = data.drinks;
        let drinksWithBase = listOfDrinks.map(function(item){
            let testItem = item.strDrink;
            return testItem;
        });
        console.log("Testing: " + drinksWithBase);
        $("#main-container").html(`
        <div class="buttonsContainer">
            <div id="resultOfSelectedBase">
                <h3>The list of drinks with your choice of spirit: ${base}</h3>
                <div id="drinksList"></div>
            </div>
            <div id="pathwayBox" class="spiritBox">
                <button class="pageButton spiritButton" onclick="goBackSpiritBasePage()"><span>Spirits List</span></button>
                <button class="mainMenu spiritButton"><span>Main Menu</span></button>
            </div>
            <button id="goTopButton" onclick="goBackToTop()"><img id="upArrowImg" alt="upArrowImg" src="../Misc/up-arrow-box.png"></button>
        </div>
        `);
        listOfDrinks.forEach(function(theDrink, i){
            console.log("Name of Drink: " + theDrink.strDrink);
            let name = theDrink.strDrink;
            console.log("Name of Drink: " + theDrink.strDrinkThumb);
            let srcLink = theDrink.strDrinkThumb;
            let drinkID = theDrink.idDrink;
            $('#drinksList').append(`
            <div class="gridDivDrink" onclick="searchSpiritIdInfo(${drinkID})">
                <img src="${srcLink}" alt="${name}" class="drinkImg">
                <p class="drinkName">${name}</p>
            </div>`);
        });
    });
}

function selectedSpiritSecondary(base){
    let query = {
        i: `${base}`
    }
    $.getJSON(filterSearchAPI, query, function(data){
        // console.log("Received the drink data " + JSON.stringify(data.drinks));
        let listOfDrinks = data.drinks;
        let drinksWithBase = listOfDrinks.map(function(item){
            let testItem = item.strDrink;
            return testItem;
        });
    });
}
function goBackSpiritBasePage(){
    console.log("back to ingredient page clicked");
    location.assign("../Pages/spiritsFav.html");
}
function goForwardSelectedSpirit(){
    console.log("Forward successfully");
    let preservedBase = localStorage.getItem("selectedBase");
    selectedSpiritMain(preservedBase);
    selectedSpiritSecondary(preservedBase);
}

function searchSpiritIdInfo(dataID){
    console.log('Value: ' + dataID);
    let query = {
        i: `${dataID}`
    }
    $.getJSON(selectedIdSearchAPI, query, function(outputData){
        console.log("Retrieval data starting: ");
        document.getElementById("goTopButton").style.visibility = "hidden";
        console.log("Received the list with selected ingredient " + JSON.stringify(outputData.drinks));
        let searchData = outputData.drinks;
        searchData.forEach(function(drinkData, i){
            console.log("Name of Drink: " + i + " " + drinkData.strDrink);
            let name = drinkData.strDrink;
            console.log(name);
            console.log("Name of Drink: " + drinkData.strDrinkThumb);
            let srcLink = drinkData.strDrinkThumb;
            $('#drinksList').html(`
                <div id="selectedSpiritDrink">
                    <img class="selectedDrinkImg" alt="${name}" src="${srcLink}">
                    <h2>${name}</h2>
                    <p> ▼ Ingredients ▼ </p>
                    <ul id="ingSelectedDrink"></ul>
                    <button class="pageButton goBackList" onclick="goForwardSelectedSpirit()"><span>Back</span></button>
                </div>
            `);
        });
        let selectedDrinkIngredients = searchData.map(function(data){
            let ingredients = [
                data.strIngredient1, 
                data.strIngredient2, 
                data.strIngredient3, 
                data.strIngredient4, 
                data.strIngredient5, 
                data.strIngredient6, 
                data.strIngredient7, 
                data.strIngredient8, 
                data.strIngredient9, 
                data.strIngredient10
            ];
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
        });
        console.log("Info received: " + selectedDrinkIngredients);
        let legitArray = [];
        for(let i = 0; i < selectedDrinkIngredients.length; i++){
            legitArray.push(selectedDrinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#ingSelectedDrink");
        });
    });
}

$("#main-container").on('click', ".popularDrink",function(){
    console.log('The popular drinks has been selected');
    console.log("Value: " + $(this).attr("value"));
    let name = $(this).attr("value");
    popularDrinkCallMain(name);
    localStorage.setItem("selectedDrink", name);
});

function popularDrinkCallMain(name){
    let query = {
        s: `${name}`
    }
    $.getJSON(popularDrinkAPI, query, function(data){
        console.log("Received the drink data " + JSON.stringify(data.drinks));
        let drinkInfoPackage = data.drinks;
        let thePackage = drinkInfoPackage.map(function(item){
            let testItem = item.strDrink;
            return testItem;
        });
        console.log("Testing: " + thePackage);
        let choiceUrl = drinkInfoPackage.map(function(item){
            let testUrl = item.strDrinkThumb;
            return testUrl;
        });
        console.log("Pic URL Testing: " + choiceUrl[0]);
        $("#main-container").html(`
        <div class="buttonsContainer">
            <div id="resultOfPopularDrink">
                <h3>"${name}"</h3>
                <img class="picOfDrink" alt="${name}" src="${choiceUrl[0]}">
                <h3>Ingredient(s)</h3>
                <ul id="selectedDrinkIngredientsList"></ul>
            </div>
            <div id="pathwayBox" class="popularContainerPathway">
                <button class="pageButton popularButton" onclick="goBackFavDrinksPage()"><span>Popular List</span></button>
                <button class="mainMenu popularButton"><span>Main Menu</span></button>
            </div>
        </div>
        `);
        let selectedDrinkIngredients = drinkInfoPackage.map(function(data){
            let ingredients = [
                data.strIngredient1, 
                data.strIngredient2, 
                data.strIngredient3, 
                data.strIngredient4, 
                data.strIngredient5, 
                data.strIngredient6, 
                data.strIngredient7, 
                data.strIngredient8, 
                data.strIngredient9, 
                data.strIngredient10
            ];
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
        });
        console.log("Info received: " + selectedDrinkIngredients);
        let legitArray = [];
        for(let i = 0; i < selectedDrinkIngredients.length; i++){
            legitArray.push(selectedDrinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#selectedDrinkIngredientsList");
        });
    });
}

function goBackFavDrinksPage(){
    console.log("back to ingredient page clicked");
    location.assign("../Pages/popularDrinks.html");
}
function goForwardSelectedDrink(){
    console.log("Forward successfully");
    let preservedName = localStorage.getItem("selectedDrink");
    popularDrinkCallMain(preservedName);
}

//Randomize Button

function randomizeTheDrinkPartOne(){
    console.log("randomize button was clicked");
    $.getJSON(randomDrinkAPI, function(data){
        console.log(data.drinks);
        let drinkResult = data.drinks;

        //Getting drink name
        let drinkName = drinkResult.map(function(info){
            let name = info.strDrink;
            return name;
        });
        console.log("Name of drink: " + drinkName);

        //Retrieve url of drink
        let drinkPic = drinkResult.map(function(data){
            let img = data.strDrinkThumb;
            return img;
        });
        console.log("Link for the drink: " + drinkPic);

        //given DOM changes from data results
        $("#main-container").html(`
        <div class="buttonsContainer">
            <div id="resultOfRandomize">
                <img class="picOfDrink" alt="${drinkName}" src="${drinkPic}">
                <h3>"${drinkName}"</h3>
                <h3>Ingredient(s)</h3>
                <ul id="ingredientsList"></ul>
            </div>
            <button class="randomAgain"><span>Randomize Again</span></button>
            <button class="quitRandom"><span>Main Menu</span></button>
            </div>
        </div>
        `);
        let drinkIngredients = drinkResult.map(function(data){
            let ingredients = [
                data.strIngredient1, 
                data.strIngredient2, 
                data.strIngredient3, 
                data.strIngredient4, 
                data.strIngredient5, 
                data.strIngredient6, 
                data.strIngredient7, 
                data.strIngredient8, 
                data.strIngredient9, 
                data.strIngredient10
            ];
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
        });
        console.log("Info received: " + drinkIngredients);
        let legitArray = [];
        for(let i = 0; i < drinkIngredients.length; i++){
            legitArray.push(drinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            $(`<li class="itemLi">- ${item} -</li>`).appendTo("#ingredientsList");
        });
    });
    console.log("randomize button was clicked");
};

$('.randomB').click(function(){
    randomizeTheDrinkPartOne();
});

$('#main-container').on('click','.randomAgain', function(){
    randomizeTheDrinkPartOne();
    console.log('it works');
});
//Go back to Main Page
$("#main-container").on('click', ".mainMenu", function(){
    console.log("The main menu button was clicked");
    localStorage.clear();
    location.assign("../index.html");
});
$("#main-container").on('click', ".quitRandom", function(){
    console.log("The main menu button was clicked");
    localStorage.clear();
    location.assign("./index.html");
});