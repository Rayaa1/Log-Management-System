const fs = require("fs");

class LogManager {

    constructor() {

        if (LogManager.instance) {
            return LogManager.instance;
        }

        this.filePath = "./storage/logs.txt";

        LogManager.instance = this;
    }

    writeLog(log) {
        fs.appendFileSync(
            this.filePath,
            log.toString() + "\n"
        );
    }

    readLogs() {

        if (!fs.existsSync(this.filePath)) {
            return [];
        }

        const data =
            fs.readFileSync(
                this.filePath,
                "utf8"
            );

        return data
            .split("\n")
            .filter(line => line !== "");
    }

    filterByType(type) {
        return this.readLogs()
            .filter(log => log.startsWith(`[${type}]`));
    }
}

module.exports = new LogManager();