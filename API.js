
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
        <button class="PageButton">Lemon</button>
        <button class="PageButton">Sugar Syrup</button>
        <button class="PageButton">Bitters</button>
        <button class="PageButton">Liqueur</button>
        <button class="PageButton">Grenadine</button>
        <button class="PageButton">Club Soda</button>
        <button class="PageButton mainMenu">Back to Main Menu</button>
    </div>
    `);
});
$('.baseB').click(function(){
    console.log("base button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="basesContainer">
        <img src="./Misc/Bourbon.jpg" class="alcoholBase">
        <img src="./Misc/Brandy.jpg" class="alcoholBase">
        <img src="./Misc/Gin.jpg" class="alcoholBase">
        <img src="./Misc/Rum.jpg" class="alcoholBase">
        <img src="./Misc/Scotch.jpg" class="alcoholBase">
        <img src="./Misc/Tequila.jpg" class="alcoholBase">
        <img src="./Misc/Vodka.jpg" class="alcoholBase">
        <img src="./Misc/Whiskey.jpg" class="alcoholBase">
        <button class="PageButton imgButton mainMenu">Back to Main Menu</button>
    </div>
   
    `);
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
        // data.map(function(item){
        //     let infoPackage = item;
        //     return infoPackage;
        // });
        // console.log("data showing: " + infoPackage);
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