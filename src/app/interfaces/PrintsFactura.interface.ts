export interface PrintsFacturas {
    nitArr:           Arr;
    regimenArr:       Arr;
    nombreEmpresaArr: Arr;
    direccionArr:     Arr;
    empresaArr:       EmpresaArr;
    factura:          Factura[];
    facturaDetalle:   FacturaDetalle[];
    formadePafos:     FormadePafo[];
}

export const varPrintsFacturas = {
    nitArr:           [],
    regimenArr:       [],
    nombreEmpresaArr: [],
    direccionArr:     [],
    empresaArr:       [],
    factura:          [],
    facturaDetalle:   [],
    formadePafos:     [],
}

export interface Arr {
    id:          number;
    empresa:     string;
    descripcion: string;
    valor:       string;
}

export interface EmpresaArr {
    idempresa: number;
    nombre:    string;
    direccion: string;
}

export interface Factura {
    terceros_documento: string;
    id:                 number;
    idempresa:          number;
    idbodega:           string;
    idprefijo:          string;
    numdoc:             number;
    idtercero:          string;
    prefacturanum:      string;
    prefacturaprefijo:  string;
    fecha:              Date;
    vlrsubtotal:        string;
    vlrdcto:            string;
    vlriva:             string;
    vlrico:             string;
    vlrtotal:           string;
    datesys:            Date;
    idusuario:          string;
    idturno:            number;
    estado:             number;
    vlrrecibido:        string;
    vlrcambio:          string;
    cliente_nombre:     string;
    cliente_apellido:   string;
}

export interface FacturaDetalle {
    id:                number;
    idempresa:         number;
    idbodega:          string;
    idprefijo:         string;
    numdoc:            number;
    item:              number;
    idarticulo:        string;
    cantidad:          string;
    vlrunitario:       string;
    vlrdcto:           string;
    vlriva:            string;
    vlrico:            string;
    vlrtotal:          string;
    datesys:           Date;
    idusuario:         string;
    totalfactura:      string;
    articulo_cantidad: string;
    articulo_nombre:   string;
}

export interface FormadePafo {
    id:          number;
    idempresa:   number;
    idbodega:    string;
    idprefijo:   string;
    numdoc:      number;
    item:        number;
    idpago:      number;
    vlrpago:     string;
    idusuario:   string;
    datesys:     Date;
    nombre_pago: string;
}

export const varPrintsFacturasa = {
    "nitArr":{
        "id":15,
        "empresa":"001",
        "descripcion":"nit",
        "valor":"900.673.132-6"
    },
    "regimenArr":{
        "id":18,
        "empresa":"001",
        "descripcion":"regimen",
        "valor":"RÉGIMEN SIMPLE DE TRIBUTACIÓN"
    },
    "nombreEmpresaArr":{
        "id":14,
        "empresa":"001",
        "descripcion":"nombreEmpresa",
        "valor":"NICOSU SAS"
    },
    "direccionArr":{
        "id":16,
        "empresa":"001",
        "descripcion":"direccion",
        "valor":"Calle 109 n 36 40 "
    },
    "empresaArr":{
        "idempresa":1,
        "nombre":"FRAPPÉ COMPANY",
        "direccion":"Carrera 54 64-245"
    },
    "factura":[
        {
        "terceros_documento":"999999999",
        "id":7,
        "idempresa":1,
        "idbodega":"006",
        "idprefijo":"FVT",
        "numdoc":7,
        "idtercero":"999999999",
        "prefacturanum":"7",
        "prefacturaprefijo":"SPP"
        ,"fecha":"2023-11-11T05:00:00.000Z",
        "vlrsubtotal":"10000.00",
        "vlrdcto":"0.00",
        "vlriva":"0.00",
        "vlrico":"0.00",
        "vlrtotal":"10000.00",
        "datesys":"2023-11-11T17:41:05.000Z",
        "idusuario":"MASTER",
        "idturno":1,
        "estado":1,
        "vlrrecibido":"0",
        "vlrcambio":"0",
        "cliente_nombre":"VENTA DE CONTADO",
        "cliente_apellido":""
    }],
    "facturaDetalle":[{"id":14,"idempresa":1,"idbodega":"006","idprefijo":"FVT","numdoc":7,"item":1,"idarticulo":"2","cantidad":"1","vlrunitario":"5000.00","vlrdcto":"0.00","vlriva":"0.00","vlrico":"0.00","vlrtotal":"5000.00","datesys":"2023-11-11T17:41:05.000Z","idusuario":"MASTER","totalfactura":"5000.00","articulo_cantidad":"1","articulo_nombre":"NATURAL 12 ONZ"},{"id":15,"idempresa":1,"idbodega":"006","idprefijo":"FVT","numdoc":7,"item":1,"idarticulo":"3","cantidad":"1","vlrunitario":"5000.00","vlrdcto":"0.00","vlriva":"0.00","vlrico":"0.00","vlrtotal":"5000.00","datesys":"2023-11-11T17:41:05.000Z","idusuario":"MASTER","totalfactura":"5000.00","articulo_cantidad":"1","articulo_nombre":"CEREZADA 12 ONZ"}],"formadePafos":[{"id":11,"idempresa":1,"idbodega":"006","idprefijo":"FVT","numdoc":7,"item":11,"idpago":1,"vlrpago":"5000.00","idusuario":"MASTER","datesys":"2023-11-11T17:41:05.000Z","nombre_pago":"EFECTIVO"},{"id":12,"idempresa":1,"idbodega":"006","idprefijo":"FVT","numdoc":7,"item":12,"idpago":2,"vlrpago":"5000.00","idusuario":"MASTER","datesys":"2023-11-11T17:41:05.000Z","nombre_pago":"TARJETA"}]}