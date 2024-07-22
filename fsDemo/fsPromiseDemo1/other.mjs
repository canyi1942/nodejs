import * as fsp from 'fs/promises'

function other() {
    console.log(fsp.constants)
}

async function watch() {
    try {
        const ac = new AbortController()
        const { signal } = ac
        setTimeout(() => {
            ac.abort()
        }, 10000000);

        const watcher = fsp.watch('../', {
            persistent: true,
            recursive: true,
            encoding: 'utf-8',
            signal: signal
        })

        for await (const event of watcher) {
            console.log(event)
        }
    } catch (error) {
        console.error(error)
    }
}

other()
watch()