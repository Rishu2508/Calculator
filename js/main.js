var toggle = document.getElementById('toggler'),
    body = document.body,
    light_theme_icon = document.getElementById('light'),
    dark_theme_icon = document.getElementById('dark'),
    percent = document.getElementById('percent'),
    operation = document.querySelectorAll('.key.op:not(.equals)'),
    numbers = document.querySelectorAll('.key:not(.op,.extras)'),
    answer = false, hasDot = false;

const Output1 = document.querySelector('.output-1'),
    Output2 = document.querySelector('.output-2'),
    clear = document.querySelector('.clear'),
    equals = document.querySelector('.equals'),
    backspace = document.querySelector('#backspace');

let my_operations = ["+", "-", "/", "x"];

toggle.onclick = function () {
    body.classList.toggle('dark');
    dark_theme_icon.classList.toggle('active');
    light_theme_icon.classList.toggle('active');
}

numbers.forEach(function (key) {
    key.addEventListener('click', function (e) {
        btn = e.target.innerText;
        if (btn === '.') {
            if (!hasDot && Output1.value.slice(-1) != '.' && !my_operations.includes(Output1.value.slice(-1))) {
                Output1.value += btn;
                Output2.value += btn;
            } else if (my_operations.includes(Output1.value.slice(-1))){
                Output1.value += '0' + btn;
            }
            hasDot = true;
        } else if (Output1.value != '0' || Output2.value != '0') {
            Output1.value += btn;
            Output2.value += btn;
        } else {
            Output1.value = btn;
            Output2.value = btn;
        }


    })
});

backspace.addEventListener('click', function () {
    Output1.value = Output1.value.slice(0, -1);
    Output2.value = Output2.value.slice(0, -1);
})



operation.forEach(function (key) {
    key.addEventListener('click', (e) => {
        if (my_operations.includes(Output1.value.slice(-1))) {
            Output1.value = Output1.value.slice(0, -1) + e.target.innerText;
        } else if (answer) {
            Output1.value = Output2.value + e.target.innerText;
            Output2.value = '';
        } else if (Output1.value.slice(-1) === '.') {
            Output1.value += '0' + e.target.innerText;
        } else {
            Output1.value += '' + e.target.innerText;
            Output2.value = '';
        }
        hasDot = false;
    })
})

clear.addEventListener('click', (e) => {
    hasDot = false;
    answer = false;
    Output1.value = '0';
    Output2.value = '0';
});


equals.addEventListener('click', function () {
    let ans = Number(eval(Output1.value.replace('x', '*'))).toFixed(2);
    Output2.value = ans;
    if (ans.split('.')[1] == 0) {
        Output2.value = Math.round(ans);
    } else if (ans.toString().endsWith('0')) {
        Output2.value = ans.slice(0, -1);
    } 
    answer = true;
});

percent.addEventListener('click', () => {
    if (!(Output1.value.includes('x') || Output1.value.includes('/') || Output1.value.includes('-') || Output1.value.includes('+'))) {
        Output1.value = Output1.value / 100;
        Output2.value = Output2.value / 100;
    } else if (answer) {
        Output1.value = Output2.value / 100;
        Output2.value = Output2.value / 100;
    } else {
        Output1.value = (Output2.value) ? Output1.value.slice(0, -1) + Output2.value / 100 : Output1.value;
    }
})
