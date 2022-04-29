$(function () {
    $("#keyboard-upper-container").hide();
});

// Random sentence generator
const nouns = ["bird", "clock", "boy", "drink", "duck", "cat", "hag", "baby", "tea", "dog"];
const verbs = ["kicked", "ran", "flew", "dodged", "sliced", "rolled", "died", "breathed", "slept", "killed"];
const adjectives = ["nice", "lazy", "pro", "lovely", "dumb", "rough", "soft", "hot", "jumping", "slimy"];
const adverbs = ["slowly", "elegantly", "precisely", "quickly", "sadly", "humbly", "proudly", "stupidly", "calmly", "blindly"];
const preposition = ["down", "into", "up", "on", "upon", "below", "above", "through", "across", "towards"];

function randGen() {
    return Math.floor(Math.random() * 5);
}

function randomSentence() {
    var rand1 = Math.floor(Math.random() * 10);
    var rand2 = Math.floor(Math.random() * 10);
    var rand3 = Math.floor(Math.random() * 10);
    var rand4 = Math.floor(Math.random() * 10);
    //                var randCol = [rand1,rand2,rand3,rand4,rand5];
    //                var i = randGen();
    var content = "The " + adjectives[rand1] + " " + 
    nouns[rand2] + " " + adverbs[rand3] + " " + verbs[rand4] + 
    " the " + nouns[rand1] + " " + adverbs[rand1] + ".";

    return content;
};

// Begin the actual project
let sentenceIdx = 0;
let letterIdx = 0;
let sentence = [randomSentence(), randomSentence(), randomSentence(), randomSentence()];

$("#sentence").text(sentence[sentenceIdx]);
$("#target-letter").text(sentence[sentenceIdx][letterIdx]);

let s = 0;
let m = 0;

let displaySeconds = 0;
let displayMinutes = 0;

function timer() {
    s++;
    if(s / 60 === 1) {
        s = 0;
        m++;
    }
    if(s < 10) {
        displaySeconds = "0" + s.toString();
    } else {
        displaySeconds = s;
    }
    if(m < 10) {
        displayMinutes = "0" + m.toString();
    } else {
        displayMinutes = m;
    }
    $('#timer').text(displayMinutes + ":" + displaySeconds);
}
    timer = window.setInterval(timer, 1000);


    let mistakes = 0;


    function message() {
        Swal.fire({
            title: 'One more time?',
            text: "Come on, you can do better than that!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "From the top!"
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(true);
            }
          })
    } 

// Key press event, aka just about everything that happens in this lab.
$(document.body).keypress(function (evt) {
    // A surprise tool that will help us later
    

    // Defining the icons for right/wrong
    let ok = $(`<span class="glyphicon glyphicon-ok"></span>`);
    let oof = $(`<span class="glyphicon glyphicon-remove"></span>`);
    
    
    // Using the icons for right/wrong based on inputs
    if (sentence[sentenceIdx].charCodeAt(letterIdx) === evt.charCode) {
        $("#feedback").append(ok);
    }
    if (sentence[sentenceIdx].charCodeAt(letterIdx) != evt.charCode) {
        $("#feedback").append(oof);
        mistakes++;
    }
    
    // increment the letter index to cycle through the letters
    letterIdx++;

    // Move the yellow block to the correct character
    $("#yellow-block").css({ "margin-left": "+=20px" });
    $("#target-letter").text(sentence[sentenceIdx][letterIdx]);



    if (letterIdx === sentence[sentenceIdx].length) {
       
        sentenceIdx++;
        
        letterIdx = 0;
        if (sentenceIdx === 4) {
            window.clearInterval(timer);
            numberOfWords = 64;
            numberOfMistakes = mistakes;
            minutes = m + s/60;
            wordCount = numberOfWords / minutes - 2 * numberOfMistakes;
            $('#sentence').text("Ran out of sentences! And you had " + wordCount + " words per minute!");
            setTimeout(message, 5000);
        } else if (sentenceIdx < 4) {
            $("#sentence").text(sentence[sentenceIdx]);
            $("#yellow-block").css({ "margin-left": "-16px" });
            $("#target-letter").text(sentence[sentenceIdx][letterIdx]);
        }
    }
   
});

$(document.body).keyup(function (evt) {
    // toggling keyboard
    if (evt.key === "Shift") {
        // console.log('Caps disengaged');
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
    }
});

$(document.body).keydown(function (evt) {
    // toggling keyboard
    if (evt.key === "Shift") {
        //    console.log('Caps engaged')
        $("#keyboard-upper-container").show();
        $("#keyboard-lower-container").hide();
    }
});