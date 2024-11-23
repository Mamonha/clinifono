import { Consultaspormesdto } from "./consultaspormesdto";
import { Consultasporpacientedto } from "./consultasporpacientedto";

export class Consultadashboarddto {

    totalConsultas!: number;
    consultasConfirmadas!: number;
    consultasCanceladas!: number;
    consultasPorPaciente!: Consultasporpacientedto[];
    consultasPorMes!: Consultaspormesdto[]; 
}
