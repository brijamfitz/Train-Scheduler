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

// On click event to retrieve user input and push/set to database
$('#submit-button').on('click', function(event){
    // Prevent entire page from reloading
    event.preventDefault();
    // Retrieve the user inputs and store in variables
    var name = $('#name').val().trim();
    console.log(name);
    var destination = $('#destination').val().trim();
    console.log(destination);
    var firstTrain = $('#first-train').val().trim();
    console.log(firstTrain);
    var frequency = $('#frequency').val().trim();
    console.log(frequency);
    var nextArrival; // Use momentjs
    var minutesAway; // Use momentjs

    // How to find `nextArrival`
    // Calculate difference in minutes between `firstTrain` and the current time
    // Divide that number by the `frequency`
    // This will give you your `minutesAway` number
    // Add that number to the current time to find the `nextArrival`

    // Variable stores all our data
    var trainInfo = {
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    }
    // Push our data to firebase database
    database.ref().push(trainInfo);
    // Clear out input boxes
    $('#name').val('');
    $('#destination').val('');
    $('#first-train').val('');
    $('#frequency').val('');

})

// Firebase watcher and HTML update
database.ref().on('child_added', function(childsnapshot) {
  // Log the current data in firebase
  console.log(childsnapshot.val());
  // Retrieve the values from the database and store in variablles
  var name = (childsnapshot.val().name);
  var destination = (childsnapshot.val().destination);
  var frequency = (childsnapshot.val().frequency);
  // Update the HTML with our stored data
  $('#train-name').append('<p>' + name + '</p>');
  $('#train-destination').append('<p>' + destination + '</p>');
  $('#train-frequency').append('<p>' + frequency + '</p>');
},
// Create Error Handling
function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});