let URL = "http://localhost:3010/api";

export function url_api() {
    return URL;
}

export const InicioSesion = async (data) => {
    const headers = {
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/inicio", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const obtener = async (recurso, key = '') => {
    let cabeceras = []
    if (key !== '') {
        cabeceras = {
            "Accept": 'aplication/json',
            "Content-Type": 'application/json',
            "x-api-token": key
        };
    } else {
        cabeceras = {
            "Accept": 'aplication/json',
            "Content-Type": 'application/json'
        };
    }
    const datos = await (await fetch(URL + recurso, {
        method: "GET",
        headers: cabeceras
    })).json();
    console.log("dooot", datos);
    return datos;
}

export const enviar = async (recurso, data, key = '') => {
    let headers = []
    if (key !== '') {
        headers = {
            "Accept": 'aplication/json',
            "Content-Type": 'application/json',
            "x-api-token": key
        };
    } else {
        headers = {
            "Accept": "application/json",
            "Content-Type": 'application/json',
        };
    }
    const response = await fetch(URL + recurso, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });
    console.log("datoooos", data);
    return await response.json();
}
