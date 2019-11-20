var pageNumber = 1;

var ourContainer = document.getElementById("our-container");
// accessing our trigger element by id
var triggerBtn = document.getElementById("trigger-btn");

// defining the event listener with the type "click"
triggerBtn.addEventListener("click", function () {

    // fire our request triggered by the event type click
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://killphil.github.io/Tutorials/sources/json/tutorial-1/array-' + pageNumber + '.json');
    ourRequest.onload = function() {

        // check if there is no error during establishing the connection to the server
        if (ourRequest.status >= 200 && ourRequest.status < 400){
            var ourData = JSON.parse(ourRequest.responseText);
            // console.log(ourData[0]);
            renderTheContent(ourData);
        } else {
                alert("Connection has been established but there the server replied with an error");
        }
    };
    ourRequest.onerror = function(){
        alert("Connection error - please check the spelling of the provided url");
    };

    // function errorlogging (errorLgo) {
    //     if (ourRequest.onerror) {
    //         alert("Connection error");
    //     } else {
    //
    //     }
    // };

    ourRequest.send();
    pageNumber++;
    if (pageNumber > 3){
        triggerBtn.classList.add("hide-me");
    }
});

function renderTheContent (data) {
    var htmlString = "";
    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is frequently " + data[i].hobby + " and likes ";

        for (ii = 0; ii < data[i].preferences.likes.length; ii++) {
            if ( ii == 0){
                htmlString += data[i].preferences.likes[ii];
            } else {
                htmlString += " and " + data[i].preferences.likes[ii];
            }
        }

        htmlString += ' but dislikes ';
        for (ii = 0; ii < data[i].preferences.dislikes.length; ii++) {
            if ( ii == 0){
                htmlString += data[i].preferences.dislikes[ii];
            } else {
                htmlString += " and " + data[i].preferences.likes[ii];
            }
        }

        htmlString += ".</p>";
    }
    // ourContainer.insertAdjacentHTML('beforeend', `testing123`);
    ourContainer.insertAdjacentHTML('beforeend', htmlString);
}