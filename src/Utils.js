// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function (comparer) {
  for (var i = 0; i < this.length; i++) {
    if (comparer(this[i])) return true;
  }
  return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function (element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var convertToArray = function (group) {
  return Object.keys(group).map((key) => ({
    domain: key,
    list: group[key].map((item) => item.request.url)
  }));
};
const mergeAll = function (listArray) {
  let entries = [];
  listArray.forEach((item, i) => {
    item.forEach((entryItem) => {
      entries.pushIfNotExist(entryItem, function (e) {
        return e.request.url === entryItem.request.url;
      });
    });
    console.log("merge all :" + i);
    console.log(entries.length);
  });
  return entries;
};
module.exports = {
  extractHostname,
  groupBy,
  convertToArray,
  mergeAll
};
