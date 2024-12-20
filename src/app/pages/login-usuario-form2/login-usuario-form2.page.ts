import { PacienteRepository } from 'src/app/repository/paciente.repository';
import { SourceLocation } from './../../../../node_modules/@types/estree/index.d';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Paciente } from 'src/app/models/paciente';
import { CpfUtilValidator } from 'src/app/shared/validators/CpfUtilValidator';
import { idadeValidator } from 'src/app/shared/validators/validaIdade';

@Component({
  selector: 'app-login-usuario-form2',
  templateUrl: './login-usuario-form2.page.html',
  styleUrls: ['./login-usuario-form2.page.scss'],
})
export class LoginUsuarioForm2Page implements OnInit {

  pacienteDaDo!: Paciente;
  pacienteForm: FormGroup = this.fb.group({});;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private PacienteRepository: PacienteRepository,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.pacienteDaDo = this.recuperarInformacoesPacienteDaPaginaAnteriorDoFormulario();
    if(!this.pacienteDaDo){
      throw new Error('Erro ao tentar recuperar os dados do paciente');
    }

    this.pacienteForm = this.fb.group(
      {
      nome: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)] ],
      cpf: [null, [Validators.required, CpfUtilValidator.validate()]],
      telefone: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)] ],
      dataNascimento: [null, [ Validators.required, Validators.minLength(10), Validators.maxLength(10), idadeValidator()] ],
      email: [this.pacienteDaDo.email],
      senha: [this.pacienteDaDo.senha]
      });

  }

  async onSubmit(){
    if(this.pacienteForm.valid){
      const pacienteDado = this.pacienteForm?.value as Paciente;

      const data = await this.PacienteRepository.getPacienteByCPF(pacienteDado.cpf);

      if(data !== null){
        await this.presentAlert('erro', ' CPF já cadastrado.');
        throw new Error('CPF já cadastrado.');
      }

      this.router.navigate(['/login/novo-usuario-parte3'], { state:{ pacienteDado } })

    }else{
      this.marcarCamposInvalidosComoTocado(this.pacienteForm);
    }
  }

  recuperarInformacoesPacienteDaPaginaAnteriorDoFormulario(){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['paciente']){
      return navigation.extras.state?.['paciente'];
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
