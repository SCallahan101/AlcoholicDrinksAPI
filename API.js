
// API CONNECTIONS
const filterSearchAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
const popularDrinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php";
const randomDrinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const selectedIdSearchAPI = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php";

// Buttons Pathways


$('.searchEngine').click(function(){
    console.log("search engine button was clicked");
    $("#main-container").html(`
    <h3 class="">Search for your MUST have ingredient in your Drinks</h3>
    <p class="">Database of Cocktails</p>
    <div class="buttonsContainer">
        <form id="searchForm">
            <input type="text" value="" placeholder="Search..." class="searchValue">
            <br>
            <input type="submit" value="Search Away!" class="searchSubmitButton">
        </form>
        <div id="searchResultList">
            <p>A little warning with the searching. The term that you may type doesn't always show up like google. Play around with the choice of words.</p>
        </div>
        <button class="pageButton mainMenu">Back to Main Menu</button>
    </div>
    `);
});

// $(document).on('submit', '#searchForm', function(e){
//     e.preventDefault();
//     $('#main-container').html(`
//     <p>testing for proof of concept</p>
//     `);
// });

$(document).on('submit', '#searchForm', function(e){
    e.preventDefault();
    $('#searchResultList').html(``);
    let userInputValue = $('.searchValue').val();
    console.log('Value: ' + userInputValue);

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
                    <img src="${srcLink}" class="drinkImg">
                    <div class="drinkName">${name}</div>
               </button>
            `);
        });
        // let selectedDrinkValue = $('.drinkDataCube').val();
        // console.log('Value: ' + selectedDrinkValue);
        $('.drinkDataCube').click(function(){
            let selectedDrinkValue = $(this).val();
            // e.preventDefault();
            console.log('DataCube has been clicked! - ' + selectedDrinkValue);
            infoOnSelectedDrink(selectedDrinkValue);
            ingredientsInfoOnSelectedDrink(selectedDrinkValue);
        });
    });
});

function infoOnSelectedDrink(selectedData){
    let query = {
        i: `${selectedData}`
    }
    $.getJSON(selectedIdSearchAPI, query, function(outputData){
        console.log("Retrieval data starting: ");
        console.log("Received the list with selected ingredient " + JSON.stringify(outputData.drinks));
        let searchData = outputData.drinks;
        searchData.forEach(function(drinkData, i){
            console.log("Name of Drink: " + i + " " + drinkData.strDrink);
            let name = drinkData.strDrink;
            console.log(name);
            console.log("Name of Drink: " + drinkData.strDrinkThumb);
            let srcLink = drinkData.strDrinkThumb;
            $('#searchResultList').html(`
                <p>${name}</p>
                <img class="selectedDrinkImg" src="${srcLink}">
                <p> ▼ Ingredients ▼ </p>
                <ul id="ingredientsForUserSelectedDrink"></ul>
            `);
        });
    });
};

function ingredientsInfoOnSelectedDrink(idData){
    console.log("Testing Phase --- ");
    let query = {
        i: `${idData}`
    }
    $.getJSON(selectedIdSearchAPI, query, function(info){
        console.log("Received the drink data " + JSON.stringify(info.drinks));
        let drinkPackage = info.drinks;
        let selectedDrinkIngredients = drinkPackage.map(function(data){
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
            // return ingredients;
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
            // $('#selectedDrinkIngredientsList').append(`<li class="ingredItem">- ${item} -</li>`);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#ingredientsForUserSelectedDrink");
        });
    });
};

$('.ingredientB').click(function(){
    console.log("ingredient button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Ingredient</p>
    <div class="buttonsContainer">
        <button class="pageButton ingredientBaseButton" value="lemon">Lemon</button>
        <button class="pageButton ingredientBaseButton" value="sugar syrup">Sugar Syrup</button>
        <button class="pageButton ingredientBaseButton" value="Bitters">Bitters</button>
        <button class="pageButton ingredientBaseButton" value="liqueur">Liqueur</button>
        <button class="pageButton ingredientBaseButton" value="grenadine">Grenadine</button>
        <button class="pageButton ingredientBaseButton" value="club soda">Club Soda</button>
        <button class="pageButton mainMenu">Back to Main Menu</button>
    </div>
    `);
});
$("#main-container").on('click', ".ingredientBaseButton",function(){
    console.log('The ingredient base has been selected');
    console.log("Ingredient selected: " + $(this).attr("value"));
    let drinkIngredient = $(this).attr("value");
    console.log("Varible convert worked: " + drinkIngredient);

    // let query = {
    //     i: `${drinkIngredient}`
    // }
    // $.getJSON(filterSearchAPI, query, function(data){
    //     console.log("Received the list with selected ingredient " + JSON.stringify(data.drinks));
    //     let selectedIngredientDrinks = data.drinks;
    //     let drinksWithingredient = selectedIngredientDrinks.map(function(drink){
    //         let infoList = drink.strDrink;
    //         return infoList;
    //     });
    //     console.log("Testing: " + drinksWithingredient + " all w/ " + drinkIngredient);
        $("#main-container").html(`
        <h3 class="">*Randomized Drink*</h3>
        <div class="buttonsContainer">
            <div id="resultOfSelectedIngredient">
                <h3>The list of drinks with your ingredient choice: ${drinkIngredient}</h3>
                <div id="listOfDrinksWSelectedIngredient"></div>
            </div>
            <button class="mainMenu">Main Menu</button>
        </div>
        `);
});

