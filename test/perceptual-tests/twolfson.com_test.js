// Load in dependencies
var exec = require('child_process').exec,
    async = require('async'),
    slug = require('slug');

// Set up common variables
var expectedScreenshots = __dirname + '/expected_screenshots',
    actualScreenshots = __dirname + '/actual_screenshots',
    screenshotDiffs = __dirname + '/screenshot_diffs';

// Set up unabstracted variables
// TODO: Move browsers, urls into standalone files
// TODO: See notes in https://gist.github.com/twolfson/6077989
var browsers = ['phantomjs'],
    baseUrl = 'http://localhost:8080',
    urls = [
      '/',
      // '/2012-11-17-subtle-anti-patterns',
      // '/projects',
      // '/contact',
      // '/contact?test=success',
      // '/contact?test=fail',
      // '/404'
    ];

// For each of the URLs
async.forEach(urls, function (_url, cb) {
  // TODO: mocha-ify this
  // TODO: Screenshot the webpage
  var url = baseUrl + _url,
      escapedUrl = slug(url.replace(/\//g, '_')),
      filepath = '/' + escapedUrl + '.png',
      expectedImg = expectedScreenshots + filepath,
      actualImg = actualScreenshots + filepath;
  exec('phantomjs screenshot.js ' + url + ' ' + actualImg, {cwd: __dirname}, function (err, stdout, stderr) {
    // If stderr or stdout exist, log them
    if (stderr) { console.log('STDERR: ', stderr); }
    if (stdout) { console.log('STDOUT: ', stdout); }

    // If there is an error, callback with it
    if (err) { return cb(err); }

    // TODO: Emit an event instead
    // Notify the user that we have screenshotted successfully
    console.log('Successfully screenshotted ' + url);

    // Diff the images
  });

  // TODO: If the expected image doesn't exist, use the image as the diff itself
  // TODO: Get a diff of the image (write it to screenshot_diffs either in memory or from the script)
  // TODO: Assert the diff is empty
}, function (err) {
  if (err) {
    console.error('ERROR: ', err);
  } else {
    console.log('All done!');
  }
});