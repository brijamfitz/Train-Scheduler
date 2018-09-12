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

$('.submit-button').on('click', function(event){
    event.preventDefault();
    var trainName = $('#train-name').val().trim();
    console.log(trainName);
    var destination = $('#destination').val().trim();
    console.log(destination);
    var trainTime = $('#train-time').val().trim();
    console.log(trainTime);
    var frequency = $('#frequency').val().trim();
    console.log(frequency);

    $('#name').append('<div>' + trainName + '</div>');
    $('#dest').append('<div>' + destination + '</div>');
    $('#freq').append('<div>' + frequency + '</div>');
    $('#arrival').append('<div>' + trainTime + '</div>');

}) 