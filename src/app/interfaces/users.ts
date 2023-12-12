export interface Users {
    u_id?:          number;
    u_idempresa?:   number;
    u_idusuario?:   string;
    u_idperfil?:    string;
    u_nombre?:      string;
    u_estado?:      Boolean;
    u_datesys?:     string;
    u_ultimologin?: string;
    u_idtercero?:   string;
    u_idbodega?:    string;
    b_nombre?:      string;
    
}

export const UserInter = {
    u_id:          0,
    u_idempresa:   0,
    u_idusuario:   "",
    u_idperfil:    "",
    u_nombre:      "",
    u_estado:      true,
    u_datesys:     "",
    u_ultimologin: "",
    u_idtercero:   "",
    u_idbodega:    "",
    b_nombre:      "",
}