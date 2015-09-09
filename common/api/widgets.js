export function fetchAllWidgets (callback) {
    setTimeout(function () {
        callback([{ name: "one" }, { name: "two" }]);
    }, 500);
}