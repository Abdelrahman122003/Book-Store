exports.isNullOrEmpty = (obj) => {
    return obj == null || Object.keys(obj).length === 0;
}
// == check value
// === check type