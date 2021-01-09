
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
        <button class="PageButton mainMenu">Main Menu<button>
    </div>
    `);
});
$('.baseB').click(function(){
    console.log("base button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="buttonsContainer">
        <button class="">Lemon</button>
        <button class="">Sugar Syrup</button>
        <button class="">Bitters</button>
        <button class="">Liqueur</button>
        <button class="">Grenadine</button>
        <button class="">Club Soda</button>
        <button class="mainMenu">Main Menu<button>
    </div>
    `);
});
$('.nameB').click(function(){
    console.log("name button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="buttonsContainer">
        <button class="">Lemon</button>
        <button class="">Sugar Syrup</button>
        <button class="">Bitters</button>
        <button class="">Liqueur</button>
        <button class="">Grenadine</button>
        <button class="">Club Soda</button>
        <button class="mainMenu">Main Menu<button>
    </div>
    `);
});
$('.randomB').click(function(){
    console.log("randomize button was clicked");
    $("#main-container").html(`
    <h3 class="">Popular Ingredients for Drinks/Cocktails</h3>
    <p class="">Select Your Choice of Search</p>
    <div class="buttonsContainer">
        <button class="">Lemon</button>
        <button class="">Sugar Syrup</button>
        <button class="">Bitters</button>
        <button class="">Liqueur</button>
        <button class="">Grenadine</button>
        <button class="">Club Soda</button>
        <button class="mainMenu">Main Menu<button>
    </div>
    `);
});

$("#main-container").on('click', ".mainMenu", function(){
    console.log("The main menu button was clicked");
    location.reload();
});