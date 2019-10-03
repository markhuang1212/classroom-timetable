const fs = require('fs')
const path = require('path')

const formatData = (datas) => {
    const filteredTBA = datas.filter(data => data.time != 'TBA' && data.room != 'TBA')
    let usableDatas = []
    let unusableData = []
    filteredTBA.forEach(data => {
        if (data.time.includes('\n')) {
            unusableData.push(data)
        }
        else {
            usableDatas.push(data)
        }
    })

    let formattedData =  usableDatas.map(data => {
        const room = data.room.split(' (')[0]
        const times = []
        if (data.time.split(' ')[0].length > 2) {
            const days = data.time.split(' ')[0]
            for (let i = 0; i < days.length; i = i + 2) {
                const day = days.split(i, i + 2)
                const time = `${day} ${data.time.slice(days.length + 1)}`
                times.push(time)
            }
        } else {
            times.push(data.time)
        }
        return { room, times }
    })

    return {unusableData,formattedData}
}

const files = fs.readdirSync(path.join(__dirname,'../data/raw-data'))
files.forEach((filename,i)=>{
    const datas = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/raw-data',filename)))
    const result = formatData(datas)
    fs.writeFileSync(path.join(__dirname,'../data/formatted-data',filename),JSON.stringify(result,null,2))
    console.log(`completed: ${i+1}/${files.length}`)
})