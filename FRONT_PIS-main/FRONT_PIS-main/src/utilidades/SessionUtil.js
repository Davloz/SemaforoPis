export const save = (key, datos) => {
    sessionStorage.setItem(key, datos);
}

/**export const get = (key) => {
    sessionStorage.setItem(key, data);
}*/

export const saveToken = (key) => {
    return sessionStorage.setItem("token",key);
}
export const getToken = () => {
    return sessionStorage.getItem("token");
}

export const borrarSesion = () => {
    sessionStorage.clear();
}

export const estaSesion =()=>{
    var token = localStorage.getItem('token');
    return (token && (token !== 'undefined' || token!==null || token!=='null'));
}