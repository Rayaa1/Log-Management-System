# Log-Management-System
# Log Management System

A JavaScript (Node.js) application for managing log files, demonstrating the use of **Factory Pattern**, **Singleton Pattern**, and **Facade Pattern**.

## Project Overview

The system supports multiple log types:

- INFO
- WARNING
- ERROR

Features include:

- Creating log entries
- Saving logs to a file
- Reading logs from a file
- Filtering logs by type
- Centralized file management
- Console menu for user interaction

---

## Software Design Patterns

### Factory Pattern

Implemented through the `LogFactory` class.

Responsible for creating different log objects:

- InfoLog
- WarningLog
- ErrorLog

Example:

```javascript
const log = LogFactory.createLog(
    "info",
    "User logged in"
);
```

### Singleton Pattern

Implemented through the `LogManager` class.

Ensures that only one instance manages access to the log file.

Benefits:

- Centralized file management
- Prevents multiple managers from being created
- Easier maintenance

### Facade Pattern

Implemented through the `LogFacade` class.

Provides a simplified interface to the entire logging system.

Example:

```javascript
logSystem.addLog(...)
logSystem.showAllLogs()
logSystem.showLogsByType(...)
```

The client code does not directly interact with `LogFactory` or `LogManager`.

---

## Project Structure

```text
LogManagementSystem/
│
├── app.js
│
├── storage/
│   └── logs.txt
│
├── models/
│   ├── Log.js
│   ├── InfoLog.js
│   ├── WarningLog.js
│   └── ErrorLog.js
│
└── patterns/
    │
    ├── factory/
    │   └── LogFactory.js
    │
    ├── singleton/
    │   └── LogManager.js
    │
    └── facade/
        └── LogFacade.js
```

---

## Features

### Add Log Entries

The system allows creating:

- INFO logs
- WARNING logs
- ERROR logs

### Save Logs to File

All log entries are stored in:

```text
storage/logs.txt
```

### Read Logs from File

The application loads and displays previously stored log entries.

### Filter Logs by Type

The user can display:

- INFO logs only
- WARNING logs only
- ERROR logs only

---

## Console Menu

```text
===== LOG MANAGEMENT =====

1. Add INFO log
2. Add WARNING log
3. Add ERROR log
4. Show all logs
5. Show INFO logs
6. Show WARNING logs
7. Show ERROR logs
0. Exit
```

---

## Example Output

```text
========== ALL LOGS ==========

[INFO] User logged in
[WARNING] Low memory warning
[ERROR] Database connection failed
```

Filtering by ERROR:

```text
========== ERROR LOGS ==========

[ERROR] Database connection failed
```

---

## UML Class Diagram

The project includes the following classes:

- Log
- InfoLog
- WarningLog
- ErrorLog
- LogFactory
- LogManager
- LogFacade

Relationships:

- InfoLog inherits from Log
- WarningLog inherits from Log
- ErrorLog inherits from Log
- LogFactory creates Log objects
- LogFacade uses LogFactory
- LogFacade uses LogManager

---

## Installation

### Requirements

- Node.js

Verify installation:

```bash
node -v
```

### Run the Application

```bash
node app.js
```

---

## Technologies Used

- JavaScript
- Node.js
- File System (`fs` module)
- Object-Oriented Programming (OOP)

---

## Author

Course Project – Software Design Patterns

Implemented Patterns:

- Factory Pattern
- Singleton Pattern
- Facade Pattern


