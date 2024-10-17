import { Cep, ConsultaCepService } from './../../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/guards/auth.service';
import { Paciente } from 'src/app/models/paciente';
import { PacienteUpdate } from 'src/app/models/paciente-update';
import { PacienteRepository } from 'src/app/repository/paciente.repository';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { PacienteCompartilhadoService } from 'src/app/shared/services/paciente-compartilhado.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  naoQuerAlterarEmail = true;
  naoQuerAlterarTelefone = true;
  naoQuerVisualizarEndereco = true;
  naoQuerAtualizarEndereco = true;
  naoQuerAlterarSenha = true;
  paciente!:Paciente | null;

  pacienteFormEmail: FormGroup = this.fb.group({});;
  pacienteFormTelefone: FormGroup = this.fb.group({});;
  pacienteFormCep: FormGroup = this.fb.group({});;
  pacienteFormSenha: FormGroup = this.fb.group({});;


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private pacienteRepository: PacienteRepository,
    private pacienteCompartilhadoService: PacienteCompartilhadoService,
    private alertController: AlertController,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService,
    private authService: AuthService,
  ) {}


  ngOnInit(): void {

    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente){
      this.paciente = paciente;
    }
    this.pacienteFormEmail = this.fb.group(
      {
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],}
    );
    this.pacienteFormTelefone = this.fb.group(
      {
        telefone: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]]}
    );
    this.pacienteFormCep = this.fb.group(
      {
        cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]*$/)]]}
    );
    this.pacienteFormSenha = this.fb.group(
      {
       senha: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]}
    );
  }


  async onSubmitEmail(){
    if(this.pacienteFormEmail.valid){
      const pacienteUpdate = this.pacienteFormEmail.value as PacienteUpdate;
      //Atualiza o e-mail
      if(this.paciente && pacienteUpdate.email && this.paciente.id){
        try{
          const data = await this.pacienteRepository.getPacienteByEmail(pacienteUpdate.email);
          if(!data){
            await this.operacaoParaAtualizar(this.paciente.id, pacienteUpdate, "E-mail alterado com sucesso.");
          }else{
            await this.presentAlert('erro', 'E-mail já existe no sistema.');
          }
        }catch(error){
          await this.presentAlert('erro', 'Ocorreu um erro ao atualizar o e-mail.');
        }
      }
    }
  }

  async onSubmitTelefone(){
    if(this.pacienteFormTelefone.valid){
      const pacienteUpdate = this.pacienteFormTelefone.value as PacienteUpdate;
      //Atualiza o telefone
      if(this.paciente && pacienteUpdate.telefone && this.paciente.id){
        try{
          await this.operacaoParaAtualizar(this.paciente.id, pacienteUpdate, "Telefone alterado com sucesso");
        }catch(error){
          await this.presentAlert('erro', 'Ocorreu um erro ao alterar o telefone.');
        }
      }
    }
  }

  async onSubmitCep() { // Corrigido para async
    if (this.pacienteFormCep.valid) { // Verifica se o formulário é válido
      const cep = this.pacienteFormCep.value.cep; // Obtém o CEP do formulário
      // Atualiza o telefone e CEP
      if (this.paciente && cep && this.paciente.id) {
        try {
          const endereco = await this.onBuscaCep(cep); // Aguarda a busca do CEP
          if (endereco) {
            // Chama a operação para atualizar o endereço
            await this.operacaoParaAtualizar(this.paciente.id, endereco, "Endereço alterado com sucesso");
          }
        } catch (error) {
          await this.presentAlert('erro', 'Ocorreu um erro ao alterar o endereço.');
        }
      }
    }
}

async onSubmitSenha(){
  if(this.pacienteFormSenha.valid){
    const pacienteUpdate = this.pacienteFormSenha.value as PacienteUpdate;
    //Atualiza a senha
    if(this.paciente && pacienteUpdate.senha && this.paciente.id){
      try{
        await this.operacaoParaAtualizar(this.paciente.id, pacienteUpdate, "Senha alterada com sucesso");
      }catch(error){
        await this.presentAlert('erro', 'Ocorreu um erro ao alterar a senha.');
      }
    }
  }
}

  private async operacaoParaAtualizar(id:number, pacienteUpdate: PacienteUpdate, mensagemSucesso:string){
    await this.pacienteRepository.updatePacienteParcialmente(id, pacienteUpdate);
    await this.presentAlert('sucesso', mensagemSucesso);
    await this.atualizarRepositorioLocalAuxiliar(id);
    this.route.navigate(['/tabs/tab3']).then(() => {
      window.location.reload();  // Força um recarregamento completo
    })
  }


  private async atualizarRepositorioLocalAuxiliar(id: number) {
    if(id){
      const paciente = await this.pacienteRepository.getPacienteById(id);
      this.pacienteCompartilhadoService.setPaciente(paciente);
    }
  }

  deslogar(){
    this.authService.realizarLogout();
    this.pacienteCompartilhadoService.clearPaciente();
    this.route.navigate(['']).then(() => {
      window.location.reload();  // Força um recarregamento completo
    });
  }



  ionViewDidEnter() {
    if(!this.paciente){
      const paciente = this.pacienteCompartilhadoService.getPaciente();
      this.paciente = paciente;
    }
  }

  // Método ajustado para buscar o CEP e retornar o objeto de endereço
  private async onBuscaCep(cep: string): Promise<any> {
    if (cep) {
      try {
        const dados = await this.cepService.consultaCEP(cep).toPromise(); // Convertendo para Promise
        if (dados) {
          const endereco = await this.pegaDadosCep(cep, dados); // Esperando o retorno do método que pega os dados do CEP
          return endereco;
        } else {
          await this.presentAlert('erro', 'Erro ao buscar o CEP!');
          return null; // Retornando null em caso de erro
        }
      } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        await this.presentAlert('erro', 'Erro ao buscar o CEP!');
        return null;
      }
    }
    return null;
  }

  // Método ajustado para pegar os dados do CEP e retornar o endereço
  private async pegaDadosCep(cep:string, dados: Cep): Promise<any> {
    try {
      const estado = await this.dropdownService.getEstadoBySigla(dados.uf).toPromise(); // Convertendo para Promise
      return {
        endereco: {
          cep: cep,
          logradouro: dados.logradouro,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: estado.nome
        }
      };
    } catch (error) {
      console.error('Erro ao buscar o estado:', error);
      throw error; // Propaga o erro para que o chamador saiba o que aconteceu
    }
  }


  campoEstaInvalido(campo: string, formulario: FormGroup<any>): boolean{
    const control = formulario.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  async presentAlert(tipo: 'sucesso' | 'erro', mensagem: string) {
    const alert = await this.alertController.create({
      header: tipo === 'sucesso' ? 'Sucesso' : 'Erro',
      message: mensagem,
      buttons: ['OK'],
      cssClass: 'custom-alert '
    });

    await alert.present();
    return await alert.onDidDismiss();
  }

  mudarStatusAlterarEmail(){
    this.naoQuerAlterarEmail = !this.naoQuerAlterarEmail;
  }

  mudarStatusAlterarTelefone(){
    this.naoQuerAlterarTelefone = !this.naoQuerAlterarTelefone;
  }

  mudarStatusVisualizarEndereco(){
    this.naoQuerVisualizarEndereco = !this.naoQuerVisualizarEndereco;
  }

  mudarStatusAlterarEndereco(){
    this.naoQuerAtualizarEndereco = !this.naoQuerAtualizarEndereco;
  }

  mudarStatusAlterarSenha(){
    this.naoQuerAlterarSenha = !this.naoQuerAlterarSenha;
  }
}


