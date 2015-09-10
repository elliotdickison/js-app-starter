export function fetchAllWidgets (callback) {
    setTimeout( () => {
        callback([{ name: "one" }, { name: "two" }]);
    }, 500);
}

export function buildWidget (data, callback) {
    setTimeout( () => {
        callback(data);
    }, 500);
}