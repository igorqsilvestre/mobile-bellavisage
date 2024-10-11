import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Paciente } from 'src/app/models/paciente';
import { PacienteRepository } from 'src/app/repository/paciente.repository';
import { Cep, ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-login-usuario-form3',
  templateUrl: './login-usuario-form3.page.html',
  styleUrls: ['./login-usuario-form3.page.scss'],
})
export class LoginUsuarioForm3Page implements OnInit {

  pacienteDaDo!: Paciente;
  pacienteForm: FormGroup = this.fb.group({});;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private pacienteRepository: PacienteRepository,
    private alertController: AlertController,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService,
  ) { }

  ngOnInit() {
    this.pacienteDaDo = this.recuperarInformacoesPacienteDaPaginaAnteriorDoFormulario();
    if(!this.pacienteDaDo){
      throw new Error('Erro ao tentar recuperar os dados do paciente');
    }

    this.pacienteForm = this.fb.group(
    {
      nome: [this.pacienteDaDo.nome],
      cpf: [this.pacienteDaDo.cpf],
      telefone: [this.pacienteDaDo.telefone],
      dataNascimento: [this.pacienteDaDo.dataNascimento ],
      email: [this.pacienteDaDo.email],
      senha: [this.pacienteDaDo.senha],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8),Validators.pattern(/^[0-9]*$/)]],
        numero: ['', Validators.pattern(/^[0-9]*$/)],
        complemento: [''],
        bairro: ['', Validators.required],
        logradouro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
      }),
    });

  }

  async onSubmit(){
    if(this.pacienteForm.valid){
      const pacienteDado = this.pacienteForm?.value as Paciente;

      const paciente = new Paciente(
        pacienteDado.email,
        pacienteDado.senha,
        pacienteDado.nome,
        pacienteDado.cpf,
        pacienteDado.telefone,
        new Date(pacienteDado.dataNascimento),
        pacienteDado.endereco
      );

      try {
        this.pacienteRepository.addPaciente(paciente);
        await this.presentAlert('sucesso', 'Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);

      } catch (error) {
        await this.presentAlert('erro', 'Ocorreu um erro ao realizar o cadastro.');
      }


    }else{
      this.marcarCamposInvalidosComoTocado(this.pacienteForm);
    }
  }

  onBuscaCep(){
    const campoCep = this.pacienteForm.get('endereco.cep');
    if(campoCep && campoCep.valid){
      this.cepService.consultaCEP(campoCep.value).subscribe(async dados => {
      if(dados){
        this.insereDadosEndereco(dados);
      }else{
        await this.presentAlert('erro', 'Erro ao buscar o cep!');
      }
      })
    }
  }

  insereDadosEndereco(dados:Cep){
    this.dropdownService.getEstadoBySigla(dados.uf).subscribe(estado => {
      this.pacienteForm.patchValue({
        endereco: {
          logradouro: dados.logradouro,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: estado.nome
        }
      })
    });
  }

  recuperarInformacoesPacienteDaPaginaAnteriorDoFormulario(){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['pacienteDado']){
      return navigation.extras.state?.['pacienteDado'];
    }
  }

  campoEstaInvalido(campo: string): boolean{
    const control = this.pacienteForm.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }


  marcarCamposInvalidosComoTocado(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control && control.invalid){
        control.markAsTouched({onlySelf: true});
      }
      if (control instanceof FormGroup) {
        this.marcarCamposInvalidosComoTocado(control);
      }
    })
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

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }
}
