const s = document.querySelector('.s'),
      m = document.querySelector('.m'),
      h = document.querySelector('.h'),
      hourNumber = document.querySelector('.hours'),
      minNumber = document.querySelector('.minutes');
      
function clock() {
    let time = new Date(),
        second = time.getSeconds() * 6,
        minute = time.getMinutes() * 6,
        hours = time.getHours() * 30;
    s.style = `transform:rotate(${second}deg); transition:1s linear`
    m.style = `transform:rotate(${minute}deg); transition:1s linear`
    h.style = `transform:rotate(${hours}deg); transition:1s linear`
    hourNumber.innerHTML = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    minNumber.innerHTML = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    setTimeout(() => {
        clock()
    }, 1000);
}clock()

const links = document.querySelectorAll('.tabsItem'),
      tabsContent = document.querySelectorAll('.tabsContentItem');
      
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault()
        for (let ix = 0; ix < links.length; ix++) {
            links[ix].classList.remove('active')
            tabsContent[ix].classList.remove('active')
        }
        tabBody(this,tabsContent[i])
    })
    
}
function tabBody(el, item) {
    el.classList.add('active')
    item.classList.add('active')
}

// sekundomer

let stopwatchHour = document.querySelector('.stopwatch__hours'),
      stopwatchMin = document.querySelector('.stopwatch__minutes'),
      stopwatchSec = document.querySelector('.stopwatch__seconds'),
      stopwatchBtn = document.querySelector('.stopwatch__btn'),
      stopwatchSpan = document.querySelector('.tabsLink__span'),
      stopWatchAudio = document.querySelector('.second');
      
stopwatchBtn.addEventListener('click', function() {
    if (this.innerHTML.toUpperCase() === "START") {
        this.innerHTML = "STOP"
        stopwatchSpan.classList.add('active')
        interval = setInterval(() => {
            stopWatch()
            stopWatchAudio.play()
        }, 1000);
    }else if(this.innerHTML.toUpperCase() === "STOP"){
        stopwatchBtn.innerHTML = "CLEAR"
        stopwatchSpan.classList.remove('active')
        stopwatchSpan.classList.add("active_clear")
        clearInterval(interval)
    }else if(this.innerHTML.toUpperCase() === "CLEAR"){
        // clearInterval(interval)
        this.innerHTML = "Start"
        stopwatchHour.innerHTML = 0
        stopwatchMin.innerHTML = 0
        stopwatchSec.innerHTML = 0
        sanoq = 0
        stopwatchSpan.classList.remove("active_clear")
    }
})
let sanoq = 0
function stopWatch(){
    sanoq++
    if (sanoq < 60) {
        stopwatchSec.innerHTML = sanoq
    }
    if (sanoq > 59) {
        stopwatchMin.innerHTML++
        sanoq = 0
        stopwatchSec.innerHTML = sanoq
    }
    if (stopwatchMin.innerHTML > 59) {
        stopwatchHour.innerHTML++
        stopwatchMin.innerHTML = 0
    }
}

// calculator

const screen = document.querySelector('.calc__screen-out'),
      calcBtns = Array.from(document.querySelectorAll('.calc__btn'));
calcBtns.map((btn)=>{
    btn.addEventListener('click', function (e) {
        let answer = e.target.innerHTML
        size()
        if (answer == 'ac') clear()
        else if (answer == 'ce') del()
        else if (answer == '=') equal()
        else if (answer == '+/-') props()
        else if (answer == '√') squareRoot()
        else length(answer)
    })
})
function size() {
    if (screen.innerHTML.length >= 20) screen.style.fontSize = '20px'
    else if (screen.innerHTML.length >= 12) screen.style.fontSize = '30px'
    else if (screen.innerHTML.length < 12) screen.style.fontSize = '40px'
}
function clear() {
    screen.innerHTML = ''
}
function del() {
    screen.innerHTML = screen.innerHTML.slice(0,-1)
}
function equal() {
    screen.innerHTML = eval(screen.innerHTML)
}
function props() {
    screen.innerHTML = parseFloat(screen.innerHTML) * -1
}
function squareRoot() {
    screen.innerHTML = Math.sqrt(screen.innerHTML)
    size()
}
function length(answer) {
    screen.innerHTML.length >= 32 ? screen.innerHTML = screen.innerHTML : screen.innerHTML += answer
}

// timer

const timerHour = document.querySelector('.timer__hours'),
      timerMin = document.querySelector('.timer__minutes'),
      timerSec = document.querySelector('.timer__seconds'),
      timerSet = document.querySelector('.timer__set'),
      timerClear = document.querySelector('.timer__clear'),
      timerBtns = Array.from(document.querySelectorAll('.timer__btn, .timer__set, .timer__clear')),
      timerAudio = document.querySelector('.gudok');

timerBtns.map((btn)=>{
    btn.addEventListener('click', function (e) {
        let press = e.target.innerHTML
        Pres(press)
    })
})
function Pres(press) {
    if (press == "PLAY") {
        timerSet.innerHTML = "PAUSE"
        interval = setInterval(() => {
            timer()
        }, 1000);
    }else if (press == "PAUSE") {
        timerSet.innerHTML = "PLAY"
        clearInterval(interval)
    }else if (press == "CLEAR") {
        clearInterval(interval)
        timerSet.innerHTML = "PLAY"
        timerHour.innerHTML = ''
        timerMin.innerHTML = ''
        timerSec.innerHTML = ''
        timerAudio.pause()
    }else{
        if (timerSec.innerHTML.length < 2) {
            let info = timerSec.innerHTML += press
            Hisob(info)
        }else if (timerSec.innerHTML.length >= 2 && timerMin.innerHTML.length < 2) {
            timerMin.innerHTML += press
        }else if (timerMin.innerHTML.length >= 2 && timerHour.innerHTML.length < 2) {
            timerHour.innerHTML += press
        }
    }
}

let hisob = ''
function Hisob(info) {
    hisob = info
}
function timer() {
    if (hisob > 0) {
        hisob--
        timerSec.innerHTML = hisob
    }else if (hisob == 0) {
        if (timerMin.innerHTML > 0) {
            timerMin.innerHTML--
            hisob = 59
            timerSec.innerHTML = hisob
        }else{
            if (timerHour.innerHTML > 0) {
                timerHour.innerHTML--
                timerMin.innerHTML = 59
            }else{ 
                if (timerMin.innerHTML > 0) {
                    timerMin.innerHTML--
                    hisob = 59
                    timerSec.innerHTML = hisob
                }else{
                    hisob = ''
                    timerSet.innerHTML = "PLAY"
                    timerHour.innerHTML = ''
                    timerMin.innerHTML = ''
                    timerSec.innerHTML = ''
                    clearInterval(interval)
                    timerAudio.play()
                }
            }
        }
    }
}
