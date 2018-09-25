var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // bounces in the text for next 
    x[n].classList.add('animated', 'bounceIn');
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()){
        return false; 
    }
    // Hide the current tab:
    // fades in the text for prev 
    x[currentTab].classList.add('animated','fadeIn');
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    /* Checks for input */
    y = x[currentTab].getElementsByTagName("input") ;
    /* Checks for select */
    w = x[currentTab].getElementsByTagName("select");
    // A loop that checks every input field in the current tab:
    /* Checks for input */
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            y[i].classList.add('invalid', 'animated', 'shake');
            // and set the current valid status to false:
            valid = false;
        }
    }
    // removes class when user clicks back on dropdown
    var selectDebt = document.getElementById('select-debt');
    var selectType = document.getElementById('select-type');
    var selectStatus = document.getElementById('select-status');
    selectDebt.onclick = function () {
        selectDebt.classList.remove('invalid', 'animated', 'shake');
    }
    selectType.onclick = function () {
        selectType.classList.remove('invalid', 'animated', 'shake');
    }
    selectStatus.onclick = function () {
        selectStatus.classList.remove('invalid', 'animated', 'shake');
    }
    /* Checks for select */
    for (i = 0; i < w.length; i++ ){
        if (w[i].value == "") {
            console.log('1');
            // add an "invalid" class to the field:
            w[i].classList.add('invalid', 'animated', 'shake');
            // and set the current valid status to false:
            valid = false;
        } 
        else {
            // removes error color and shank if previous value is not empty
            w[i].classList.remove('invalid', 'animated', 'shake');
        }
    }
    /* w[i].classList.remove('invalid', 'animated', 'shake'); */
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";


    }
    return valid; // return the valid status
}


function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}