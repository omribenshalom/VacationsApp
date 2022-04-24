let errorHandler = (e, request, response, next) => {
    if (e.errorType != undefined) {

        if (e.errorType.isShowStackTrace) {
            console.error(e);
        }
        response.status(e.errorType.httpCode).json({ error: e.errorType.message });
        return;
    };
    console.error(e);
    response.status(700).json({ error: "General error" });
};

module.exports = errorHandler;