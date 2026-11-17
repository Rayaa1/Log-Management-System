const LogFactory = require("../factory/LogFactory");
const LogManager = require("../singleton/LogManager");

class LogFacade {

    addLog(type, message) {

        const log =
            LogFactory.createLog(
                type,
                message
            );

        LogManager.writeLog(log);
    }

    showAllLogs() {

        const logs =
            LogManager.readLogs();

        logs.forEach(log =>
            console.log(log)
        );
    }

    showLogsByType(type) {

        const logs =
            LogManager.filterByType(type);

        logs.forEach(log =>
            console.log(log)
        );
    }
}

module.exports = new LogFacade();
