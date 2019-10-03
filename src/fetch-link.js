const puppeteer = require('puppeteer')

const fetchLink = async link => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(link)
    const result = await page.evaluate(() => {
        var data = []
        const courses = document.querySelectorAll('.course')
        courses.forEach(course => {
            let rows = course.querySelector('.sections').querySelectorAll('tr')
            let code = course.querySelector('h2').innerText.split(' (')[0]
            for (let i = 1; i < rows.length; i++) {
                row = rows[i]
                row_class = row.classList.value
                if (row_class.includes('newsect')) {
                    data.push({
                        code,
                        time: rows[i].querySelectorAll('td')[1].innerText,
                        room: rows[i].querySelectorAll('td')[2].innerText
                    })
                } else {
                    data.push({
                        code,
                        time: rows[i].querySelectorAll('td')[0].innerText,
                        room: rows[i].querySelectorAll('td')[1].innerText
                    })
                }
            }
        })
        return data
    })
    await browser.close()
    return result
}

// (async () => {
//     const result = await fetchLink('https://w5.ab.ust.hk/wcq/cgi-bin/1910/subject/ACCT')
//     console.log(JSON.stringify(result, null, 2))
// })()

module.exports = fetchLink