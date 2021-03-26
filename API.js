
// API CONNECTIONS
const filterSearchAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
const popularDrinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/search.php";
const randomDrinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Buttons Pathways
$('.ingredientB').click(function(){
    console.log("ingredient button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="buttonsContainer">
        <button class="PageButton ingredientBaseButton" value="lemon">Lemon</button>
        <button class="PageButton ingredientBaseButton" value="sugar syrup">Sugar Syrup</button>
        <button class="PageButton ingredientBaseButton" value="Bitters">Bitters</button>
        <button class="PageButton ingredientBaseButton" value="liqueur">Liqueur</button>
        <button class="PageButton ingredientBaseButton" value="grenadine">Grenadine</button>
        <button class="PageButton ingredientBaseButton" value="club soda">Club Soda</button>
        <button class="PageButton mainMenu">Back to Main Menu</button>
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
        <button class="PageButton imgButton mainMenu">Back to Main Menu</button>
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
        <button class="PageButton popularDrink" value="Margarita">Margarita</button>
        <button class="PageButton popularDrink" value="Mojito">Mojito</button>
        <button class="PageButton popularDrink" value="Cosmopolitan">Cosmopolitan</button>
        <button class="PageButton popularDrink" value="Moscow Mule">Moscow Mule</button>
        <button class="PageButton popularDrink" value="Manhattan">Manhattan</button>
        <button class="PageButton popularDrink" value="Old Fashioned">Old Fashioned</button>
        <button class="PageButton mainMenu">Back to Main Menu</button>
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
$('.randomB').click(function(){
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
            <button class="mainMenu">Main Menu</button>
        </div>
        `);
    })
});
$('.randomB').click(function(){
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
});

//Go back to Main Page
$("#main-container").on('click', ".mainMenu", function(){
    console.log("The main menu button was clicked");
    localStorage.clear();
    location.reload();
});