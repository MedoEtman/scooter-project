const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')


describe('ScooterApp', () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
  });

  describe('registerUser', () => {
    it('should register a new user', () => {
      const user = scooterApp.registerUser('testuser', 'password', 20);
      expect(user).toBeDefined();
      expect(user.username).toBe('testuser');
      expect(user.age).toBe(20);
    });

    it('should throw an error if user is already registered', () => {
      scooterApp.registerUser('testuser', 'password', 20);
      expect(() => scooterApp.registerUser('testuser', 'newpassword', 25)).toThrow('User already registered.');
    });

    it('should throw an error if user is under 18', () => {
      expect(() => scooterApp.registerUser('testuser', 'password', 16)).toThrow('User must be at least 18 years old to register.');
    });
  });

  describe('loginUser', () => {
    it('should log in a registered user', () => {
      scooterApp.registerUser('testuser', 'password', 20);
      expect(() => scooterApp.loginUser('testuser', 'password')).not.toThrow();
    });

    it('should throw an error if username or password is incorrect', () => {
      scooterApp.registerUser('testuser', 'password', 20);
      expect(() => scooterApp.loginUser('testuser', 'wrongpassword')).toThrow('Username or password is incorrect.');
      expect(() => scooterApp.loginUser('nonexistentuser', 'password')).toThrow('Username or password is incorrect.');
    });
  });

  describe('logoutUser', () => {
    it('should log out a logged in user', () => {
      scooterApp.registerUser('testuser', 'password', 20);
      scooterApp.loginUser('testuser', 'password');
      expect(() => scooterApp.logoutUser('testuser')).not.toThrow();
    });

    it('should throw an error if username is not logged in', () => {
      scooterApp.registerUser('testuser', 'password', 20);
      expect(() => scooterApp.logoutUser('testuser')).toThrow('No such user is logged in.');
      scooterApp.login;
    });
  });
});