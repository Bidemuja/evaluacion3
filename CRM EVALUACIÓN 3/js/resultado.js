// 1.Agregar resultado
function crearResultado() {
    alert("Recibido");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //Variables con los datos de formulario para agregar resultado
    var txt_id_resultado = document.getElementById("txt_id_resultado").value;
    var txt_nombre_resultado = document.getElementById("txt_nombre_resultado").value;

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
        "id_resultado": txt_id_resultado,
        "nombre_resultado": txt_nombre_resultado,
        "fecha_registro": fechaActual
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/resultado/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
/*____________________________________________________________________________________________________________________________*/
// 2.Listar resultados
function listarResultados() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/resultado", requestOptions)
        .then(response => response.json())
        .then((json) => {
            json.forEach(completarFila);
            return json;
          })
          .then((json) => {
            $("#tbl_resultados").DataTable();
          })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

//Completar fila
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_resultados tbody').innerHTML +=
        `<tr>
        <td>${element.id_resultado}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.fecha_registro}</td>
        <td>
  <a href='eliminar-resultado.html?id=${element.id_resultado}'> <img src='../img/eliminar_24x24.png'></a> 
  <a href='actualizar-resultado.html?id=${element.id_resultado}'> <img src='../img/actualizar_24x24.png'></a> 
  </td>
  
    </tr>`
}

/*______________________________________________________________________________________________________________________________*/

// 3. Eliminar Resultado
function eliminarResultado() {
    var id_resultado_eliminar = document.getElementById('hdn_id_resultado').value;
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://159.223.103.211/api/resultado/" + id_resultado_eliminar, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("Resultado eliminado");
                window.location.href = "listar-resultado.html";
            }

        })
}

//Obtener el id del tiepo de gestión a eliminar
function obtenerIDResultado() {
    var queryString = window.location.search;
    var urlParametros = new URLSearchParams(queryString);
    var id_resultado_url = urlParametros.get('id');

    document.getElementById('hdn_id_resultado').value = id_resultado_url;
    //Mostramos mensaje de confirmación
    var mensaje = "¿" + "Desea eliminar el resultado número" + " " + id_resultado_url + " ?";
    document.getElementById("alt_eliminacion_resultado").innerHTML = mensaje;
}
/*______________________________________________________________________________________________________________________________*/
//Actualizar resultados
