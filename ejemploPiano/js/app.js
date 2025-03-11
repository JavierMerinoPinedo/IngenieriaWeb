const notes = {
    'do': new Howl({ src: ['assets/audios/do.mp3'] }),
    're': new Howl({ src: ['assets/audios/re.mp3'] }),
    'mi': new Howl({ src: ['assets/audios/mi.mp3'] }),
    'fa': new Howl({ src: ['assets/audios/fa.mp3'] }),
    'sol': new Howl({ src: ['assets/audios/sol.mp3'] }),
    'la': new Howl({ src: ['assets/audios/la.mp3'] }),
    'si': new Howl({ src: ['assets/audios/si.mp3'] }),
    'do-re': new Howl({ src: ['assets/audios/do-re.mp3'] }),
    're-mi': new Howl({ src: ['assets/audios/re-mi.mp3'] }),
    'fa-sol': new Howl({ src: ['assets/audios/fa-sol.mp3'] }),
    'sol-la': new Howl({ src: ['assets/audios/sol-la.mp3'] }),
    'la-si': new Howl({ src: ['assets/audios/la-si.mp3'] }),

    'do-2': new Howl({ src: ['assets/audios/do-2.mp3'] }),
    're-2': new Howl({ src: ['assets/audios/re-2.mp3'] }),
    'mi-2': new Howl({ src: ['assets/audios/mi-2.mp3'] }),
    'fa-2': new Howl({ src: ['assets/audios/fa-2.mp3'] }),
    'sol-2': new Howl({ src: ['assets/audios/sol-2.mp3'] }),
    'la-2': new Howl({ src: ['assets/audios/la-2.mp3'] }),
    'si-2': new Howl({ src: ['assets/audios/si-2.mp3'] }),
    'do-re-2': new Howl({ src: ['assets/audios/do-re-2.mp3'] }),
    're-mi-2': new Howl({ src: ['assets/audios/re-mi-2.mp3'] }),
    'fa-sol-2': new Howl({ src: ['assets/audios/fa-sol-2.mp3'] }),
    'sol-la-2': new Howl({ src: ['assets/audios/sol-la-2.mp3'] }),
    'la-si-2': new Howl({ src: ['assets/audios/la-si-2.mp3'] }),

    'do-3': new Howl({ src: ['assets/audios/do-3.mp3'] }),
    're-3': new Howl({ src: ['assets/audios/re-3.mp3'] }),
    'mi-3': new Howl({ src: ['assets/audios/mi-3.mp3'] }),
    'fa-3': new Howl({ src: ['assets/audios/fa-3.mp3'] }),
    'sol-3': new Howl({ src: ['assets/audios/sol-3.mp3'] }),
    'la-3': new Howl({ src: ['assets/audios/la-3.mp3'] }),
    'si-3': new Howl({ src: ['assets/audios/si-3.mp3'] }),
    'do-re-3': new Howl({ src: ['assets/audios/do-re-3.mp3'] }),
    're-mi-3': new Howl({ src: ['assets/audios/re-mi-3.mp3'] }),
    'fa-sol-3': new Howl({ src: ['assets/audios/fa-sol-3.mp3'] }),
    'sol-la-3': new Howl({ src: ['assets/audios/sol-la-3.mp3'] }),
    'la-si-3': new Howl({ src: ['assets/audios/la-si-3.mp3'] }),
}

const keys = document.querySelectorAll('.key');

cancion = ['do-2', 'do-2', 're-2', 'do-2', 'fa-2', 'mi-2', 'do-2', 'do-2', 're-2', 'do-2', 'sol-2', 'fa-2', 'do-2', 'do-2', 'do-3', 'la-2', 'fa-2', 'mi-2', 're-2', 'la-si-2', 'la-si-2', 'la-2', 'fa-2', 'sol-2', 'fa-2'];

function findExtremeNotes(cancion) {
    const noteOrder = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
    let lowestNote = cancion[0];
    let highestNote = cancion[0];

    cancion.forEach(note => {
        const [noteName, octave] = note.split('-');
        const [lowestNoteName, lowestOctave] = lowestNote.split('-');
        const [highestNoteName, highestOctave] = highestNote.split('-');

        if (parseInt(octave) < parseInt(lowestOctave) || 
            (parseInt(octave) === parseInt(lowestOctave) && noteOrder.indexOf(noteName) < noteOrder.indexOf(lowestNoteName))) {
            lowestNote = note;
        }

        if (parseInt(octave) > parseInt(highestOctave) || 
            (parseInt(octave) === parseInt(highestOctave) && noteOrder.indexOf(noteName) > noteOrder.indexOf(highestNoteName))) {
            highestNote = note;
        }
    });

    return { lowestNote, highestNote };
}

const { lowestNote, highestNote } = findExtremeNotes(cancion);
console.log('Nota más grave:', lowestNote);
console.log('Nota más aguda:', highestNote);

cont = 0;
cancion = ['do-2', 'do-2', 're-2', 'do-2'];

keys.forEach(key => {
    key.addEventListener('click', () => {
        const note = key.getAttribute('data-note');
        playSound(note);
        if(cancion[cont] == key.getAttribute('data-note')){
            if(cont == cancion.length-1){
                bloquearNotas();
                setTimeout(() => {
                    titulos = document.getElementById('Titulos');
                    h1 = document.createElement('h1');
                    h1.id = 'completion-message';
                    h1.textContent = '¡Felicidades! Has completado la canción.';
                    titulos.append(h1);
                    tocarCancion(cont);
                }, 1000);
            }
            key.style.backgroundColor = '#03FC46';
            setTimeout(() => {
                key.style.backgroundColor = '';
            }, 500);
            cont++;
        } else{
            bloquearNotas();
            key.style.backgroundColor = '#FC0202';
            setTimeout(() => {
                key.style.backgroundColor = '';
            }, 500);
            setTimeout(() => {
                tocarCancion(cont);
            }, 2000);
        }
    });
});

function playSound(note){
    let sound = notes[note];
    sound.play();
}

function bloquearNotas(){
    keys.forEach(key => {
        key.style.pointerEvents = 'none';
    });
}

function desbloquearNotas(){
    keys.forEach(key => {
        key.style.pointerEvents = 'auto';
    });
}

function tocarCancion(cont) {
    console.log('Tocando la cancion hasta la nota ' + cont);
    let delay = 0;
    if(cont == cancion.length){
        for (let i = 0; i <= cont; i++) {
            setTimeout(() => {
                playSound(cancion[i]);
                const key = document.querySelector(`.key[data-note="${cancion[i]}"]`);
                key.style.backgroundColor = '#03F6FE';
                setTimeout(() => {
                    key.style.backgroundColor = '';
                }, 200);
            }, delay);
            delay += 500;
        } 
    } else{
        for (let i = 0; i <= cont; i++) {
            if(i == cont){
                setTimeout(() => {
                    playSound(cancion[i]);
                    const key = document.querySelector(`.key[data-note="${cancion[i]}"]`);
                    key.style.backgroundColor = '#E8FD03';
                    setTimeout(() => {
                        key.style.backgroundColor = '';
                    }, 500);
                }, delay);
                delay += 750;
            }
            else {
                setTimeout(() => {
                    playSound(cancion[i]);
                    const key = document.querySelector(`.key[data-note="${cancion[i]}"]`);
                    key.style.backgroundColor = '#A29500';
                    setTimeout(() => {
                        key.style.backgroundColor = '';
                    }, 500);
                }, delay);
                delay += 500;
            }
        }
        cont = 0;
    }
    setTimeout(() => {
        desbloquearNotas();
        console.log("Desbloqueando notas");
    }, delay);
}