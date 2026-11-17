const Log = require("./Log");

class ErrorLog extends Log {
    getType() {
        return "ERROR";
    }
}

module.exports = ErrorLog;