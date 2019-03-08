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
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sponginess.toLowerCase() + "-spongebob-squarepants&api_key=" + config.apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        let results = response.data;

        for (var i = 0; i < results.length; i++) {

        let spongeyDiv = $("<div>");
        let title = $("<p>");
        $(title).html("<br><br>" + results[i].title.toUpperCase());
        let p = $("<p>");
        $(p).text("Rating: " + results[i].rating.toUpperCase());
        let spongeyImage = $("<img>");
        spongeyImage.attr("src", results[i].images.fixed_height.url);
        spongeyDiv.append(title);
        spongeyDiv.append(p);
        spongeyDiv.append(spongeyImage);
        $("#gifs").prepend(spongeyDiv);

        }

    });

};

generateButtons();

$(document).on("click", "#add-topic", addTopic);

$(document).on("click", ".spongey-topic", addSponginess);