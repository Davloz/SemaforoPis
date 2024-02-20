'use client';

export const get = (key) => {
    window.sessionStorage.getItem(key);
}

export const getToken = () => {
    return window.sessionStorage.getItem("token");
}

/**export const getRol = () => {
    return window.sessionStorage.getItem("id");
}*/
export const getRol = () => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem("rol");
    }
    return null; // Otra opción es devolver un valor predeterminado
  }

  export const getExternal = () => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem("external");
    }
    return null; // Otra opción es devolver un valor predeterminado
  }

export const borrarSesion = () => {
    window.sessionStorage.clear();
}

export const estaSesion = () => {
    let token = window.sessionStorage.getItem('token');
    return (token && (token !== 'undefined' || token !== null || token !== 'null'));
}