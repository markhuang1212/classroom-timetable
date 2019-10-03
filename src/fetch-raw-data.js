const fs = require('fs')
const path = require('path')

const fetchLink = require('./fetch-link')
const generateLink = require('./generate-link');

(async () => {
    const links = await generateLink()
    for (let i = 0; i < links.length; i++) {
        const subj = links[i].slice(links[i].length - 4, links[i].length)
        const rawData = await fetchLink(links[i])
        fs.writeFileSync(path.join(__dirname, '../data/raw-data', subj), JSON.stringify(rawData, null, 2))
        console.log(`completed: ${i+1}/${links.length}`)
    }
})()