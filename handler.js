const fs = require('fs');
const chalk = require('chalk');

const load = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const save = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const create = (title, body) => {
    const notes = load();
    // filter method will continue to read until the end
    // whereas the find method will stop at the first occurence founded
    // Using find instead of filter here improve the script performances
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate) {
        notes.push({ title, body });
        save(notes);
        console.log(chalk.green('New note added!'));
    } else {
        console.log(chalk.red('Note title already exists, please change.'));
    }
}

const remove = (title) => {
    const notes = load();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if (notes.length > notesToKeep.length) {
        save(notesToKeep);
        console.log(chalk.green('Note Removed!'));
    } else {
        console.log(chalk.red('No Note Found.'));
    }
}

const list = () => {
    const notes = load();
    console.log(chalk.inverse('Your notes'));
    notes.forEach(note => {
        console.log(chalk.magenta.bold(note.title));
        console.log(note.body);
    });
}

const read = (title) => {
    const notes = load();
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.magenta.bold(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red('No Note Found.'));
    }
}

module.exports = { create, remove, list, read }
