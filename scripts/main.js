let pregunta = [
    {
        letra: '¿',
        visible: false,
        turno: true,
        puesto: ''
    },
    {
        letra: 'Q',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'u',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'i',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'e',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'r',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'e',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 's',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '_',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 's',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'e',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'r',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '_',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'm',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'i',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '_',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'n',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'o',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'v',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'i',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: 'a',
        visible: false,
        turno: false,
        puesto: ''
    },
    {
        letra: '?',
        visible: false,
        turno: false,
        puesto: ''
    },
];

let puesto = 0;
let _fin = false;
let _over = false;
let teclado = pregunta.map(x => x.letra).sort(() => Math.random() - 0.5);
teclado = teclado.map(x => ({ letra: x, usado: false }));

function updateTeclado() {
    $('.teclado').html('');
    for (let i = 0; i < teclado.length; i++) {
        t = teclado[i];
        $('.teclado').append(`<span class="tecla ${t.usado ? 'usado' : ''}" onclick="ponerLetra(${i})">${t.usado ? '' : t.letra}</span>`);
    }
}

function mostrarLetras() {
    $('.panel').html('');
    for (let i = 0; i < pregunta.length; i++) {
        const p = pregunta[i];
        $('.panel').append(`<span onclick="soltar(${i})" class="letra ${p.turno ? 'turno' : ''} ${p.visible ? 'visible' : ''} ${_fin ? 'fin' : ''} ${_over ? 'over' : ''}">${p.puesto}</span>`);
    }
}
function soltar(index) {
    const item = pregunta[index];
    if (item.puesto == '') return;
    let tecla = teclado.find(x => x.letra == item.puesto && x.usado);
    tecla.usado = false;
    item.puesto = '';
    pregunta = pregunta.map(x => ({ ...x, turno: false }));
    moverTurno();
    fin();
    mostrarLetras();
    updateTeclado();
}
function moverTurno() {
    let existe = false;
    for (let i = 0; i < pregunta.length; i++) {
        if (pregunta[i].puesto == '') {
            puesto = i;
            pregunta[i].turno = true;
            existe = true;
            break;
        }
    }
    if (!existe) puesto = pregunta.length;
}
function fin() {
    let val = true;
    for (let i = 0; i < pregunta.length; i++) {
        if (pregunta[i].puesto != pregunta[i].letra) {
            val = false;
            break;
        }
    }
    if (val) {
        _fin = true
    }
    if (puesto == pregunta.length && !val) _over = true;
    else _over = false;
}
function ponerLetra(index) {
    const tecla = teclado[index];
    if (tecla.usado) return;
    tecla.usado = true;
    pregunta[puesto].puesto = tecla.letra;
    pregunta = pregunta.map(x => ({ ...x, turno: false }));
    moverTurno();
    fin();
    mostrarLetras();
    updateTeclado();
}

updateTeclado();
mostrarLetras();
