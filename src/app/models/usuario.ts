export class Usuario {
    id!: number;
    nome!: string;
    email!: string;
    telefone!: string;
    senha?: string; 
    
    constructor(id: number, nome: string, email: string, telefone: string, senha?: string) {
      if (id > 0) this.id = id;
      this.nome = nome;
      this.email = email;
      this.telefone = telefone;
  
      if (senha) {
        this.senha = senha;
      }
    }
  }

