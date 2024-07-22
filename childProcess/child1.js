process.on('message', (data) => {
    if (data.task === 'compute') {
        const result = computeTask(data.data)
        process.send(result)
    }
})

function computeTask(data) {
    let sum = 0

    for (let i = 0; i < data; i++) {
        sum += i
    }

    return {data, sum}
}