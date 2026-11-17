const Log = require("./Log");

class InfoLog extends Log {
    getType() {
        return "INFO";
    }
}

module.exports = InfoLog;