$("#main-container").on('click', ".ingredientBaseButton",function(){
    console.log('The ingredient base has been selected');
    console.log("Ingredient selected: " + $(this).attr("value"));
    let drinkIngredient = $(this).attr("value");

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
            $('#listOfDrinksWSelectedIngredient').append(`
            <div class="gridDivDrink">
                <img src="${srcLink}" class="drinkImg">
                <p class="drinkName">${name}</p>
            </div>`);
        });
    });
});

$('.baseB').click(function(){
    console.log("base button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="basesContainer">
        <button class="alcoholBaseChoice" value="Bourbon"><img src="./Misc/Bourbon.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Brandy"><img src="./Misc/Brandy.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Gin"><img src="./Misc/Gin.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Rum"><img src="./Misc/Rum.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Scotch"><img src="./Misc/Scotch.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Tequila"><img src="./Misc/Tequila.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Vodka"><img src="./Misc/Vodka.jpg" class="alcoholBase"></button>
        <button class="alcoholBaseChoice" value="Whiskey"><img src="./Misc/Whiskey.jpg" class="alcoholBase"></button>
        <button class="pageButton imgButton mainMenu">Back to Main Menu</button>
    </div>
   
    `);
});
$("#main-container").on('click', ".alcoholBaseChoice",function(){
    console.log('The alcohol base has been selected');
    console.log("Base selected: " + $(this).attr("value"));
    let base = $(this).attr("value");

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

        // let listOfPotentials = [];
        // for(let i = 0; i < drinksWithBase.length; i++){
        //     // console.log("Before return: " + drinkIngredients[i]);
        //     listOfPotentials.push(drinksWithBase[i]);
        //     console.log(listOfPotentials);
        // };
        // console.log("After arrangement set up: " + listOfPotentials);
        // listOfPotentials.forEach(function(name, i){
        //     console.log("Name of Drink: " + name);
        //     // $('#drinksList').append(`<li>${name}</li>`);
        //     $(`<li class="nameDrinkLi">- ${name} -</li>`).appendTo("#drinksList");
        // });

        // let choiceUrl = drinkInfoPackage.map(function(item){
        //     let testUrl = item.strDrinkThumb;
        //     return testUrl;
        // });
        // console.log("Pic URL Testing: " + choiceUrl[0]);

        // <img class="picOfDrink" src="${"none"}">
        $("#main-container").html(`
        <h3 class="">*Randomized Drink*</h3>
        <div class="buttonsContainer">
            <div id="resultOfSelectedBase">
                <h3>The list of drinks with your choice of ${base}</h3>
                <div id="drinksList"></div>
            </div>
            <button class="mainMenu">Main Menu</button>
        </div>
        `);
    });
});
$("#main-container").on('click', ".alcoholBaseChoice",function(){
    console.log('The alcohol base has been selected');
    console.log("Base selected: " + $(this).attr("value"));
    let base = $(this).attr("value");

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
        //Testing out to get src info align with title
        // let drinksSrc = listOfDrinks.map(function(item){
        //     let drinkSrc = item.strDrinkThumb;
        //     return drinkSrc;
        // });
        // console.log("Testing: " + drinksSrc);
        // //
        // let listOfPotentials = [];
        // for(let i = 0; i < drinksWithBase.length; i++){
        //     // console.log("Before return: " + drinkIngredients[i]);
        //     listOfPotentials.push(drinksWithBase[i]);
        //     console.log(listOfPotentials);
        // };
        // console.log("After arrangement set up: " + listOfPotentials);
        //
      
        listOfDrinks.forEach(function(theDrink, i){
            console.log("Name of Drink: " + theDrink.strDrink);
            let name = theDrink.strDrink;
            console.log("Name of Drink: " + theDrink.strDrinkThumb);
            let srcLink = theDrink.strDrinkThumb;
            $('#drinksList').append(`
            <div class="gridDivDrink">
                <img src="${srcLink}" class="drinkImg">
                <p class="drinkName">${name}</p>
            </div>`);
            // $(`<div class="gridDivDrink">${name}</div>`).appendTo("#drinksList");
        });
    });
});

//Button to get Popular drinks Ingredients
$('.nameB').click(function(){
    console.log("name button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="buttonsContainer">
        <button class="pageButton popularDrink" value="Margarita">Margarita</button>
        <button class="pageButton popularDrink" value="Mojito">Mojito</button>
        <button class="pageButton popularDrink" value="Cosmopolitan">Cosmopolitan</button>
        <button class="pageButton popularDrink" value="Moscow Mule">Moscow Mule</button>
        <button class="pageButton popularDrink" value="Manhattan">Manhattan</button>
        <button class="pageButton popularDrink" value="Old Fashioned">Old Fashioned</button>
        <button class="pageButton mainMenu">Back to Main Menu</button>
    </div>
    `);
});
$("#main-container").on('click', ".popularDrink",function(){
    console.log('The popular drinks has been selected');
    console.log("Value: " + $(this).attr("value"));
    let name = $(this).attr("value");

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
            // return ingredients;
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
            // console.log("Post-filter: " + filteredArray);
            // let legitArray = [];
            // for(let i = 0; i < filteredArray.length; i++){
            //     // console.log("Before return: " + filteredArray[i]);
            //     legitArray.push(filteredArray[i]);
            //     console.log(legitArray);
            // };

            // return new Array(legitArray);
        });
        console.log("Info received: " + selectedDrinkIngredients);
        // let filteredArray = drinkIngredients.filter(function(el){
        //     return el != null;
        // });
        // console.log("Post-filter: " + filteredArray);
        let legitArray = [];
        for(let i = 0; i < selectedDrinkIngredients.length; i++){
            // console.log("Before return: " + drinkIngredients[i]);
            legitArray.push(selectedDrinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            // $('#selectedDrinkIngredientsList').append(`<li class="ingredItem">- ${item} -</li>`);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#selectedDrinkIngredientsList");
        });
        $("#main-container").html(`
        <h3 class="">*Randomized Drink*</h3>
        <div class="buttonsContainer">
            <div id="resultOfPopularDrink">
                <h3>"${name}"</h3>
                <img class="picOfDrink" src="${choiceUrl[0]}">
                <h3>Drink's Ingredient(s)</h3>
                <ul id="selectedDrinkIngredientsList"></ul>
            </div>
            <button class="mainMenu">Main Menu</button>
        </div>
        `);
    });
});
$("#main-container").on('click', ".popularDrink",function(){
    console.log('The popular drinks has been selected');
    console.log("Value: " + $(this).attr("value"));
    let name = $(this).attr("value");

    let query = {
        s: `${name}`
    }
    $.getJSON(popularDrinkAPI, query, function(data){
        console.log("Received the drink data " + JSON.stringify(data.drinks));
        let drinkInfoPackage = data.drinks;
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
            // return ingredients;
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
            // $('#selectedDrinkIngredientsList').append(`<li class="ingredItem">- ${item} -</li>`);
            $(`<li class="ingredItem">- ${item} -</li>`).appendTo("#selectedDrinkIngredientsList");
        });
    });
});


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
        <h3 class="">*Randomized Drink*</h3>
        <div class="buttonsContainer">
            <div id="resultOfRandomize">
                <h3>"${drinkName}"</h3>
                <img class="picOfDrink" src="${drinkPic}">
                <h3>Drink's Ingredient(s)</h3>
                <ul id="ingredientsList"></ul>
            </div>
            <button class="randomAgain">Again</button>
            <button class="mainMenu">Main Menu</button>
        </div>
        `);
    });
    console.log("randomize button was clicked");
    $.getJSON(randomDrinkAPI, function(data){
        console.log(data.drinks);
        let drinkResult = data.drinks;
        //Get Drink Ingredients
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
            // return ingredients;
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            console.log("Post-filter with no Null(s): " + filteredArray);
            return filteredArray;
            // console.log("Post-filter: " + filteredArray);
            // let legitArray = [];
            // for(let i = 0; i < filteredArray.length; i++){
            //     // console.log("Before return: " + filteredArray[i]);
            //     legitArray.push(filteredArray[i]);
            //     console.log(legitArray);
            // };

            // return new Array(legitArray);
        });
        console.log("Info received: " + drinkIngredients);
        // let filteredArray = drinkIngredients.filter(function(el){
        //     return el != null;
        // });
        // console.log("Post-filter: " + filteredArray);
        let legitArray = [];
        for(let i = 0; i < drinkIngredients.length; i++){
            // console.log("Before return: " + drinkIngredients[i]);
            legitArray.push(drinkIngredients[i]);
            console.log(legitArray);
        };
        console.log("After arrangement set up: " + legitArray);
        legitArray[0].forEach(function(item, i){
            console.log("Item: " + item);
            // $('#ingredientsList').append(`<li>${item}</li>`);
            $(`<li class="itemLi">- ${item} -</li>`).appendTo("#ingredientsList");
        });
    });
};

$('.randomB').click(function(){
    randomizeTheDrinkPartOne();
    // console.log("randomize button was clicked");
    // $.getJSON(randomDrinkAPI, function(data){
    //     console.log(data.drinks);
    //     let drinkResult = data.drinks;

    //     //Getting drink name
    //     let drinkName = drinkResult.map(function(info){
    //         let name = info.strDrink;
    //         return name;
    //     });
    //     console.log("Name of drink: " + drinkName);

    //     //Retrieve url of drink
    //     let drinkPic = drinkResult.map(function(data){
    //         let img = data.strDrinkThumb;
    //         return img;
    //     });
    //     console.log("Link for the drink: " + drinkPic);

    //     //given DOM changes from data results
    //     $("#main-container").html(`
    //     <h3 class="">*Randomized Drink*</h3>
    //     <div class="buttonsContainer">
    //         <div id="resultOfRandomize">
    //             <h3>"${drinkName}"</h3>
    //             <img class="picOfDrink" src="${drinkPic}">
    //             <h3>Drink's Ingredient(s)</h3>
    //             <ul id="ingredientsList"></ul>
    //         </div>
    //         <button class="randomAgain">Again</button>
    //         <button class="mainMenu">Main Menu</button>
    //     </div>
    //     `);
    // })
});
$('.randomB').click(function(){
    // console.log("randomize button was clicked");
    // $.getJSON(randomDrinkAPI, function(data){
    //     console.log(data.drinks);
    //     let drinkResult = data.drinks;
    //     //Get Drink Ingredients
    //     let drinkIngredients = drinkResult.map(function(data){
    //         let ingredients = [
    //             data.strIngredient1, 
    //             data.strIngredient2, 
    //             data.strIngredient3, 
    //             data.strIngredient4, 
    //             data.strIngredient5, 
    //             data.strIngredient6, 
    //             data.strIngredient7, 
    //             data.strIngredient8, 
    //             data.strIngredient9, 
    //             data.strIngredient10
    //         ];
    //         // return ingredients;
    //         console.log("Pre-filter: " + ingredients);
    //         let filteredArray = ingredients.filter(function(el){
    //             return el != null;
    //         });
    //         console.log("Post-filter with no Null(s): " + filteredArray);
    //         return filteredArray;
    //         // console.log("Post-filter: " + filteredArray);
    //         // let legitArray = [];
    //         // for(let i = 0; i < filteredArray.length; i++){
    //         //     // console.log("Before return: " + filteredArray[i]);
    //         //     legitArray.push(filteredArray[i]);
    //         //     console.log(legitArray);
    //         // };

    //         // return new Array(legitArray);
    //     });
    //     console.log("Info received: " + drinkIngredients);
    //     // let filteredArray = drinkIngredients.filter(function(el){
    //     //     return el != null;
    //     // });
    //     // console.log("Post-filter: " + filteredArray);
    //     let legitArray = [];
    //     for(let i = 0; i < drinkIngredients.length; i++){
    //         // console.log("Before return: " + drinkIngredients[i]);
    //         legitArray.push(drinkIngredients[i]);
    //         console.log(legitArray);
    //     };
    //     console.log("After arrangement set up: " + legitArray);
    //     legitArray[0].forEach(function(item, i){
    //         console.log("Item: " + item);
    //         // $('#ingredientsList').append(`<li>${item}</li>`);
    //         $(`<li class="itemLi">- ${item} -</li>`).appendTo("#ingredientsList");
    //     });
    // });
});
// };

// randomizeTheDrink();

$('#main-container').on('click','.randomAgain', function(){
    randomizeTheDrinkPartOne();

    console.log('it works');
    
});
//Go back to Main Page
$("#main-container").on('click', ".mainMenu", function(){
    console.log("The main menu button was clicked");
    localStorage.clear();
    location.reload();
});