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
  var firstTrain = (childsnapshot.val().firstTrain)

  // How to find `nextArrival`
  // Get current time
  var currentTime = moment();
  console.log('Current time: ' + moment(currentTime).format('hh:mm'))
  // Convert `firstTrain` 
  var firstTrainConverted = moment(firstTrain, 'HH:mm').subtract(1, 'years');
  console.log(firstTrainConverted);
  // Calculate difference in minutes between `firstTrain` and the `currentTime`
  var diffTime = moment().diff(moment(firstTrainConverted), 'minutes');
  console.log('Difference in time: ' + diffTime);
  // Divide that number by the `frequency`
  var remainderTime = diffTime % frequency;
  console.log(remainderTime);
  // Subtract this number from `frequency`
  // This will give you your `minutesAway` number
  var minutesTillTrain = frequency - remainderTime;
  console.log('Minutes till next train: ' + minutesTillTrain);
  // Add that number to the current time to find the `nextArrival`
  var nextArrival = moment().add(minutesTillTrain, 'minutes');
  var nextTrain = moment(nextArrival).format('hh:mm');

  // Update the HTML with our stored data
  $('#train-name').append('<p>' + name + '</p>');
  $('#train-destination').append('<p>' + destination + '</p>');
  $('#train-frequency').append('<p>' + frequency + '</p>');
  $('#train-arrival').append('<p>' + nextTrain + '</p>')
  $('#train-minutes-away').append('<p>' + minutesTillTrain + '</p>')
},
// Create Error Handling
function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});