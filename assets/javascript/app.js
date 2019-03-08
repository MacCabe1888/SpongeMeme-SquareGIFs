let topics = ["spongebob", "patrick", "squidward", "mr krabs", "sandy", "plankton", "mrs puff", "larry", "bikini bottom", "band geeks"]

function generateButtons() {

    $("#buttons").empty();

    for (i = 0; i < topics.length; i++) {
      let button = $("<button>");
      button.addClass("spongey-topic");
      button.attr("data-name", topics[i]);
      button.text(topics[i]);
      $("#buttons").append(button);
    }

}

generateButtons();

$("#add-topic").on("click", function(event) {

    event.preventDefault();

    let topic = $("#spongey-input").val().trim();

    topics.push(topic);

    generateButtons();

});