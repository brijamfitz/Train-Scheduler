// Initialize Firebase
var config = {
  apiKey: "AIzaSyDoUefwJL784SDdsj3BKMtHVxGny-zBwio",
  authDomain: "brijamfitz-project.firebaseapp.com",
  databaseURL: "https://brijamfitz-project.firebaseio.com",
  projectId: "brijamfitz-project",
  storageBucket: "brijamfitz-project.appspot.com",
  messagingSenderId: "840179599817"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// On click event to retrieve user input and push to database
$('#submit-button').on('click', function(event){

    event.preventDefault();

    var name = $('#name').val().trim();
    console.log(name);
    var destination = $('#destination').val().trim();
    console.log(destination);
    var firstTrain = $('#first-train').val().trim();
    console.log(firstTrain);
    var frequency = $('#frequency').val().trim();
    console.log(frequency);

    // Variable stores all our data
    var trainInfo = {
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }

    // Code for handling push to firebase database
    database.ref().push(trainInfo);

    // Clear out input boxes
    $('#name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');

})

// Firebase watcher
database.ref().on('child_added', function(childsnapshot) {

  console.log(childsnapshot.val());

  // Log the values from the database
  var name = (childsnapshot.val().name);
  var destination = (childsnapshot.val().destination);
  var frequency = (childsnapshot.val().frequency);

  // Update the HTML
  $('#train-name').append('<p>' + name + '</p>');
  $('#train-destination').append('<p>' + destination + '</p>');
  $('#train-frequency').append('<p>' + frequency + '</p>');

},
// Create Error Handling
function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});