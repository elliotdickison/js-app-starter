export function fetchAllWidgets (callback) {
    setTimeout(function () {
        callback([{ name: "one" }, { name: "two" }]);
    }, 500);
}

export function buildWidget (data, callback) {
    setTimeout(function () {
        callback(data);
    }, 500);
}