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
    var database = firebase.database();
    var logCharacter = "";



    // Character Name	Suggested Search Parameter

    // Bronn	        bronn
    // Brynden Tully	brynden
    // Cersei	        cersei
    // The Hound	    hound
    // Jaime Lannister	jaime
    // Littlefinger	    littlefinger
    // Olenna Tyrell	olenna
    // Renly Baratheon	renly
    // Tyrion	        tyrion
    // Varys	        varys

    //create list of characters with properties
    var characters = {
        "bronn": {
            name: "Bronn",
            image: "assets/images/Bronn.jpg"
            // quote: '"Sometimes there Is no happy choice, only one less grievous than the others.", "I do know some things, I know I love you. I know you love me. I have to go home now.", "We look up at the same stars and see such different things.", "If I fall, dont bring me back."'
        },
        "brynden": {
            name: "Brynden Tully",
            image: "assets/images/Blackfish.png"
        },
        "cersei": {
            name: "Cersei Lannister",
            image: "assets/images/CerseiLannister.png"
        },
        "hound": {
            name: "The Hound",
            image: "assets/images/sandorclegane1.jpg"
        },
        "jaime": {
            name: "Jaime Lannister",
            image: "assets/images/Jaime.jpg"
        },
        "littlefinger": {
            name: "Petyr Baelish",
            image: "assets/images/Littlefinger.png"
        },
        "olenna": {
            name: "Olenna Tyrell",
            image: "assets/images/Olenna.png"
        },
        "renly": {
            name: "Renly Baratheon",
            image: "assets/images/Renly.png"
        },
        "tyrion": {
            name: "Tyrion Lannister",
            image: "assets/images/tyrionlannister1.jpg"
        },
        "varys": {
            name: "Lord Varys",
            image: "assets/images/Varys.png"
        }
        
    }

    //creates the character cards from the characters object to put into the HTML
    function createCharactersDiv (character, key) {
        var charDiv = $("<div class='character' data-name='" + key + "'>");
        var charName = $("<div class='characterName'>").text(character.name);
        var charImage = $("<img alt='image' class='characterImage'>").attr('src', character.image);
        charDiv.append(charName).append(charImage);
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
        console.log("this", this);

        // var queryURL = "https://got-quotes.herokuapp.com/quotes?char=tyrion";
        var queryURL = "https://got-quotes.herokuapp.com/quotes?char=" + chosenCharacter + "";
        console.log(queryURL);
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
            var quoteString = response.quote + " ~ " + response.character;
            $("#quote").text(quoteString);
            addToTable(quoteString);
            });
    });
    function addToTable(q, t){
        var quote = q;
        var translation = t;

        var newRow = $("<tr>").addClass("row").append(
            $("<td>").text(quote).addClass("col-lg-6"),
            $("<td>").text(translation).addClass("col-lg-6"),
        );
        $("tbody").prepend(newRow);
    }


    $("#charactersDiv").on("click", function(event) {
       
        event.preventDefault();

        logCharacter = $("#charactersDiv").val().trim();

        database.ref().push({
            logCharacter: logCharacter,
            
        })
        console.log(logCharacter)
    });
  
});
