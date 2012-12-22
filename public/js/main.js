// When the DOM is ready
$(function () {
  // Grab all <pre>'s on the page and iterate them
  var $preArr = $('pre');
  $preArr.each(function () {
    // Highlight the code block
    var pre = this;
    if (pre.parentNode) {
      hljs.highlightBlock(pre);
    }
  });

  // Get all truncate items
  var $truncateArr = $('.text-truncate');
  $truncateArr.each(function () {
    // Truncate each item
    var $this = $(this);

// Mothereffing hacks ;_;
if($this.text().indexOf('Warning: This article is more opinionated than other ones.') !== -1) { return; }

    $this.trunkata({'lines': 1});
  });
});