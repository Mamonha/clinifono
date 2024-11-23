import { Paciente } from "./paciente";
import { Usuario } from "./usuario";

export class Consulta {

    id?: number;

    dataAgendamento!: Date;
    horaDeInicio!: string;
    horaDoFim!: string;
    descricao!: string;
    
    usuario!: Usuario;
    paciente!: Paciente;
    status !: string;

   

    //constructor(dataAgendamento: Date, horaInicio: Date, horaFim: Date, descricao: string, usuario: Usuario, paciente: Paciente){
      //  this.dataAgendamento = dataAgendamento;
        //this.horaInicio = horaInicio;
        //this.horaFim = horaFim;
        //this.descricao = descricao;
//
  //      this.usuario = usuario;
    //    this.paciente = paciente;
    //}

}
