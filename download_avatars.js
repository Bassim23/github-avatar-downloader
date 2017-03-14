var request = require('request');

var GITHUB_USER = "Bassim23";
var GITHUB_TOKEN = "08b1711fcfaea2bb1cdce05f61f6fbcd1e584cfc";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': "GitHub Avatar Downloader - Student Project"
    }
  };
  request(options, (err, response, body) => {
    if (err) {
      console.log("WTF", err);
      return cb(false);
    }
    if (response && response.statusCode !== 200) {
      console.log("Response was not 200!", response.statusCode);
      return false;
    }
    let data = JSON.parse(body);
    cb(null, data);
  });
}
  getRepoContributors("jquery", "jquery", function(err, result) {

  const avatarUrls = result.map(item => item.avatar_url)
  console.log(avatarUrls);
});

console.log('Welcome to the GitHub Avatar Downloader!');