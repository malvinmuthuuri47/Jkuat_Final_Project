const fs = require('node:fs')

// function writeToFile(filePath, content) {
//     fs.writeFile(filePath, content + '\n', { flag: 'a+' }, err => {
//         if (err) {
//             console.log('Error logging data to file')
//         }
//         else {
//             console.log('File written successfully')
//         }
//     })
// }

function writeToFile(filePath, newContent) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        let logs = []

        if (!err && data) {
            try {
                logs = JSON.parse(data) // Parse existing JSON if valid
                if (!Array.isArray(logs)) logs = [] // Ensure logs is an array 
            } catch (error) {
                console.error("Error parsing JSON log file:", error)
                logs = []   // Reset to empty array if JSON is corrupted
            }
        }

        logs.push(newContent)   // Add new log entry
    })

    fs.writeFile(filePath, JSON.stringify(logs), (writeErr) => {
        if (writeErr) {
            console.log("Error writing to JSON log file", writeErr)
        } else {
            console.log("Log entry added successfully")
        }
    })
}

module.exports = writeToFile