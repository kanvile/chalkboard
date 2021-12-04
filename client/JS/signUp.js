function validateform() {
    var pwd = document.myform.psw.value;
    var pwd2 = document.myform.psw2.value;
    var x = document.myform.email.value;
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    var first = document.myform.firstName.value;
    var second = document.myform.lastName.value;

    if (first == " " || second == " ") {
        alert("Name can't be blank");
        return false;
    }
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address!");
        return false;
    }
    if(pwd!= pwd2){
        alert("Error: Password must be same!");
        return false;
    }
        if (pwd.length < 6) {
            alert("Error: Password must contain at least six characters!");
            return false;
        }
        re = /[0-9]/;
        if (!re.test(pwd)) {
            alert("Error: password must contain at least one number (0-9)!");
            return false;
        }
        re = /[a-z]/;
        if (!re.test(pwd)) {
            alert("Error: password must contain at least one lowercase letter (a-z)!");
            return false;
        }
        re = /[A-Z]/;
        if (!re.test(pwd)) {
            alert("Error: password must contain at least one uppercase letter (A-Z)!");
            return false;
        }
    alert("Success!");
    return true;
}

