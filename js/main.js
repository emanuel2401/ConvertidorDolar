const loading = document.getElementById('loading')
function convertirDolar() {
    const cantidad = document.getElementById('cantidad').value;
    const url = "https://dolarapi.com/v1/dolares/blue"
    if (cantidad !== "") {
        fetch(url)
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        loading.classList = "show"
        setTimeout(() => {
            loading.classList = "hidden"
            const valorDolarBlueVenta = data.venta;
            const valorDolarBlueCompra = data.compra;
            const resultadoVenta = cantidad * valorDolarBlueVenta;
            const resultadoCompra = cantidad * valorDolarBlueCompra
            document.getElementById('resultado').value = resultadoVenta.toFixed(2);
            document.getElementById('resultadoCompra').value = resultadoCompra.toFixed(2);
        }, 2000);

    })
    .catch(error => console.error('Error al obtener datos:', error));
    } else {
        mostrarAlerta('Ingrese algun dato correcto');
    }
}

function limpiarInput() {
    document.getElementById('resultado').value = ''
    document.getElementById('resultadoCompra').value = ''
    document.getElementById('cantidad').value = ''
}

function mostrarAlerta(mensaje) {
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger alert-dismissible fade show mt-2 text-center' ;
    alerta.role = 'alert';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="close " data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;

    document.getElementById("alerta").appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}