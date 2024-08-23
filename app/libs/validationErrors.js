module.exports = {
    toArray: toArray
};

function toArray(errors) {
    var err = [];
    for(param in errors) {
        err.push(errors[param]);
    }
    return err;
}