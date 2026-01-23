const profile = {
  userName: 'Vasanth',
  greet: () => {
    console.log(`Hi, I'm ${this.userName}`);
  },
  welcome: function() {
    console.log(`Welcome, ${this.userName}`);
  }
};
profile.greet(); // function call greet has a receiver object 'profile' which becomes this
const func = profile.greet;
func(); // function call without a receiver object so this becomes global object
const friend = { userName: 'Candidate' };
profile.greet.call(friend); //arrow function cannot have their own this so binding this with .call method will not work
profile.welcome.call(friend);// normal function can have their own this so binding this with .call method will work

