

const queue: any[] = [];
const activePreFlushCbs: any[] = [];

let isFlushPending = false;

const p = Promise.resolve()

export function nextTick(fn) {
    return fn ? p.then(fn) : p;
}

export function queueJobs(job) {
    if (!queue.includes(job)) {
        queue.push(job);
    }

    queueFlush();
}

export function queuePreFlushCb(cb) {
    activePreFlushCbs.push(cb);
    queueFlush();
}

function queueFlush() {

    if (isFlushPending) return;
    isFlushPending = true

    nextTick(flusJobs);
}
function flusJobs() {
    isFlushPending = false

    flushPreFlushCbs();

    let job
    while ((job = queue.shift())) {
        job && job();
    }
}

function flushPreFlushCbs() {
    for (let i = 0; i < activePreFlushCbs.length; i++) {
        activePreFlushCbs[i]();
    }
}