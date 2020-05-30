exports.hasLowerCase = (str) =>  {
    return str.toUpperCase() !== str;
}

exports.hasUpperCase = (str) => {
    return str.toLowerCase() !== str;
}
