function validateform() {
    var x = document.myform.email.value;
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    var first = document.myform.firstname.value;
    var second = document.myform.lastname.value;
    var c = document.myform.contact.value;

    if (first == " " || second == " ") {
        alert("Name can't be blank");
        return false;
    }
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address!");
        return false;
    }
    if (c == null || c== ""){
        alert("Please type something.");
        return false;
    }
    alert("Already sent!");
    return true;
}