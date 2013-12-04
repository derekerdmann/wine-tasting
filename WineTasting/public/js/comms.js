window.onload = function() {

    // Set up initial websocket connection
    var socket = io.connect('/');
    var user = null;

    socket.on("connected", function(data) {
        user = data;
    });

    socket.on("comment", function(data) {
        console.log("Received comment: " + JSON.stringify(data));

        var wines = document.getElementsByClassName("tasting-sheet");
        for( var i = 0, len = wines.length; i < len; ++i ) {
            if( wines[i].dataset.wine == data.wine ) {

                // Find the right type
                for(var j = 0, tlen = wines[i].children.length; j < tlen; ++j ) {
                    var description = wines[i].children[j].children[0];
                    if( description.dataset.type == data.type ) {
                        var comment = document.createElement("span")
                        comment.classList.add("comment");
                        comment.classList.add("label");
                        comment.textContent = data.message;
                        comment.style.backgroundColor = data.user.color;
                        description.insertBefore(comment, description.children[0]);
                    }
                } 

            }
        }

    });

    // Bind the submit handlers on the tasting boxes
    var inputs = document.getElementsByClassName("descriptor");
    for( var i = 0, len = inputs.length; i < len; ++i ) {
        var descriptor = inputs[i];

        descriptor.addEventListener("keypress", function(event) {
            // Make sure it was the enter key
            if( event.keyCode == 13 || event.which == 13 ) {
                var input = event.target;
                var type = input.previousElementSibling.dataset.type;
                var wineId = input.parentNode.parentNode.dataset.wine;

                socket.emit("comment", { 
                    type: type,
                    wine: wineId,
                    message: input.value,
                    user: user
                });

                event.target.value = "";
            }
        });
    }

}
