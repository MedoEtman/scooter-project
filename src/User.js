class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    if (password === this.password) {
      this.loggedIn = true;
      return true;
    } else {
      throw new Error("Incorrect password.");
    }
  }

  logout() {
    this.loggedIn = false;
  }

  rentScooter(scooter) {
    if (!this.loggedIn) {
      throw new Error("User must be logged in to rent a scooter.");
    }
    scooter.rent(this);
  }

  returnScooter(scooter, station) {
    if (!this.loggedIn) {
      throw new Error("User must be logged in to return a scooter.");
    }
    scooter.dock(station);
  }
}

module.exports = User
