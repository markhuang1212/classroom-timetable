const egDatas = [
    {
        time: "TuTh 04:30PM - 05:50PM",
        room: "Rm 1005, LSK Bldg (70)"
    },
    {
        time: "TuTh 10:30AM - 11:50AM",
        room: "Rm 1011, LSK Bldg (80)"
    }
]

const formatData = (datas) => {
    return datas.map(data => {
        const room = data.room.split(' (')[0]
        const times = []
        if (data.time.split(' ')[0].length == 4) {
            fst = data.time.slice(0, 2)
            sec = data.time.slice(2, 4)
            rest = data.time.slice(5)
            times.push(`${fst} ${rest}`)
            times.push(`${sec} ${rest}`)
        } else {
            times.push(data.time)
        }
        return { room, times }
    })
}

console.log(formatData(egDatas))
