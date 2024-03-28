//Event loop phases. 1 Timmer phase is responsible for executing call backs schedule through function like set timeout set intervel. can be used for session timeout

function logoutUser() {
    //perform user log out logic here
    console.log('User logged out due to inactivity');
}

//Set a Timer for session timeout.
const sessionTimeout = setTimeout(logoutUser, 15 * 60 * 1000); // 15 minutes

//when User perform some activity, reset the timer
function onUserActivity() {
    clearTimeout(sessionTimeout);
    console.log('user activity detected. Session timer reset.');
}

//Example: Rest the time when user interact with the application can be triggered on mouse click, keyboard input and etc
