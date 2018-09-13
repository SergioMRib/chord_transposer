/*
 * The point is to select a list of chords and then convvert them to
 * a form of your linking
 * The conversion is going to take place using two buttons: one to increase
 * and another to decrease; each change by half a tone (I'll call it a step)
*/

const restartButton = document.getElementById('restart');

//this variable is for testing the conversion
let step = 1;


let model = {
    chords: [
        {
            pos:1,
            name:"A"
        },
        {
            pos:2,
            name: "A#"
        },
        {
            pos:3,
            name:"B"
        },
        {
            pos:4,
            name:"C"
        },
        {
            pos:5,
            name:"C#"
        },
        {
            pos:6,
            name:"D"
        },
        {
            pos:7,
            name:"D#"
        },
        {
            pos:8,
            name:"E"
        },
        {
            pos:9,
            name:"F"
        },
        {
            pos:10,
            name:"F#"
        },
        {
            pos:11,
            name:"G"
        },
        {
            pos:12,
            name:"G#"
        }
    ],
    chordModifiers: {
        minor:"m",
        7:"7",
        9:"9",
        sus:"sus"
    },
    selectedChords: []
};


let controller = {
    init: function() {
        console.log("controller called");
        chordListView.init();
        selectedChordsView.init();
    },
    getChords: function() {
        return model.chords;
    },
    getSelectedChords: function() {
        return model.selectedChords;
    },
    getModifiers: function(){
        return model.chordModifiers;
    },
    selectChord: function(clickedChord) {
        model.selectedChords.push(clickedChord);
        selectedChordsView.render();
    },
    deleteChord: function(clickedChord) {
        let i = model.selectedChords.indexOf(clickedChord);
        delete model.selectedChords[i];
        console.log('you just unselected that chord');
    },
    /*
    @param chordList is an array of chord objects
    */
    convert: function(chordsList) {

        //make sure the list is not empty
        if (chordsList.length <= 1) {
            alert('You have no chords selected; click them to select');
            return;
        };
        //needed variables for processing: a new list and related position of the chord
        let convertedChords = [],
            position;

        /*
        * loop to increase the position one step,
        * compare the new position to model.chords list and get the corresponding,
        * push to the converted chords list
        */
        chordsList.forEach(element => {
            //change the position reference of each chord

            position = element.pos + step;
            console.log(`The position of the select is: ${element.pos}`)

            //get the apropriate chord (returns the chord object) using the position and assign to a variable
            newElement = model.chords.find(chord => {
                return chord.pos === position;
            });

            //push the new chord to the list of converted chords
            convertedChords.push(newElement);
        });

        //assign the new list to the selectedChords list
        model.selectedChords = convertedChords;

        //render the new list
        selectedChordsView.render();
    }
};

let chordListView = {
    init: function() {
        this.chordListElem = document.getElementById('chord_list');
        this.chordModifiersElem = document.getElementById('modifiers_list');

        this.render();
    },

    render: function() {
        console.log("chord and modifiers render called");

        /*
            Rendering the list of chords
        */

        let chord, elem, i;

        //get chords from the model
        let chords = controller.getChords();

        //for loop to add all the chords to the dom
        for (i in chords) {
            //creates a list element
            elem = document.createElement('li');

            //get the current chord (the object) from the chords list
            chord = chords[i];


            //add event listeners; attention to closure on these events
            elem.addEventListener('click', (function(chordCopy) {
                return function() {
                    console.log("The chord clicked was: " + chordCopy.name);
                    //ask the controller to add it to the selected chords list
                    controller.selectChord(chordCopy);

                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    */
                };
            })(chord));

            //set the elem's text to the chord
            elem.textContent = chord.name;

            //add the element
            this.chordListElem.appendChild(elem);
        };

        /*
            Rendering the list of chord modifiers
            NOTE: not very DRY!
        */
        let modifier;

        //get the modifiers
        let modifiers = controller.getModifiers();

        for (i in modifiers) {
            //creates a list element
            elem = document.createElement('li');

            //get the current chord from the chord list
            modifier = modifiers[i];

            //add event listeners; attention to closure on these events
            elem.addEventListener('click', (function(modCopy) {
                return function() {
                    console.log("The chord clicked was: " + modCopy);

                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    */
                };
            })(modifier));

            //set the elem's text to the modifier
            elem.textContent = modifier;

            //add the element
            this.chordModifiersElem.appendChild(elem);
        };
    }
};

let selectedChordsView = {

    init: function() {
        this.selectedChordsElem = document.getElementById('chords_selection');
    },
    render: function() {
        //this will render each time a chord is selected
        this.selectedChordsElem.innerHTML = '';
        console.log("selected is about to rendered");

        let chord, elem, i;

        //get chords from the model
        let chords = controller.getSelectedChords();

        //for loop to add all the selecetd chords to the dom
        for (i in chords) {
            elem = document.createElement('li');

            chord = chords[i];

            //add the event listener
            elem.addEventListener('click', (function(selectCopy) {
                return function() {
                    console.log("The chord clicked was: " + selectCopy.name);
                    controller.deleteChord(selectCopy);
                    selectedChordsView.render();
                    /*
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    */
                };
            })(chord));

            elem.textContent = chord.name;

            //add the element
            this.selectedChordsElem.appendChild(elem);
        }
    }
};

/*
    Initialization
*/
controller.init();