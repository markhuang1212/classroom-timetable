const fs = require('fs')
const path = require('path')

const filesname = fs.readdirSync(path.join(__dirname, '../data/raw-data'))

let DATA = []

filesname.forEach(filename => {
    fileDATA = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/raw-data', filename)))
    fileDATA.forEach(data => DATA.push(data))
})

fs.writeFileSync(path.join(__dirname, '../data/DATA'), JSON.stringify(DATA, null, 2))