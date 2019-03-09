let topics = ["SpongeBob", "Patrick", "Squidward", "Mr Krabs", "Plankton", "Sandy", "Mrs Puff", "Larry", "Band Geeks", "campfire"];

function generateButtons() {

    $("#buttons").empty();

    for (i = 0; i < topics.length; i++) {
      let button = $("<button>");
      button.addClass("spongey-topic");
      button.attr("spongey-data", topics[i]);
      button.text(topics[i]);
      $("#buttons").append(button);
    }

}

function addTopic() {

    event.preventDefault();
    let topic = $("#spongey-input").val().trim();
    topics.push(topic);
    generateButtons();

};

function addSponginess() {

    let sponginess = $(this).attr("spongey-data");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sponginess.toLowerCase() + "-spongebob-squarepants&api_key=" + config.apiKey + "&limit=12";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let results = response.data;

        for (var i = 0; i < results.length; i++) {

        let spongeyDiv = $("<div>");
        let title = $("<p>");
        $(title).html(results[i].title.toUpperCase());
        let p = $("<p>");
        $(p).text("Rating: " + results[i].rating.toUpperCase());
        let spongeyImage = $("<img>");
        spongeyImage.attr("src", results[i].images.fixed_height_still.url);
        spongeyImage.attr("data-still", results[i].images.fixed_height_still.url);
        spongeyImage.attr("data-animate", results[i].images.fixed_height.url);
        spongeyImage.attr("data-state", "still");
        spongeyImage.addClass("gif");
        let info = $("<div>");
        info.addClass("info");
        info.append(title);
        info.append(p);
        spongeyDiv.append(info);
        spongeyDiv.append(spongeyImage);
        spongeyDiv.addClass("gif-div col-md-4");
        $("#gifs").prepend(spongeyDiv);

        }

    });

};

function toggle() {

    state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

};

generateButtons();

$(document).on("click", "#add-topic", addTopic);

$(document).on("click", ".spongey-topic", addSponginess);

$(document).on("click", ".gif", toggle);