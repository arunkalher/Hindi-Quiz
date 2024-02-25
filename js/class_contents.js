import fetch_questions from './fetch_questions.js'


function class_contents(className) {
    let topics_block = document.getElementById("parent_lessons")
    let topics_parent = document.getElementById("lessons_block")
    topics_parent.innerText=""
    function renderQuestions(event,topics) {
      
        // topics_block.style.display="none"
        let lesson = event.target.id.replace("lesson", "")
        // let jsonPath=`../jsons/class${className}/class${className}_{lesson}.json`
        fetch_questions(className, lesson,topics[lesson-1])
       

    }
   
        let name_of_class = document.getElementById("name_of_class")
        let s = ""
        if (className == 0) {
            s = "हिंदी व्याकरण"

        }
        else {
            s = `कक्षा - ${className}`
        }
        name_of_class.innerText = s
        let questions = fetch(`../jsons/topics_${className}.json`)


            .then(
                res => res.json()

            ).then(
                (topics) => {
                    let classes = document.getElementById("classes")
                    classes.style.display = "none"

                    for (let i = 0; i < topics.length; i++) {
                      
                        
                        let TOPIC = document.createElement("div")
                        TOPIC.classList.add("lesson")
                        TOPIC.setAttribute("id", `lesson${i + 1}`)
                        TOPIC.innerText = topics[i]
                        topics_parent.appendChild(TOPIC)


                    }
                    topics_block.style.display = "block"
                    for (let i = 0; i < topics.length; i++) {
                        topics_parent.children[i].addEventListener("click", (event)=>renderQuestions(event,topics))
                    }
                }

            )
    
}


export default class_contents