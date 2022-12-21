function mergeObjArray(inputArray1, inputArray2) {
  if (!Array.isArray(inputArray1) || !Array.isArray(inputArray2)) {
    console.log(new Error(`Inputs must be arrays!`));
  }
  inputArray1.forEach((element) => {
    if (element.constructor !== Object) {
      console.log(new Error(`1st Input must be an array of objects!`));
    }
  });
  inputArray2.forEach((element) => {
    if (element.constructor !== Object) {
      console.log(new Error(`2nd Input must be an array of objects!`));
    }
  });

  let userData = [];

  inputArray1.forEach((item) => {
    userData.push(
      Object.assign(
        {},
        item,
        ...inputArray2.filter((el) => {
          return el.uid === item.uid;
        })
      )
    );
  });

  return userData;
}

let userData = mergeObjArray(personData, additionalPersonData);

userData.read = function () {
  console.log(this);
};

let createTestObj = {
  uid: 7,
  firstName: "Ali",
  lastName: "Darvish",
  position: "Back-end Developer",
  city: "Hamedan",
};

userData.create = function (inputObj) {
  if (Object.keys(inputObj).length !== Object.keys(this[0]).length) {
    console.log(new Error("Error: input must have right pattern!"));
    return;
  }

  for (let i = 0; i < Object.keys(inputObj).length; i++) {
    if (Object.keys(inputObj).sort()[i] !== Object.keys(this[0]).sort()[i]) {
      console.log(
        new Error("Error: some of input properties aren't in right pattern")
      );
      return;
    }
  }

  this.forEach((obj) => {
    if (inputObj.uid === obj.uid) {
      console.log(
        new Error("Error: similar uid found! please enter a unique uid!")
      );
      return;
    }
  });

  this.push(inputObj);
  console.log(
    `${inputObj.firstName} ${inputObj.lastName} data created successfuly!`
  );
};

// userData.create(createTestObj);
// userData.read();

userData.remove = function (inputUid) {
  if (typeof inputUid !== "number") {
    console.log(new Error("Error: input UID must be a number!"));
    return;
  }
  let flag = true;
  this.forEach((obj, index) => {
    if (obj.uid === inputUid) {
      this.splice(index, 1);
      flag = true;
    } else {
      flag = false;
    }
  });

  flag
    ? console.log(`Person data removed successfuly!`)
    : console.log(`Person with entered UID not found!`);
};

// userData.create(createTestObj);
// userData.remove(7);
// userData.read();

// Update property value
userData.update = function (uid, property, value) {
  if (typeof uid !== "number") {
    console.log(new Error("Error: input UID must be a number!"));
    return;
  }

  if (
    this.filter((obj) => {
      return obj.uid === uid;
    }).length === 0
  ) {
    console.log(new Error("Error: Person with entered uid not found!"));
    return;
  }

  if (typeof property !== "string" || typeof value !== "string") {
    console.log(new Error("Error: entered property or value is not a string!"));
    return;
  }

  let temp = [];
  let objIndex = this.findIndex((item) => {
    return item.uid === uid;
  });
  Object.entries(
    this.filter((obj) => {
      return obj.uid === uid;
    })[0]
  ).forEach((prop) => {
    if (prop[0] === property) {
      prop[1] = value;
      temp.push(prop);
    } else {
      temp.push(prop);
    }
  });
  console.log(objIndex);
  this[objIndex] = Object.fromEntries(temp);
};

// userData.update(1, "firstName", "Peyman");
// userData.read();
let updateTestObj = {
  uid: 8,
  firstName: "Ali",
  lastName: "Darvish",
  position: "Back-end Developer",
  city: "Hamedan",
};
userData.fullUpdate = function (inputObj) {
  if (Object.keys(inputObj).length !== Object.keys(this[0]).length) {
    console.log(new Error("Error: input must have right pattern!"));
    return;
  }

  for (let i = 0; i < Object.keys(inputObj).length; i++) {
    if (Object.keys(inputObj).sort()[i] !== Object.keys(this[0]).sort()[i]) {
      console.log(
        new Error("Error: some of input properties aren't in right pattern")
      );
      return;
    }
  }

  if (
    this.filter((obj) => {
      return obj.uid === inputObj.uid;
    }).length === 0
  ) {
    console.log(new Error("Error: Person with entered uid not found!"));
    return;
  }

  let objIndex = this.findIndex((item) => {
    return item.uid === inputObj.uid;
  });
  this.splice(objIndex, 1, inputObj);
};

userData.fullUpdate(updateTestObj);
userData.read();
