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
            console.log(respuesta);
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