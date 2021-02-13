# For new modules add --entry=src/module.ts
echo "build multiple modules"
tsdx build \
  --entry=src/index.ts \
  --entry=src/promise.ts \
  && node ./scripts/flowgen.js \
  && node ./scripts/indexify.js \