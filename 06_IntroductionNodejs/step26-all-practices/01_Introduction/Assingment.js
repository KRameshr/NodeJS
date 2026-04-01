// Problem Statement:
// Create a simple menu-driven command line application using Nodejs in which the user can enter two numbers and perform addition, multiplication, subtraction, and division.

// The requirements look like this:
// The menu should contain these operations:

//         Addition

//         Subtraction

//         Multiplication

//         Division

//         Exit

// The application should handle DivideByZero error by showing an error message.

// The application should exit only when a user chooses the exit option in the menu.

const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Showmenu = () => {
  console.log("\n<--- calculater Menu --->");
  console.log("1. Addition  ");
  console.log("2. Subraction  ");
  console.log("3. multiplication  ");
  console.log("4. Division  ");
  console.log("5. Exist ");

  r1.question("select option in (1-5) : ", handleMenu);
};

const handleMenu = (choice) => {
  if (choice === "5") {
    console.log("Exisisting Application is Good is Closed");
    r1.close();
    return;
  }

  if (!["1", "2", "3", "4"].includes(choice)) {
    console.log("Please enter a valide choices");
    return Showmenu();
  }

  r1.question("Enter a First number : ", (num1) => {
    r1.question("Enter a Second number : ", (num2) => {
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);
      if (isNaN(n1) || isNaN(n2)) {
        console.log("Please enter a valide Number");
      } else {
        PerformanceCalculater(choice, n1, n2);
      }
      Showmenu();
    });
  });
};

const PerformanceCalculater = (choice, n1, n2) => {
  switch (choice) {
    case "1":
      console.log(`Result : ${n1} + ${n2} = ${n1 + n2} `);
      break;
    case "2":
      console.log(`Result : ${n1} - ${n2} = ${n1 - n2} `);
      break;
    case "3":
      console.log(`Result : ${n1} * ${n2} = ${n1 * n2} `);
      break;
    case "4":
      if (n2 === 0) {
        console.log("Zero not Divisible ");
      } else {
        console.log(`Result : ${n1} / ${n2} = ${n1 / n2} `);
      }
      break;
  }
};

Showmenu();
