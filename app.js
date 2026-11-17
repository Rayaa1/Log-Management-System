const readline = require("readline");
const logSystem = require("./patterns/facade/LogFacade");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {

    console.log("\n===== LOG MANAGEMENT =====");
    console.log("1. Add INFO log");
    console.log("2. Add WARNING log");
    console.log("3. Add ERROR log");
    console.log("4. Show all logs");
    console.log("5. Show INFO logs");
    console.log("6. Show WARNING logs");
    console.log("7. Show ERROR logs");
    console.log("0. Exit");

    rl.question("\nChoice: ", (choice) => {

        switch(choice) {

            case "1":
                rl.question("Message: ", (msg) => {
                    logSystem.addLog("info", msg);
                    console.log("INFO log added.");
                    menu();
                });
                break;

            case "2":
                rl.question("Message: ", (msg) => {
                    logSystem.addLog("warning", msg);
                    console.log("WARNING log added.");
                    menu();
                });
                break;

            case "3":
                rl.question("Message: ", (msg) => {
                    logSystem.addLog("error", msg);
                    console.log("ERROR log added.");
                    menu();
                });
                break;

            case "4":
                logSystem.showAllLogs();
                menu();
                break;

            case "5":
                logSystem.showLogsByType("INFO");
                menu();
                break;

            case "6":
                logSystem.showLogsByType("WARNING");
                menu();
                break;

            case "7":
                logSystem.showLogsByType("ERROR");
                menu();
                break;

            case "0":
                rl.close();
                break;

            default:
                console.log("Invalid choice!");
                menu();
        }
    });
}

menu();