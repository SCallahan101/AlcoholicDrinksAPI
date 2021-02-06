
// API CONNECTIONS
const filterSearchAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php";
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
$('.nameB').click(function(){
    console.log("name button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="buttonsContainer">
        <button class="PageButton">Margarita</button>
        <button class="PageButton">Mojito</button>
        <button class="PageButton">Cosmopolitan</button>
        <button class="PageButton">Moscow Mule</button>
        <button class="PageButton">Manhattan</button>
        <button class="PageButton">Old Fashioned</button>
        <button class="PageButton mainMenu">Back to Main Menu</button>
    </div>
    `);
});
$('.randomB').click(function(){
    console.log("randomize button was clicked");
    $.getJSON(randomDrinkAPI, function(data){
        // console.log(data);
        // console.log(JSON.stringify(data));
        console.log(data.drinks);
        let drinkResult = data.drinks;
        let drinkName = drinkResult.map(function(info){
            let name = info.strDrink;
            return name;
        });
        console.log("Name of drink: " + drinkName);
        localStorage.setItem('name', drinkName);

        let drinkIngredients = drinkResult.map(function(data){
            // console.log("test: " + data.strIngredient1);
            // let test = String(data.strIngredient1);
            // let test = data.strIngredient1.toString();
            // console.log("test2: " + test);
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
            // let test = JSON.parse(data.strIngredient1);
            // console.log(test + " eh");
            // let ingredients = {
            //     item1: test,
                // item2: data.strIngredient2,
                // item3: data.strIngredient3,
                // item4: data.strIngredient4,
                // item5: data.strIngredient5,
                // item6: data.strIngredient6,
                // item7: data.strIngredient7,
                // item8: data.strIngredient8,
                // item9: data.strIngredient9,
                // item10: data.strIngredient10,
            // }
            // for(i=1;i<=10;i++) {
            //      console.log(i); 
            //     }
            console.log("Pre-filter: " + ingredients);
            let filteredArray = ingredients.filter(function(el){
                return el != null;
            });
            for(let i = 0; i < filteredArray.length; i++){
                console.log("Before return: " + filteredArray[i]);
            };

            return filteredArray;
        });
        console.log("Post-filtered: " + drinkIngredients);
        // let jsonParse = drinkIngredients[1];
        // console.log("Checking data: " + jsonParse);
        // let obj = JSON.parse(jsonParse);
        // console.log("Parse Test: " + obj);
        console.log(Array.isArray(drinkIngredients));
        localStorage.setItem('mix', drinkIngredients);
        // function appendTheIngredientsList(drinkIngredients){
        //     let ingredients = drinkIngredients;
        //     let items = document.getElementById("ingredientsList");
        //     for(let i = 0; i < ingredients.length; i++){
        //         let item = document.createElement("li");
        //         item.innerHTML = ingredients[i];
        //         items.appendChild(item);
        //     }
        // }
        // appendTheIngredientsList();

        // $.each(theList, function(index, value){
        //     console.log("append should works: " + index + " = " + value);
        //     $("#resultOfRandomize ul").append($("<li>" + value + "</li>"));
        // });
        let drinkPic = drinkResult.map(function(data){
            let img = data.strDrinkThumb;
            return img;
        });
        console.log("Link for the drink: " + drinkPic);
        localStorage.setItem('picUrl', drinkPic);
        let name = localStorage.getItem('name');
        console.log(name);
        let picture = localStorage.getItem('picUrl');
        console.log(picture);
        let theMix = localStorage.getItem('mix');
        console.log("After retrieved array " + theMix);
        for(let i = 0; i < drinkIngredients.length; i++){
            console.log("As it listed: " + drinkIngredients[i]);
        };
        // theMix.forEach(function(item){
        //     console.log("Item: " + item);
        //     $("#ingredientsList").append("<li>" + item + "</li>");
        // });

        // console.log("Post-filtered: " + noNullArray);
        // $.map(noNullArray, function(val){
        //     console.log("The Mix are: " + val);
        //     $("#ingredientsList").append("<li>" + val + "</li>");
        // });
        $("#main-container").html(`
        <h3 class="">Your Randomized Drink</h3>
        <div class="buttonsContainer">
            <div id="resultOfRandomize">
                <h3>${name}</h3>
                <img src="${picture}">
                <ul id="ingredientsList">
                    
                </ul>
            </div>
            <button class="mainMenu">Main Menu</button>
        </div>
        `);
    })
    // $("#main-container").html(`
    // <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    // <p class="">Select Your Choice of Search</p>
    // <div class="buttonsContainer">
    //     <div id="resultOfRandomize">
    //     </div>
    //     <button class="mainMenu">Main Menu</button>
    // </div>
    // `);
});

$("#main-container").on('click', ".mainMenu", function(){
    console.log("The main menu button was clicked");
    localStorage.clear();
    location.reload();
});