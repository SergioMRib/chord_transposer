/*
 * Create a list that holds all of your cards;
 * This will be used to shuffle the deck.
 * The produced list will have an index for each card.
 * The shuffle function will assign new index values
 */

const restartButton = document.getElementById('restart'),
      theDeck = document.getElementById('the-deck'),
      winnerAlert = document.getElementsByClassName('winner-alert')[0];

let allCards = document.getElementsByClassName('card'),
    clickedCards = [],
    moveCount = 0,
    matchedCards = 0,
    startTime;


let model = {
    chords: {
        1:"A",
        2:"A#",
        3:"B",
        4:"C",
        5:"C#",
        6:"D",
        7:"D#",
        8:"E",
        9:"F",
        10:"F#",
        11:"G",
        12:"G#"
    },
    chordsModifiers: {
        minor:"m",
        7:"7",
        9:"9",
        sus:"sus"
    },
    selectedChords: {}
};


let controller = {
    init: function() {
        console.log("controller called");
        chordListView.init();
    },
    getChords: function() {
        return model.chords;
    }
};

let chordListView = {
    init: function() {
        this.chordListElem = document.getElementById('chord_list');
        this.render();
    },

    render: function() {
        console.log("chord render called");
        let chord, elem, i;

        //get chords from the model
        let chords = controller.getChords();

        //for loop to add all the chords to the dom
        for (i in chords) {
            //creates a list element
            elem = document.createElement('li');

            //get the current chord from the chord list
            chord = chords[i];

            //add event listeners
            elem.addEventListener('click', (function(chordCopy) {
                return function() {

                    console.log("added events");
                    console.log(chordCopy);
                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render(); */
                };
            })(chord));

            //set the elem's text to the chord
            elem.textContent = chord;

            //add the element
            this.chordListElem.appendChild(elem);
        };
    }
};

let selectedChordsView = {};


/*
    Initializatio
*/
//controller.init();