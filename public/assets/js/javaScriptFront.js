function validate() {
    if (document.getElementById('pass').value.length < 5) {
        alert('La contraseña debe tener al menos 6 carácteres.');

    } else {
        document.getElementById('form').submit();
    }
}

function validateReg() {
    if (document.getElementById('passReg').value.length < 5) {
        alert('La contraseña debe tener al menos 6 carácteres.');
        console.log('jhuhfekjd');
    } else {
        document.getElementById('formReg').submit();
    }
}


function ciudades() {
    $.ajax({
        type: 'post',
        url: '/dept',
        data: { dep: $("#departamento").val() },
        success: function(respuesta) {
            $('#ciudad').find('option').remove()
            respuesta.ciudades.forEach(ciudad => {
                $("#ciudad").append(`<option  selected=”selected”>${ciudad}</option>`);
            });
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        }
    });
}

function login() {
    $.ajax({
        type: 'post',
        url: '/login',
        data: {
            user: $("#user").val(),
            pass: $("#pass").val()
        },
        success: function(respuesta) {
            console.log("jhbdjjksd");
            console.log(respuesta);
            if (!respuesta.response.error) {
                $("#form").submit()
                alert(respuesta)
            } else {
                alert(respuesta.response.mensaje)
            }
        },
        error: function() {
            alert("Error al intentar el loggin")
        }
    });

}

var slide_wrp = ".side-menu-wrapper"; //Menu Wrapper
var open_button = ".btn.btn-primary.btn-lg"; //Menu Open Button
var close_button = ".menu-close"; //Menu Close Button
var overlay = ".menu-overlay"; //Overlay

//Initial menu position
$(slide_wrp).hide().css({ "right": -$(slide_wrp).outerWidth() + 'px' }).delay(50).queue(function() { $(slide_wrp).show() });

$(open_button).click(function(e) { //On menu open button click
    e.preventDefault();
    $(slide_wrp).css({ "right": "0px" }); //move menu right position to 0
    setTimeout(function() {
        $(slide_wrp).addClass('active'); //add active class
    }, 50);
    $(overlay).css({ "opacity": "1", "width": "100%" });
});

$(close_button).click(function(e) { //on menu close button click
    e.preventDefault();
    $(slide_wrp).css({ "right": -$(slide_wrp).outerWidth() + 'px' }); //hide menu by setting right position 
    setTimeout(function() {
        $(slide_wrp).removeClass('active'); // remove active class
    }, 50);
    $(overlay).css({ "opacity": "0", "width": "0" });
});

$(document).on('click', function(e) { //Hide menu when clicked outside menu area
    if (!e.target.closest(slide_wrp) && $(slide_wrp).hasClass("active")) { // check menu condition
        $(slide_wrp).css({ "right": -$(slide_wrp).outerWidth() + 'px' }).removeClass('active');
        $(overlay).css({ "opacity": "0", "width": "0" });
    }
});