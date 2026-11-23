
const http = require("http");
const fs = require("fs");
const path = require("path");
const LogFacade = require("./patterns/facade/LogFacade");

const PORT = 3000;

// Функция за изпращане на JSON отговор
function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8"
    });

    res.end(JSON.stringify(data));
}

// Създаване на HTTP сървър
const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://localhost:${PORT}`);

    // GET - отваряне на тестовата HTML страница
    if (req.method === "GET" && url.pathname === "/test") {

        const testFile = path.join(__dirname, "test.html");

        if (!fs.existsSync(testFile)) {
            return sendResponse(res, 404, {
                success: false,
                message: "test.html not found"
            });
        }

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        return fs.createReadStream(testFile).pipe(res);
    }

    // GET - извличане на логове
    if (req.method === "GET" && url.pathname === "/logs") {

        const type = url.searchParams.get("type");

        if (type) {
            const normalizedType = type.toUpperCase();

            if (!["INFO", "WARNING", "ERROR"].includes(normalizedType)) {
                return sendResponse(res, 400, {
                    success: false,
                    message: "Invalid log type"
                });
            }

            const logs = LogFacade.getLogsByType(normalizedType);

            return sendResponse(res, 200, {
                success: true,
                count: logs.length,
                logs: logs
            });
        }

        const logs = LogFacade.getAllLogs();

        return sendResponse(res, 200, {
            success: true,
            count: logs.length,
            logs: logs
        });
    }

    // POST - добавяне на нов лог
    if (req.method === "POST" && url.pathname === "/logs") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;

            if (body.length > 10000) {
                req.destroy();
            }
        });

        req.on("end", () => {

            try {
                const data = JSON.parse(body);

                const { type, message } = data;

                if (
                    typeof type !== "string" ||
                    typeof message !== "string" ||
                    !message.trim()
                ) {
                    return sendResponse(res, 400, {
                        success: false,
                        message: "Invalid input data"
                    });
                }

                const normalizedType = type.toUpperCase();

                if (!["INFO", "WARNING", "ERROR"].includes(normalizedType)) {
                    return sendResponse(res, 400, {
                        success: false,
                        message: "Invalid log type"
                    });
                }

                LogFacade.addLog(normalizedType, message.trim());

                return sendResponse(res, 201, {
                    success: true,
                    message: "Log added successfully"
                });

            } catch (error) {
                return sendResponse(res, 400, {
                    success: false,
                    message: "Invalid JSON"
                });
            }
        });

        return;
    }

    // Ако маршрутът не съществува
    return sendResponse(res, 404, {
        success: false,
        message: "Route not found"
    });

});

// Стартиране на сървъра
server.listen(PORT, () => {
    console.log(`Log server running at http://localhost:${PORT}`);
});
