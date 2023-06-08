// 1.Agregar tipo-gestión
function crearTipoGestion() {
    alert("Recibido");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Variables con los datos de formulario para agregar tipo de gestion
    var txt_id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
    var txt_nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

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
        "id_tipo_gestion": txt_id_tipo_gestion,
        "nombre_tipo_gestion": txt_nombre_tipo_gestion,
        "fecha_registro": fechaActual
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
/*____________________________________________________________________________________________________________________________*/
// 2.Listar tipo de gestiones gestiones
function listarTipoGestiones() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion", requestOptions)
        .then(response => response.json())
        .then((json) => {
            json.forEach(completarFila);
            return json;
        })
        .then((json) => {
            $("#tbl_tipo_gestiones").DataTable();
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//Completar fila
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_tipo_gestiones tbody').innerHTML +=
        `<tr>
        <td>${element.id_tipo_gestion}</td>
        <td>${element.nombre_tipo_gestion}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-tipo-gestion.html?id=${element.id_tipo_gestion}'> <img src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-tipo-gestion.html?id=${element.id_tipo_gestion}'> <img src='../img/actualizar_24x24.png'></a> 
  </td>
  
    </tr>`
}

/*______________________________________________________________________________________________________________________________*/

// 3. Eliminar Tipo de Gestión
function eliminarTipoGestion() {
    var id_tipo_gestion_eliminar = document.getElementById('hdn_id_tipo_gestion').value;
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/tipo_gestion/" + id_tipo_gestion_eliminar, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Tipo de Gestión eliminada");
                window.location.href = "listar-tipo-gestion.html";
            }

        })
}

//Obtener el id del tiepo de gestión a eliminar
function obtenerIDTipoGestionEliminar() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_tipo_gestion_url = urlParametros.get('id');

    document.getElementById('hdn_id_tipo_gestion').value = id_tipo_gestion_url;
    //Mostramos mensaje de confirmación
    var mensaje = "¿" + "Desea eliminar el tipo de gestión número" + " " + id_tipo_gestion_url + " ?";
    document.getElementById("alt_eliminacion_tipo_gestion").innerHTML = mensaje;
}
/*______________________________________________________________________________________________________________________________*/
//Actualizar tipo de gestión
// Consultar datos de tipo de gestión
function consultarDatosTipoGestion(id_tipo_gestion) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://159.223.103.211/api/tipo_gestion/" + id_tipo_gestion, requestOptions)
        .then(response => response.json())
        .then((json) => json.forEach(completarFormulario))
        .catch(error => console.log('error', error));

    //Completar formulario
    function completarFormulario(element) {

        var tipo_gestion = element.id_tipo_gestion;
        var nombre_tipo_gestion = element.nombre_tipo_gestion;

        document.getElementById("txt_id_tipo_gestion").value = tipo_gestion;
        document.getElementById("txt_nombre_tipo_gestion").value = nombre_tipo_gestion;

    }

}
//Obtenemos los datos del tipo de gestión a actualizar
function obtenerIDTipoGestionActualizar() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_tipo_gestion_url = urlParametros.get('id');

    document.getElementById("txt_id_tipo_gestion").value = id_tipo_gestion_url;
    consultarDatosTipoGestion(id_tipo_gestion_url);
}

// Actualizamos los datos de gestión con el método patch