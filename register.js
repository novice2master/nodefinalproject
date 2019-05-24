function getElements(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;

    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(psw);
}

module.exports = {
    getElements
}