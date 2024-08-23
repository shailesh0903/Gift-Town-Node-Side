module.exports = {
    handleInternalError: handleInternalError,
    success: respondSuccess,
    bad: respondBadRequest,
    noAuth: respondUnauthorized,
    forbidden: respondForbidden,
    noPayment: respondPaymentRequired,
    internal: respondInternalError
};

function handleInternalError(res, err, next) {
    err.status = 500;
    next(err);
}

function respondSuccess() { return respondError.apply(this, [200].concat(Array.from(arguments))); }
function respondBadRequest() { return respondError.apply(this, [400].concat(Array.from(arguments))); }
function respondUnauthorized() { return respondError.apply(this, [401].concat(Array.from(arguments))); }
function respondPaymentRequired() { return respondError.apply(this, [402].concat(Array.from(arguments))); }
function respondForbidden() { return respondError.apply(this, [403].concat(Array.from(arguments))); }
function respondInternalError() { return respondError.apply(this, [500].concat(Array.from(arguments))); }

function respondError(code, res) {
    var args = Array.from(arguments).slice(2);
    var data = {
        success: false
    };
    if(code == 200) {
        data.success = true;
    }
    if(args.length > 0) {
        data = Object.assign({}, data, args[0]);
    }
    return res.status(code).json(data);
}