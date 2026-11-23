const fs = require("fs");
const path = require("path");

class LogManager {

    constructor() {

        if (LogManager.instance) {
            return LogManager.instance;
        }

        this.dir = path.join(__dirname, "../../storage");
        this.filePath = path.join(this.dir, "logs.txt");
        this.lockPath = path.join(this.dir, "logs.lock");

        // папката се създава автоматично, ако липсва
        fs.mkdirSync(this.dir, { recursive: true });

        LogManager.instance = this;
    }

    sleep(ms) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }

    acquireLock() {
        for (let i = 0; i < 100; i++) {
            try {
                const fd = fs.openSync(this.lockPath, "wx");
                fs.closeSync(fd);
                return;
            } catch (err) {
                if (err.code !== "EEXIST") throw err;

                // остарял lock (например след срив) се премахва
                try {
                    const age = Date.now() - fs.statSync(this.lockPath).mtimeMs;
                    if (age > 5000) fs.unlinkSync(this.lockPath);
                } catch (e) {}

                this.sleep(20);
            }
        }
        throw new Error("Could not acquire log file lock");
    }

    releaseLock() {
        try {
            fs.unlinkSync(this.lockPath);
        } catch (e) {}
    }

    writeLog(log) {
        this.acquireLock();
        try {
            fs.appendFileSync(this.filePath, log.toString() + "\n");
        } finally {
            this.releaseLock();
        }
    }

    readLogs() {

        if (!fs.existsSync(this.filePath)) {
            return [];
        }

        const data = fs.readFileSync(this.filePath, "utf8");

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