
export interface AuditReport {
  tabela: string;
  id: number;
  nome: string;
  email: string | null;
  telefone: string | null;
  dataCriacao: string; 
  dataModificacao: string;
  criadoPor: string | null;
  modificadoPor: string | null;
}
