const Scorecard = require('./src/scorecard')
const BoardGenerator = require('./src/boardGenerator')
const readLineAsync = require('./src/readLineAsync')
const UserInterface = require('./src/userInterface')

const scorecard = new Scorecard()
const boardGenerator = new BoardGenerator()

const ui = new UserInterface(readLineAsync, scorecard, boardGenerator)
ui.run()