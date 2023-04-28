const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor() {
    this.stations = {
      "station1": [],
      "station2": [],
      "station3": []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered.");
    }
    if (age < 18) {
      throw new Error("User must be at least 18 years old to register.");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`User ${username} has been registered.`);
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user || !user.login(password)) {
      throw new Error("Username or password is incorrect.");
    }
    console.log(`User ${username} has been logged in.`);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user || !user.loggedIn) {
      throw new Error("No such user is logged in.");
    }
    user.logout();
    console.log(`User ${username} has been logged out.`);
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("Created new scooter.");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station.");
    }
    this.stations[station].push(scooter);
    scooter.dock(station);
    console.log("Scooter is docked.");
  }
}

module.exports = ScooterApp
