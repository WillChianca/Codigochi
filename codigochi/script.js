const micBut = document.getElementById('microphone');
const panelsData = document.getElementById('panels-data');
const transcript = document.getElementById('transcript');
const screen = document.getElementById('screen');

const SpeechReg = window.SpeechRecognition || window.webkitSpeechRecognition

const recog = new SpeechReg();

const commands = ['eat', 'sleep', 'dance'];

function onStartlist() {
    recog.start()


    panelsData.classList.add('talking');
}

function OnResult(event) {
    panelsData.classList.remove('talking');

    const text = event.results[0][0].transcript;

    transcript.innerText = `You said: ${text}`;

    // Look the commands that I'm allowed to say
    const action = commands.find(function (command) {
        // does COMMAND match text
        return text.toLowerCase().includes(command)
    })

    // Just look what the recognition heard and see if is a command
    if (action) {
        // if it does do css
        screen.classList.add(`codigotchi-screen_${action}`);
    } else {
        // else tell me
        transcript.textContent += ' - Invalid Command!';
    }

    setTimeout( function () {
        screen.classList.remove(`codigotchi-screen_${action}`);
        transcript.innerText = '';
    }, 3000)
}

micBut.addEventListener('click', onStartlist);
recog.addEventListener('result', OnResult);