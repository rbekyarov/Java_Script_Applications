import { f } from './export.js';
import { s } from './export.js';

let calc = document.getElementById('btn')
calc.addEventListener('click', (e) => {
    e.preventDefault;
    let a = document.getElementById('a').value
    let b = document.getElementById('b').value
    let result = document.getElementById('result')


    let po = f(a, b);
    let plus = s(a, b);


    result.textContent =
        `multiplication ${po},
addition ${plus}`
})