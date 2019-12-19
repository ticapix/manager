#!/usr/bin/env node
const execa = require('execa');
const program = require('commander');
const path = require('path');
const remove = require('lodash/remove');
const EventEmitter = require('events');
const { Worker } = require('worker_threads');

EventEmitter.defaultMaxListeners = 100; // Increase the default limit to avoid memory leaks

const myEmitter = new EventEmitter();

let modules;
let i = 0;

async function retrieveDependencies(_modules) {
  const packages = await Promise.all(
    _modules.map((pck) => execa
      .command(
        `lerna list -alp --include-filtered-dependencies --json --scope="${pck.name}"`,
        { shell: true },
      )
      .then(({ stdout }) => {
        const dependents = JSON.parse(stdout).filter(
          (p) => p.name !== pck.name,
        );
        return Object.assign(pck, { dependents });
      })),
  );
  return packages;
}

function unstack() {
  console.log(`-=-=-=- #${i} -=-=-=-`);
  console.log(
    `TODO (${modules.todo.length})`,
    modules.todo.map((m) => m.name).join(', '),
  );
  console.log(
    `DOING (${modules.doing.length})`,
    modules.doing.map((m) => m.name).join(', '),
  );
  console.log(
    `DONE (${modules.done.length})`,
    modules.done.map((m) => m.name).join(', '),
  );
  modules.todo.map((pck) => {
    const deps = pck.dependents.filter(
      (dep) => !modules.done.find((el) => el.name === dep.name),
    );

    if (deps.length === 0) {
      const workerData = remove(modules.todo, (p) => p.name === pck.name)[0];
      modules.doing.push(workerData);

      const promise = program.dryRun
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
          const worker = new Worker(path.join(__dirname, '/worker/build_module.js'), {
            workerData,
          });

          worker.on('online', () => {
            console.log(
              `Launching intensive build task for package ${workerData.name}`,
            );
          });
          worker.on('message', (messageFromWorker) => {
            console.log(messageFromWorker);
          });
          worker.on('error', reject);
          worker.on('exit', (code) => {
            if (code) {
              reject(new Error(`Worker stopped with exit code ${code}`));
            }
            resolve();
          });
        });

      return promise.then(() => {
        remove(modules.doing, workerData);
        modules.done.push(workerData);
        myEmitter.emit('unstack');
      })
        .catch(() => {
          process.exit(1);
        });
    }
    return null;
  });
  i += 1;
}

program
  .option('--dry-run', 'Launch the build script without creating dist')
  .option('-p, --package [package]', 'Scope build to a specific package and its dependencies')
  .action(() => {
    execa
      .command(`lerna list -alp --json ${program.package ? `--scope=${program.package} --include-filtered-dependencies` : ''}`, { shell: true })
      .then(({ stdout }) => retrieveDependencies(JSON.parse(stdout)))
      .then((todo) => {
        modules = {
          todo,
          doing: [],
          done: [],
        };

        myEmitter.on('unstack', () => unstack());
        myEmitter.emit('unstack');
      });
  })
  .parse(process.argv);
