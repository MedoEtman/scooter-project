const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('Scooter class', () => {
  let scooter;

  beforeEach(() => {
    scooter = new Scooter('station1');
  });

  it('rent() should throw error if charge is less than 20', () => {
    scooter.charge = 15;
    expect(() => {
      scooter.rent('user1');
    }).toThrow('Scooter needs to charge');
  });

  it('rent() should throw error if isBroken is true', () => {
    scooter.isBroken = true;
    expect(() => {
      scooter.rent('user1');
    }).toThrow('Scooter needs repair');
  });

  it('rent() should change user and station property', () => {
    scooter.rent('user1');
    expect(scooter.user).toBe('user1');
    expect(scooter.station).toBeNull();
  });

  it('dock() should change station property and set user to null', () => {
    scooter.user = 'user1';
    scooter.dock('station2');
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe('station2');
  });

  it('recharge() should increase charge over time', async () => {
    jest.useFakeTimers();
    scooter.charge = 50;

    scooter.recharge();
    jest.advanceTimersByTime(5000);
    expect(scooter.charge).toBe(75);

    jest.advanceTimersByTime(5000);
    expect(scooter.charge).toBe(100);
    jest.useRealTimers();
  });

  it('requestRepair() should set isBroken to true and then false after 5000ms', async () => {
    jest.useFakeTimers();
    scooter.requestRepair();

    expect(scooter.isBroken).toBe(true);
    jest.advanceTimersByTime(5000);
    expect(scooter.isBroken).toBe(false);
    jest.useRealTimers();
  });
  
});

