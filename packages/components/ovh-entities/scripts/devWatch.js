const chokidar = require('chokidar');
const { spawnSync } = require('child_process');

// One-liner for current directory
chokidar
  .watch(
    './src',
    {
      persistent: true,
    },
  )
  .on('all', () => {
    spawnSync('nearleyc', ['./src/grammar.ne', '-o', './dist/grammar.js']);

    console.log('pipi');
  });
