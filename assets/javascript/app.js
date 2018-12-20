// load document before starting javascript
$(document).ready(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBpZXxTnENHTeGwIKLJwX8ZY0EG88ojysI",
        authDomain: "uglymagentafinish.firebaseapp.com",
        databaseURL: "https://uglymagentafinish.firebaseio.com",
        projectId: "uglymagentafinish",
        storageBucket: "",
        messagingSenderId: "357761868557"
    };
    firebase.initializeApp(config);

    //create list of characters with properties
    var characters = {
        "Jon Snow": {
            name: "Jon Snow",
            image: "assets/images/jonsnow1.jpg"
        },
        "Tyrion Lannister": {
            name: "Tyrion Lannister",
            image: "assets/images/tyrionlannister1.jpg"
        },
        "Khal Drogo": {
            name: "Khal Drogo",
            image: "assets/images/khaldrogo1.jpg"
        },
        "Melisandre": {
            name: "Melisandre",
            image: "assets/images/melisandre1.jpg"
        },
        "Sandor Clegane": {
            name: "Sandor Clegane",
            image: "assets/images/sandorclegane1.jpg"
        }
    }
    // console.log(characters["Jon Snow"].image);

    //creates the character objects from the characters object to put into the HTML
    function createCharactersDiv (character, key) {
        var charDiv = $("<div class='character' data-name='" + key + "'>");
        var charName = $("<div class='characterName'>").text(character.name);
        var charImage = $("<img alt='image' class='characterImage'>").attr('src', character.image);
        console.log(charImage);
        var charHealth = $("<div class='characterHealthPoints'>").text(character.healthPoints);
        charDiv.append(charName).append(charImage).append(charHealth);
        return charDiv;
    }

    // shows all characters to choose from by populating html with created characters
    function showCharacters() { 
        var characterArray = Object.keys(characters);
        for (var i = 0; i < characterArray.length; i++) {
        var characterIndex = characterArray[i];
        var character = characters[characterIndex];
        var charDiv = createCharactersDiv(character, characterIndex);
        $('#charactersDiv').append(charDiv);
        }
    }
    
    //click event for user pressing start button
    $("#startButton").on("click", function() {
        showCharacters();
        $("#startButton").hide();
    });

    //click event for user pressing a character picture
    $("#charactersDiv").on("click", ".character", function() {
        var chosenCharacter = $(this).attr("data-name");
        // console.log(chosenCharacter);

        // var queryURL = "https://got-quotes.herokuapp.com/quotes?char=tyrion";
        var queryURL = "https://got-quotes.herokuapp.com/quotes?char=tyrion";

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After data comes back from the request
            .then(function(response) {
              console.log(queryURL);
              console.log(response);
              // storing the data from the AJAX request in the results variable
            //   var results = response.data;
            $("#quote").text(response.quote + " ~ " + response.character);
            });
    });

});
