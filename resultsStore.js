// resultsStore.js
let results = [];

function addResults(newResults) {
  newResults.forEach(result => {
    const exists = results.find(r => r.issueNumber === result.issueNumber);
    if (!exists) {
      results.unshift(result); // Add to the beginning
    }
  });

  // Keep only the latest 1440 entries
  if (results.length > 1440) {
    results = results.slice(0, 1440);
  }
}

function getResults() {
  return results;
}

module.exports = {
  addResults,
  getResults
};