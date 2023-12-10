/*

 Author: Muhammad iar Hossain
 Project Name: Timetable of Salah
 Technology used: HTML5, CSS3 and Vanilla JS
 Features: 
  => Show current date and time of user
  => User can save any prayer time.

*/

alert('Double click any Salah time for configure.')
window.onload = () => {
  // clock related selector
  const hr = select('.hr')
  const min = select('.min')
  const sec = select('.sec')
  const ampm = select('.ampm')
  const day = select('.day')
  const month = select('.month')
  const year = select('.year')
  // calender related selector
  let daysArray = document.querySelectorAll('.week span')
  const setTime = document.querySelectorAll('.setTime')
  const getTimeFromLocalStorage = JSON.parse(localStorage.getItem('saveTime'))
  let timeArray = [
    '05 : 00',
    '13 : 30',
    '17 : 00',
    '18 : 40',
    '20 : 15',
    '12 : 30',
    '05 : 33',
    '18 : 24'
  ]
  // clock
  function clock() {
    let time = new Date(),
      h = time.getHours(),
      m = time.getMinutes(),
      s = time.getSeconds(),
      ampm = 'AM';

    if (h > 12) {
      h = h - 12;
      ampm = 'PM'
    } else if (h == 0) {
      h = 12
    }

    h = (h < 10) ? '0' + h : h
    m = (m < 10) ? '0' + m : m
    s = (s < 10) ? '0' + s : s

    hr.innerText = h + ' : '
    min.innerText = m + ' : '
    sec.innerText = s;
    ampm.innerText = ampm
    calender(time)
  }
  setTime.forEach((span, i) => {
    if (getTimeFromLocalStorage !== null) {
      span.innerText = getTimeFromLocalStorage[i]
    } else {
      span.innerText = timeArray[i]
    }
    span.addEventListener('dblclick', getTimeFromUser(i))
  })
  // start clock
  setInterval(clock,1000);
  function calender(time) {
    let d = time.getDay(),
        dt = time.getDate(),
        mth = time.getMonth(),
        y = time.getFullYear();
    day.innerText = dt
    month.innerText = mth + 1
    year.innerText = y
    daysArray.forEach((el, i) => {
      if (i == d) {
        daysArray[i].classList.add('active');
      } else {
        daysArray[i].classList.remove('active');
      }
    })
  }
  // get time from user input
  function getTimeFromUser(i) {
    return function () {
      const targetedSpan = this
      const inputTime = document.createElement('input')
      inputTime.type = 'time'
      targetedSpan.innerText = ""
      targetedSpan.appendChild(inputTime);
      inputTime.addEventListener('change',
        setPreyerTime(targetedSpan, i))
    }
  }
  function setPreyerTime(targetedSpan, i) {
    return function () {
      let inputHr = this.value.slice(0, 2)
      const mn = this.value.slice(3, 5)
      targetedSpan.innerText = `${inputHr} : ${mn}`
      timeArray[i] = `${inputHr} : ${mn}`
      if (inputHr == 0) {
        inputHr = 24
        targetedSpan.innerText = `${inputHr} : ${mn}`
        timeArray[i] = `${inputHr} : ${mn}`
      }
      localStorage.setItem('saveTime', JSON.stringify(timeArray))
    }
  }
  /**
   * Utility function
   * @param {any html element} ele 
   * @returns dom reference
   */
  function select(ele) {
    return document.querySelector(ele)
  }
}