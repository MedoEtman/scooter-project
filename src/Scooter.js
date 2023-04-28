class Scooter{
  static nextSerial = 1;
  
    constructor(station) {
      this.station = station;
      this.user = null;
      this.serial = Scooter.nextSerial;
      Scooter.nextSerial++;
      this.charge = 100;
      this.isBroken = false;
    }
  
    rent(user) {
      if (this.charge < 20) {
        throw new Error("Scooter needs to charge");
      }
      if (this.isBroken) {
        throw new Error("Scooter needs repair");
      }
      this.user = user;
      this.station = null;
    }
  
    dock(station) {
      this.station = station;
      this.user = null;
    }
  
    recharge() {
      const timer = setInterval(() => {
        this.charge += 5;
        console.log(`Charge at ${this.charge}%`);
        if (this.charge >= 100) {
          clearInterval(timer);
        }
      }, 1000);
    }
  
    requestRepair() {
      setTimeout(() => {
        this.isBroken = false;
        console.log("Repair completed for Scooter #" + this.serial);
      }, 5000);
      this.isBroken = true;
    }
}


module.exports = Scooter
