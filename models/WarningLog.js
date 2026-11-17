const Log = require("./Log");

class WarningLog extends Log {
    getType() {
        return "WARNING";
    }
}

module.exports = WarningLog;