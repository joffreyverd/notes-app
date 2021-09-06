const yargs = require('yargs');
const noteHandler = require('./handler');

yargs.command({
    command: 'create',
    describe: 'create a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        noteHandler.create(argv.title, argv.body);
    }
});
yargs.command({
    command: 'remove',
    describe: 'remove an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        noteHandler.remove(argv.title);
    }
});
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        noteHandler.list();
    }
})
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        noteHandler.read(argv.title);
    }
});

yargs.parse();
