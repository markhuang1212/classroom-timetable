const puppeteer = require('puppeteer');

const generateLinks = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://w5.ab.ust.hk/wcq/cgi-bin/1910/subject/ACCT')
    const deptCode = await page.evaluate(() => {
        let depsString = document.querySelector('.depts').innerText
        let finished = false
        let results = []
        for (let i = 0; depsString[i]; i = i + 4) {
            results.push(depsString.slice(i, i + 4))
        }
        return results
    })
    const links = deptCode.map(v => 'https://w5.ab.ust.hk/wcq/cgi-bin/1910/subject/' + v)
    await browser.close()
    return links
}

module.exports = generateLinks


// (async () => {
//     console.log(JSON.stringify(await generateLinks(), null, 2))
// })()