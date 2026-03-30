class hero {
  fistName = "John";
  lastName = "Doe";
  constructor(fistName, lastName) {
    this.fistName = fistName;
    this.lastName = lastName;
  }
  getFullName() {
    return this.fistName + " " + this.lastName;
  }
}

module.exports = { hero };
