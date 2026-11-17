const InfoLog = require("../../models/InfoLog");
const WarningLog = require("../../models/WarningLog");
const ErrorLog = require("../../models/ErrorLog");

class LogFactory {
    static createLog(type, message) {

        switch (type.toLowerCase()) {

            case "info":
                return new InfoLog(message);

            case "warning":
                return new WarningLog(message);

            case "error":
                return new ErrorLog(message);

            default:
                throw new Error("Invalid log type");
        }
    }
}

module.exports = LogFactory;