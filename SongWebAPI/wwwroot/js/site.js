// Load Song Data 
function loadSongs() {
    // Generate AJAX request for collecting All Song Details
    $.ajax({
        type: "GET",
        url: 'api/Songs',
        cache: false,
        success: function (data) {
            // Select 
            const divBody = $("#songData");

            $(divBody).empty(); // Empty the content of Previous Table Body 

            if (data.length == 0) { // If there is no data present
                // Prepare message to Display
                const details = $('<div class="col-md-12"></div>')
                    .append('<h1 class="text-center">There is No Song Posted</h1>');
                // Add Details to Div Body
                details.appendTo(divBody);
            } else {
                // Iterate all JSON data
                $.each(data, function (key, item) {

                    // Prepare Card to For Display Song Details
                    const details = $('<div class="card col-md-4 mb-2"></div>')
                        .append('<div class="card-body"></div>')
                        .append($('<div class="card-title"></div>').html('<h4 class="text-center">' + item.songTitle + '</h4>'))
                        .append($('<p class="card-text"></p>').html('<strong>Singer:</strong> ' + item.singer))
                        .append($('<p class="card-text"></p>').html('<strong>Lyricist:</strong> ' + item.lyricist))
                        .append($('<p class="card-text"></p>').html('<strong>Release Date:</strong> ' + item.releaseDate))
                        .append($('<button class="btn btn-secondary mb-1" data-toggle="modal" data-target="#songForm">Edit Song Info</button>')
                            .on("click", function () {
                                // Call get Song Data Details For Edit
                                fetchSong(item.songID);
                            })
                        )
                        .append($('<button class="btn btn-danger">Delete Record</button>')
                            .on("click", function () {
                                // Call remove Song Data from Database
                                
                                deleteSong(item.songID);
                            })
                        );
                    // Add Details to Div Body
                    details.appendTo(divBody);
                });
            }
        }
    });
}

// This function used to save Song Details using Web API
function saveDetails() {
    // Fetch Song Form Data

    let title = $('#title').val();
    let singer = $('#singer').val();
    let release_date = $('#release_date').val();
    let lyricist1 = $("#lyricist").val();

    // Fetch Song ID Value
    let songid = $("#SongID").val();
    let updateForm = false;

    if (songid != "") {
        updateForm = true;
        songid = parseInt(songid)
    }

    // Save Details in Song JSON Data
    let songdetails = {
        songTitle: title,
        singer: singer,
        releaseDate: release_date,
        lyricist: lyricist1
    };

    let requestType = "POST";
    let apiUrl = 'api/Songs'
    if (updateForm) {
        songdetails['songid'] = songid;
        requestType = "PUT";
        apiUrl = 'api/Songs/' + songid;
    }
    console.log(songdetails);
    // Request the Web API for Insertion
    $.ajax({
        type: requestType,
        url: apiUrl,
        data: JSON.stringify(songdetails),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Success Message        
        $("#songForm").modal("hide");
        clearForm();
        let message = "Sale Details are Saved in System";
        if (updateForm) {
            message = "Sale Details are Updated in System";
        }
        $("#message").text(message);
        $("#messageDialog").modal("show");
        // Load Song Details
        loadSongs();
    }).fail(function (xhr, status) {
        // Error Message
        clearForm();
        $("#songForm").modal("hide");
        $("#message").text("Song Details are not Saved in System");
        $("#messageDialog").modal("show");
    });
}

// Function to Clear Form
function clearForm() {
    $('#title').val("");
    $('#singer').val("");
    $('#release_date').val('');
    $('#lyricist').val("");
    $("#songid").val("");
}

// Fetch Details of Song According to its ID
function fetchSong(songid) {
    $.ajax({
        type: "GET",
        url: 'api/Songs/' + songid,
        contentType: "application/json"
    }).done(function (data) {
        // Set Form Data
        $('#SongID').val(data.songID);
        $('#title').val(data.songTitle);
        $('#singer').val(data.singer);
        $('#lyricist').val(data.lyricist);
        $('#release_date').val(data.releaseDate);
    });
}

// Function to delete Song Details
function deleteSong(songid) {
    // Display a Confirm Box For Confirmation
    let result = confirm("Hey, Are Your Sure to Remove this Song Info.?");

    if (result) {
        // Request Web API to Delete Sale
        $.ajax({
            type: "DELETE",
            url: 'api/Songs/' + songid,
        }).done(function (response) {
            // Refresh Sale Details
            loadSongs();
        });
    }
}