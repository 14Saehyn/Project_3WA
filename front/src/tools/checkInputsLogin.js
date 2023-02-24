const lengthLimit = (data, num = 255) => {
    if ((typeof data === 'string' || typeof data === 'number') && data.length > num) {
        return false
    }
    else if (typeof data === "object") {
        for (var info in data) {
            if (data[info].length > num) {
                return false
            }
        }
    }
    else if (Array.isArray(data)) {
        data.forEach(info => {
            if(info.length > num) {
                return false
            }
        })
    }
    return true
}

const checkEmpty = (data) => {
    if ((typeof data === 'string' || typeof data === 'number') && data.trim().length === 0) {
        return false
    }
    else if(typeof data === "object") {
        for (var info in data) {
            if (data[info].trim().length === 0) {
                return false
            }
        }
    }
    else if (Array.isArray(data)) {
        data.forEach(info => {
            if(info.trim().length === 0) {
                return false
            }
        })
    }
    return true
}

export {lengthLimit, checkEmpty}