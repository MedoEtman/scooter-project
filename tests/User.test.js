const User = require('../src/User')

describe("User", () => { 
    let user;
  
    beforeEach(() => {
      user = new User("Alice", "password", 25);
    });
  
    describe("login", () => {
      it("should log in with correct password", () => {
        expect(user.login("password")).toBe(true);
        expect(user.loggedIn).toBe(true);
      });
  
      it("should throw error with incorrect password", () => {
        expect(() => user.login("wrongPassword")).toThrow("Incorrect password.");
        expect(user.loggedIn).toBe(false);
      });
    });
  
    describe("logout", () => {
      it("should log out user", () => {
        user.logout();
        expect(user.loggedIn).toBe(false);
      });
    });
  
    describe("rentScooter", () => {
      it("should rent a scooter if user is logged in", () => {
        const scooter = new Scooter("Scooter 1", 0);
        const station = new Station("Station 1", 0);
        user.login("password");
        expect(() => user.rentScooter(scooter)).not.toThrow();
        expect(scooter.isRented()).toBe(true);
      });
  
      it("should throw error if user is not logged in", () => {
        const scooter = new Scooter("Scooter 2", 0);
        const station = new Station("Station 2", 0);
        user.logout();
        expect(() => user.rentScooter(scooter)).toThrow("User must be logged in to rent a scooter.");
        expect(scooter.isRented()).toBe(false);
      });
    });
  
    describe("returnScooter", () => {
      it("should return a scooter if user is logged in", () => {
        const scooter = new Scooter("Scooter 3", 0);
        const station = new Station("Station 3", 0);
        user.login("password");
        scooter.rent(user);
        expect(() => user.returnScooter(scooter, station)).not.toThrow();
        expect(scooter.isRented()).toBe(false);
      });
  
      it("should throw error if user is not logged in", () => {
        const scooter = new Scooter("Scooter 4", 0);
        const station = new Station("Station 4", 0);
        user.logout();
        expect(() => user.returnScooter(scooter, station)).toThrow(
          "User must be logged in to return a scooter."
          );
          expect(scooter.isRented()).toBe(true);
          });
          });
});