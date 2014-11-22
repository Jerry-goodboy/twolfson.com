# Why?
## Over phantomjs
- Get access to `node_modules/` without needing to bend over backwards (e.g. limit selection, pre-process scripts)
- More accurate rendering (e.g. web fonts load)

## Over atom-shell
- Buffering was broken in latest version (link to issue)
- In latest working version (`0.17.2`?), it didn't have a way to talk directly to a page with a disabled `node` context
    - We disabled the `node` context for accuracy purposes

## Downsides
- Slow startup time
- Need to defined `index.html` and `package.json`
    - This can be worked around with a script wrapper (e.g. build a node module for it)

# Gotchas
- Need to limit scripts to not be very concurrent
    - Would occasionally yield white screens otherwise
- 0.10.5 had a strange bug that would occasionally render an underline on a link when all others don't have one