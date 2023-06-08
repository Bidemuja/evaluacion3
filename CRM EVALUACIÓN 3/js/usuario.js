// 1.Agregar usuario
function crearUsuario() {
    alert("Recibido");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Variables con los datos del formulario para agregar usuario

    var txt_id_usuario = document.getElementById("txt_id_usuario").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;
    var txt_username = document.getElementById("txt_username").value;
    var txt_password = document.getElementById("txt_password").value;

     //Obtenemos la fecha actual 
     function obtenerFechaActual() {
        var fecha = new Date();

        var anio = fecha.getFullYear();
        var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        var dia = fecha.getDate().toString().padStart(2, '0');
        var horas = fecha.getHours().toString().padStart(2, '0');
        var minutos = fecha.getMinutes().toString().padStart(2, '0');
        var segundos = fecha.getSeconds().toString().padStart(2, '0');

        var fechaActual = anio + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

        return fechaActual;
    }

    var raw = JSON.stringify({
        "id_usuario": txt_id_usuario,
        "dv": txt_dv,
        "nombres": txt_nombres,
        "apellidos": txt_apellidos,
        "email": txt_email,
        "celular": txt_celular,
        "username": txt_username,
        "password": txt_password,
        "fecha_registro": fechaActual
        //"2023-04-28 15:40:00"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
/*____________________________________________________________________________________________________________________________*/

// 2.Listar usuarios
function listarUsuarios() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario/", requestOptions)
        .then(response => response.json())
        .then((json) => {
            json.forEach(completarFila);
            return json;
        })
        .then((json) => {
            $("#tbl_usuarios").DataTable();
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//Completar fila
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_usuarios tbody').innerHTML +=
        `<tr>
        <td>${element.id_usuario}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${element.password}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-usuario.html?id=${element.id_usuario}&nombres=${element.nombres}&apellidos=${element.apellidos}'> <img src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-usuario.html?id=${element.id_usuario}&nombres=${element.nombres}&apellidos=${element.apellidos}'> <img src='../img/actualizar_24x24.png'></a> 
  </td>
  
    </tr>`
}

/*______________________________________________________________________________________________________________________________*/
// 3. Eliminar Usuario

//Obtenemos id del usuario a eliminar
function obtenerIDUsuarioEliminar() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_usuario_url = urlParametros.get('id');
    var nombre_url = urlParametros.get('nombres');
    var apellido_url = urlParametros.get('apellidos');

    document.getElementById('hdn_id_usuario').value = id_usuario_url;
    document.getElementById('hdn_nombre_usuario').value = nombre_url;
    document.getElementById('hdn_apellidos_usuario').value = apellido_url;

    var mensaje = "¿" + "Desea eliminar al usuario " + nombre_url + " " + apellido_url + " ?";
    document.getElementById("alt_eliminacion").innerHTML = mensaje;
}
// Eliminar usuario
function eliminarUsuario() {

    var id_usuario_eliminar = document.getElementById('hdn_id_usuario').value;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario/" + id_usuario_eliminar, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Usuario eliminado");
                window.location.href = "listar-usuarios.html";
            }

        })
}


/*______________________________________________________________________________________________________________________________*/
//Actualizar Usuario
// Consultar datos de usuario
function consultarDatosUsuario(id_usuario) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://159.223.103.211/api/usuario/" + id_usuario, requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarFormulario))
        .catch(error => console.log('error', error));

    //Completar formulario
    function completarFormulario(element) {

        var id_usuario = element.id_usuario;
        var dv = element.dv;
        var nombres = element.nombres;
        var apellidos = element.apellidos;
        var email = element.email;
        var celular = element.celular;
        var username = element.username;
        var password = element.password;

        document.getElementById("txt_id_usuario").value = id_usuario;
        document.getElementById("txt_dv").value = dv;
        document.getElementById("txt_nombres").value = nombres;
        document.getElementById("txt_apellidos").value = apellidos;
        document.getElementById("txt_email").value = email;
        document.getElementById("txt_celular").value = celular;
        document.getElementById("txt_username").value = username;
        document.getElementById("txt_password").value = password;

    }

}
//Obtenemos los datos de la gestión a actualizar
function obtenerIDUsuarioActualizar() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_usuario_url = urlParametros.get('id');

    document.getElementById("txt_id_usuario").value = id_usuario_url;
    consultarDatosUsuario(id_usuario_url);
}

// Actualizamos los datos de gestión con el método patch
function actualizarUsuario() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var txt_id_usuario = document.getElementById("txt_id_usuario").value;
    var txt_dv = document.getElementById("txt_dv").value;
    var txt_nombres = document.getElementById("txt_nombres").value;
    var txt_apellidos = document.getElementById("txt_apellidos").value;
    var txt_email = document.getElementById("txt_email").value;
    var txt_celular = document.getElementById("txt_celular").value;
    var txt_username = document.getElementById("txt_username").value;
    var txt_password = document.getElementById("txt_password").value;

    //Obtenemos la fecha actual 
    function obtenerFechaActual() {
        var fecha = new Date();

        var anio = fecha.getFullYear();
        var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        var dia = fecha.getDate().toString().padStart(2, '0');
        var horas = fecha.getHours().toString().padStart(2, '0');
        var minutos = fecha.getMinutes().toString().padStart(2, '0');
        var segundos = fecha.getSeconds().toString().padStart(2, '0');

        var fechaActual = anio + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;

        return fechaActual;
    }

    var fechaActual = obtenerFechaActual();

    var raw = JSON.stringify({
        "id_usuario": txt_id_usuario,
        "dv": txt_dv,
        "nombres": txt_nombres,
        "apellidos": txt_apellidos,
        "email": txt_email,
        "celular": txt_celular,
        "username": txt_username,
        "password": txt_password,
        "fecha_registro": fechaActual
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/usuario/" + txt_id_usuario, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Usuario actualizado");
                window.location.href = "listar-usuarios.html";
            }

        })
}