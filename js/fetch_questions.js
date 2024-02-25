import class_contents from './class_contents.js'

function call(class_, lesson, lessonName = "") {   
    let s = ""
    let t=0
    let timer = null
    let _message = document.getElementById("message")
    let fun_for_next_que = null


    if (class_ == 0) {
        s = "हिंदी व्याकरण"

    }
    else {
        s = `कक्षा - ${class_}`
    }
    if (window.innerWidth > 500) {
        let hori_about = document.getElementById("hori-about")
        let hori_contact = document.getElementById("hori-contact")


        hori_about.style.display = "none"
        hori_contact.style.display = "none"
    }
    if (window.innerWidth <= 500) {
        let verti_about = document.getElementById("verti-about")
        let verti_contact = document.getElementById("verti-contact")
        verti_about.style.display = "none"
        verti_contact.style.display = "none"
    }


    let score = 0
    let topics_block = document.getElementById("parent_lessons")
    topics_block.style.display = "none"
    function goBack() {
        let message = document.getElementById("message")
        message.style.display = "none"
        topics_block.style.display = "block"

        if (window.innerWidth > 500) {
            let hori_about = document.getElementById("hori-about")
            let hori_contact = document.getElementById("hori-contact")
            hori_about.style.display = "inline-block"
            hori_contact.style.display = "inline-block"
        }
        if (window.innerWidth <= 500) {
            let verti_about = document.getElementById("verti-about")
            let verti_contact = document.getElementById("verti-contact")
            verti_about.style.display = "block"
            verti_contact.style.display = "block"
        }
    }
    let back = document.getElementById("back")
    back.addEventListener("click", goBack)
    let answer = null;
    let classes = document.getElementById("classes")


    classes.style.display = "none"

    fetch(`../jsons/class${class_}/class${class_}_${lesson}.json`)


        .then(
            res => res.json()

        ).then(
            (questions) => {

                let que_block = document.getElementById("que-block")
                que_block.style.display = "none"


                function displayScore(extra = "") {
                    
                    que_block.style.display = "none"
                    let message = document.getElementById("message")
                    let scoree = document.getElementById("score")
                    let score_msg = `${extra}Your score is : ${score}/${questions.length}`
                    if (score == questions.length) {
                        score_msg = 'Congratulations!!!<br/> 🎉🎉 <br/> You scored full marks<br/>' + score_msg
                        score_msg+=' <img id="clap" src="./images/clapping-hands.gif" alt="clap">'
                       
                    }
                    let message1 = document.getElementById("message1")
                    let message2 = document.getElementById("message2")
                    message1.innerText = s
                    message2.innerText = lessonName
                    scoree.innerHTML = score_msg
                    message.style.display = "block"
                    clearInterval(timer)
                }
                let _que_class = document.getElementById("_que_class")
                _que_class.innerText = s
                let _que_lesson = document.getElementById("_que_lesson")
                _que_lesson.innerText = lessonName
                let index = 0;

                for (let i = questions.length - 1; i > 0; i--) {
                    let rand_ind = Math.floor(Math.random() * (i + 1));
                    [questions[i], questions[rand_ind]] = [questions[rand_ind], questions[i]];

                }

                function buttonClicked(event) {

                    if (!(event.target.className === "quiz-options"))
                        return
                    let options = document.getElementById("options")
                    options.removeEventListener("click", buttonClicked)
                    if (event.target.innerText === answer) {


                        event.target.style.backgroundColor = "#90EE90"
                        event.target.style.color = "white"
                        score += 1
                        // event.target.style.transform="rotate(360deg)"
                        event.target.style.transform = "rotate(360deg) scale(1.2)"
                    }
                    else {

                        event.target.style.backgroundColor = "red"
                        event.target.style.color = "white"
                        event.target.style.transform = "scale(0.8)"
                        for (let i = 0; i < 4; i++) {
                            let option = document.getElementById(`option${i + 1}`)
                            if (option.innerText === answer) {

                                option.style.backgroundColor = "#90EE90"
                                option.style.transform = "rotate(360deg) scale(1.2)"
                                option.style.color = "white"
                                break
                            }

                        }
                    }
                    index += 1
                    setTimeout(nextQue, 2000)
                }

                function nextQue() {
                   
                    if (document.getElementById("classes").style.display !== "none"
                        || (_message.style.display && _message.style.display !== "none")) {
                       
                        if (timer) {
                            clearInterval(timer)
                            timer = null;
                        }


                        return
                    }
                    if (index == 0) {

                        let _timer = document.getElementById("_timer")
                        // _timer.remove()
                        // _timer=document.createElement("section")
                        // _timer.setAttribute("id","_timer")
                        // _timer.classList.add("timer")
                        // document.getElementById("timer_wrap").appendChild(_timer)
                    t=Math.floor((questions.length/2)/5)*5
                    console.log(t)
                        t=t==0?5:t
                        _timer.innerText = (String(t
                            ) + ":00")
                            Math.floor((questions.length/2)/5)*5
                        function updateTimer() {

                         
                            if (document.getElementById("classes").style.display !== "none") {
                                clearInterval(timer)
                                return
                            }
                            let time = Number(_timer.innerText)
                            let [t1, t2] = _timer.innerText.split(":")

                            t1 = Number(t1)
                            t2 = Number(t2)

                            if (t1 == 0 && t2 == 0) {
                                displayScore("Time's Up.<br/>")

                                return
                            }
                            if (t2 === 0) {
                                t2 = 59
                                t1 = t1 - 1
                            }
                            else { t2 = t2 - 1 }

                            if (t1 <= 9) {
                                t1 = "0" + String(t1)
                            }
                            if (t2 <= 9) {
                                t2 = "0" + String(t2)
                            }


                            _timer.innerText = t1 + ":" + t2

                        }
                        timer = setInterval(updateTimer, 1000)
                    }

                    let que_block = document.getElementById("que-block")
                    que_block.style.display = "none"

                    if (index == questions.length) {
                        displayScore()

                        return


                    }
                    let options = document.getElementById("options")
                    options.addEventListener("click", buttonClicked)

                    for (let i = 0; i < 4; i++) {
                        let option = document.getElementById(`option${i + 1}`)
                        if (option)
                            option.remove()
                        option = document.createElement("div")
                        option.classList.add("quiz-options")
                        option.setAttribute("id", `option${i + 1}`)
                        option.innerText = questions[index]["options"][i]
                        options.appendChild(option)

                    }




                    document.getElementById("que").innerText = questions[index]["question"]

                    document.getElementById("que_no").innerText = `प्रश्न  - ${index + 1}/${questions.length}`




                    answer = questions[index]["answer"]
                    que_block.style.display = "block"

                }

                let _instructions_wrapper = document.getElementById("instructions_wrapper")
                document.getElementById("__que_class").innerText = s
                document.getElementById("__que_lesson").innerText = lessonName
                let t=Math.floor((questions.length/2)/5)*5
                console.log(t)
                t=t==0?5:t
                document.getElementById("no_of_quetions").innerText = `1. इसमें ${questions.length} प्रश्न हैं।`
                document.getElementById("time_of_quetions").innerText = `2. प्रश्नों को हल करने के लिए आपके पास ${t} मिनट हैं।`
                _instructions_wrapper.style.display = "block"

                let btnn = document.getElementById("ins-button")
                btnn.remove()
                btnn = document.createElement("button")
                btnn.setAttribute("id", "ins-button")
                btnn.innerText = "Start"
                document.getElementById("instructions_wrapper").insertBefore(btnn, document.getElementById("ins-button-back"))

                let options = document.getElementById("options")
                options.remove()
                options = document.createElement("section")
                options.setAttribute("id", "options")
                document.getElementById("que-block").appendChild(options)




                fun_for_next_que = () => {
                    _instructions_wrapper.style.display = "none"

                    nextQue()
                }
                btnn.addEventListener("click", fun_for_next_que)


            }
        )

}
export default call