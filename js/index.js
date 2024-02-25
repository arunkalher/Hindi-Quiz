
import class_contents from './class_contents.js'
let menu_expanded = false
function toggleMenu() {


    console.log(menu_expanded)

    if (!menu_expanded) {
        document.getElementById("second_nav").style.display = "grid"
        let menu_spans = document.getElementsByClassName("menu-spans")
        for (let menu_span of menu_spans) {
            menu_span.style.backgroundColor = "black"
        }
    }
    else {
        document.getElementById("second_nav").style.display = "none"
        let menu_spans = document.getElementsByClassName("menu-spans")
        for (let menu_span of menu_spans) {
            menu_span.style.backgroundColor = "white"
        }
    }
    menu_expanded = !menu_expanded
}
function app() {
    function backfrominst() {
        document.getElementById("instructions_wrapper").style.display = "none"
        document.getElementById("parent_lessons").style.display = "block"
    }
    document.getElementById("ins-button-back").addEventListener("click", backfrominst)

    function f(event) {


        if ((event.target.parentNode.id !== "menu" && event.target.id !== "menu") && menu_expanded) {

            toggleMenu()
        }
    }
    window.addEventListener("click", f)
    let hori_home = document.getElementById("hori-home")
    let verti_home = document.getElementById("verti-home")
    hori_home.addEventListener("click", () => { homeClikced() })
    verti_home.addEventListener("click", () => { homeClikced() })
    let iconHome = document.getElementById("home-icon")
    iconHome.addEventListener("click", () => { homeClikced(false) })
    function aboutClicked(event) {



        document.getElementById("classes").style.display = "none"
        document.getElementById("parent_lessons").style.display = "none"

        if (event.target.id.includes("contact")) {
            document.getElementById("content-wrap").style.display = "block"
            document.getElementById("about_wrap").style.display = "none"
        }
        else {
            document.getElementById("about_wrap").style.display = "block"
            document.getElementById("content-wrap").style.display = "none"

        }

        toggleMenu()

    }
    document.getElementById("hori-about").addEventListener("click", (event) => { aboutClicked(event) })
    document.getElementById("verti-about").addEventListener("click", (event) => { aboutClicked(event) })
    document.getElementById("hori-contact").addEventListener("click", (event) => { aboutClicked(event) })
    document.getElementById("verti-contact").addEventListener("click", (event) => { aboutClicked(event) })



    function homeClikced(toggle = true) {
        console.log("home clicked")
        const ids_to_check = ["about_wrap",
            "content-wrap",
            "instructions_wrapper",
            "que-block",

            "message",
            "parent_lessons", "second_nav"]

        for (let id_to_check of ids_to_check) {
            document.getElementById(id_to_check).style.display = "none"

        }

        if (window.innerWidth > 500) {
            document.getElementById("hori-about").style.display = "block"
            document.getElementById("hori-contact").style.display = "block"
        }
        if (window.innerWidth <= 500) {
            document.getElementById("verti-about").style.display = "block"
            document.getElementById("verti-contact").style.display = "block"
        }
        document.getElementById("classes").style.display = "flex"

        if (toggle)
            toggleMenu()

    }


    let menu_icon = document.getElementById("menu")

    function menuClicked() {
        toggleMenu()
    }
    function homeFun() {
        let message = document.getElementById("message")

        message.style.display = "none"
        classes.style.display = "flex"
        if (window.innerWidth > 500) {
            let hori_about = document.getElementById("hori-about")
            let hori_contact = document.getElementById("hori-contact")
            hori_about.style.display = "inline-block"
            hori_contact.style.display = "inline-block"
        }
        if (window.innerWidth <= 500) {
            let verti_about = document.getElementById("verti-about")
            let verti_contact = document.getElementById("verti-contact")
            verti_about.style.display = "inline-block"
            verti_contact.style.display = "inline-block"
        }


        if (window.innerWidth <= 500) {
            let verti_about = document.getElementById("verti-about")
            let verti_contact = document.getElementById("verti-contact")
            verti_about.style.display = "block"
            verti_contact.style.display = "block"
        }


    }
    let classes = document.getElementById("classes")

    function buttonClicked(event) {


        if (event.target.id.includes("class_")) {
            let className = event.target.id.replace("class_", "");




            class_contents(className)




        }
    }
    classes.addEventListener("click", buttonClicked);

    menu_icon.addEventListener("click", () => { menuClicked() })
    function winResized() {
        if (window.innerWidth > 500) {
            let second_nav = document.getElementById("second_nav")
            second_nav.style.display = "none"

        }
        if (window.innerWidth <= 500) {
            let second_nav = document.getElementById("second_nav")
            second_nav.style.display = "none"
            let menu_spans = document.getElementsByClassName("menu-spans")
            for (let menu_span of menu_spans) {
                menu_span.style.backgroundColor = "white"

            }
        }
    }
    window.addEventListener('resize', () => { winResized() })
}
document.addEventListener("DOMContentLoaded", app)
