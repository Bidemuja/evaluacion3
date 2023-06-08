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
var fechaActual=obtenerFechaActual();
// 1.Agregar gestión
function crearGestion() {
  alert("Recibido");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //Variables con los datos de formulario para agregar gestion
  var txt_id_gestion = document.getElementById("txt_id_gestion").value;
  var txt_id_usuario = document.getElementById("txt_id_usuario").value;
  var txt_id_cliente = document.getElementById("txt_id_cliente").value;
  var txt_id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
  var txt_id_resultado = document.getElementById("txt_id_resultado").value;
  var txt_comentario = document.getElementById("txt_comentario").value;

  var raw = JSON.stringify({
    "id_gestion": null,
    "id_usuario": txt_id_usuario,
    "id_cliente": txt_id_cliente,
    "id_tipo_gestion": txt_id_tipo_gestion,
    "id_resultado": txt_id_resultado,
    "comentarios": txt_comentario,
    "fecha_registro": fechaActual
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/gestion", requestOptions)
    .then(response => response.text())
    //.then(result => console.log(result))
    .catch(error => console.log('error', error));

}
/*____________________________________________________________________________________________________________________________*/

// 2.Listar gestiones
function listarGestiones() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/gestion", requestOptions)
    .then(response => response.json())
    .then((json) => {
      json.forEach(completarFila);
      return json;
    })
    .then((json) => {
      $("#tbl_gestiones").DataTable();
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

//Completar fila
function completarFila(element, index, arr) {
  arr[index] = document.querySelector('#tbl_gestiones tbody').innerHTML +=
    `<tr>
      <td>${element.id_gestion}</td>
      <td>${element.id_usuario}</td>
      <td>${element.id_cliente}</td>
      <td>${element.id_tipo_gestion}</td>
      <td>${element.id_resultado}</td>
      <td>${element.comentarios}</td>
      <td>${element.fecha_registro}</td>
      <td>
<a href='eliminar-gestion.html?id=${element.id_gestion}'> <img src='../img/eliminar_24x24.png'></a> 
<a href='actualizar-gestion.html?id=${element.id_gestion}&id2=${element.id_usuario}'> <img src='../img/actualizar_24x24.png'></a> 
</td>

  </tr>`
}

/*______________________________________________________________________________________________________________________________*/
// 3. Eliminar Gestión
function eliminarGestion() {
  var id_gestion_eliminar = document.getElementById('hdn_id_gestion').value;
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/gestion/" + id_gestion_eliminar, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("Gestión eliminada");
        window.location.href = "listar-gestiones.html";
      }

    })
}

//Obtener el id de la gestión a eliminar
function obtenerIDGestionEliminar() {
  var queryString = window.location.search;
  var urlParametros = new URLSearchParams(queryString);
  var id_gestion_url = urlParametros.get('id');

  document.getElementById('hdn_id_gestion').value = id_gestion_url;
  //Mostramos mensaje de confirmación
  var mensaje = "¿" + "Desea eliminar la gestión número" + " " + id_gestion_url + " ?";
  document.getElementById("alt_eliminacion_gestion").innerHTML = mensaje;
}

/*______________________________________________________________________________________________________________________________*/
//Actualizar gestión
// Consultar datos de gestión
function consultarDatosGestion(id_gestion) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch("http://159.223.103.211/api/gestion/" + id_gestion, requestOptions)
    .then(response => response.json())
    .then((json) => json.forEach(completarFormulario))
    .catch(error => console.log('error', error));

  //Completar formulario
  function completarFormulario(element) {

    var gestion = element.id_gestion;
    var usuario = element.id_usuario;
    var cliente = element.id_cliente;
    var tipo_gestion = element.id_tipo_gestion;
    var resultado = element.id_resultado;
    var comentarios = element.comentarios;

    document.getElementById("txt_id_gestion").value = gestion;
    document.getElementById("txt_id_usuario").value = usuario;
    document.getElementById("txt_id_cliente").value = cliente;
    document.getElementById("txt_id_tipo_gestion").value = tipo_gestion;
    document.getElementById("txt_id_resultado").value = resultado;
    document.getElementById("txt_comentario").value = comentarios;

  }

}
//Obtenemos los datos de la gestión a actualizar
function obtenerIDGestionActualizar() {
  var queryString = window.location.search;
  var urlParametros = new URLSearchParams(queryString);
  var id_gestion_url = urlParametros.get('id');

  document.getElementById("txt_id_gestion").value = id_gestion_url;
  consultarDatosGestion(id_gestion_url);
}

// Actualizamos los datos de gestión con el método patch
function actualizarGestion() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var txt_id_gestion = document.getElementById("txt_id_gestion").value;
  var txt_id_usuario = document.getElementById("txt_id_usuario").value;
  var txt_id_cliente = document.getElementById("txt_id_cliente").value;
  var txt_id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
  var txt_id_resultado = document.getElementById("txt_id_resultado").value;
  var txt_comentario = document.getElementById("txt_comentario").value;

  var raw = JSON.stringify({
    "id_gestion": txt_id_gestion,
    "id_usuario": txt_id_usuario,
    "id_cliente": txt_id_cliente,
    "id_tipo_gestion": txt_id_tipo_gestion,
    "id_resultado": txt_id_resultado,
    "comentarios": txt_comentario,
    "fecha_registro": fechaActual
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://159.223.103.211/api/gestion/" + txt_id_gestion, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("Gestión actualizada");
        window.location.href = "listar-gestiones.html";
      }

    })
}