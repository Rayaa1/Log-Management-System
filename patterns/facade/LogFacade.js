
const LogFactory = require("../factory/LogFactory");
const LogManager = require("../singleton/LogManager");

class LogFacade {

    // Добавяне на нов лог
    addLog(type, message) {

        const log =
            LogFactory.createLog(
                type,
                message
            );

        LogManager.writeLog(log);
    }

    // Показване на всички логове в конзолата
    showAllLogs() {

        const logs =
            LogManager.readLogs();

        logs.forEach(log =>
            console.log(log)
        );
    }

    // Показване на логове по тип в конзолата
    showLogsByType(type) {

        const logs =
            LogManager.filterByType(type);

        logs.forEach(log =>
            console.log(log)
        );
    }

    // Връщане на всички логове
    getAllLogs() {
        return LogManager.readLogs();
    }

    // Връщане на логове по тип
    getLogsByType(type) {
        return LogManager.filterByType(type);
    }
}

module.exports = new LogFacade();
