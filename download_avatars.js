var request = require('request');
var fs = require('fs');
var GITHUB_USER = "Bassim23";
var GITHUB_TOKEN = "08b1711fcfaea2bb1cdce05f61f6fbcd1e584cfc";
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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

function avatarList(err, result) {
  result.forEach(function(item){
    downloadImageByURL(item.avatar_url, "./avatars/"+item.login+".jpg");
  })
}

function downloadImageByURL(url, filePath) {
   request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
        if (response.statusCode === 200) {
         console.log('Response Status Message: ', response.statusCode, response.headers['content-type'], '\n' + "Download completed.")
        } else {
          console.log("Download failed", response.statusCode);
        }
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, avatarList);
