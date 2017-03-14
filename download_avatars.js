var request = require('request');

var GITHUB_USER = "Bassim23";
var GITHUB_TOKEN = "08b1711fcfaea2bb1cdce05f61f6fbcd1e584cfc";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
}

getRepoContributors();
console.log('Welcome to the GitHub Avatar Downloader!');