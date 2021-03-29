let idCounter = 0
const uniqueId = (prefix = '') => {
    return `${prefix}${++idCounter}`
}

export default uniqueId
