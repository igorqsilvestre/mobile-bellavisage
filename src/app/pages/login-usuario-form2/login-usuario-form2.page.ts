import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { Paciente } from 'src/app/models/paciente';
import { CpfUtilValidator } from 'src/app/shared/validators/CpfUtilValidator';
import { PacienteService } from 'src/app/services/paciente.service';

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
    private pacienteService: PacienteService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.pacienteDaDo = this.recuperarInformacoesPacienteDaPaginaAnteriorDoFormulario();
    if(!this.pacienteDaDo){
      throw new Error('Erro ao tentar recuperar os dados do paciente');
    }

    this.pacienteForm = this.fb.group(
      {
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: ['', [Validators.required, CpfUtilValidator.validate()]],
      telefone: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)] ],
      dataNascimento: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10)] ],
      email: [this.pacienteDaDo.email],
      senha: [this.pacienteDaDo.senha]
      });

  }

  async onSubmit(){
    if(this.pacienteForm.valid){
      const pacienteDado = this.pacienteForm?.value as Paciente;

      const data = await this.pacienteService.getPacienteByCPF(pacienteDado.cpf);

      if(data !== null){
        await this.presentAlert('erro', ' CPF já cadastrado.');
        throw new Error('CPF já cadastrado.');
      }

      const pacienteId = uuidv4();
      const paciente = new Paciente(
        pacienteId,
        pacienteDado.email,
        pacienteDado.senha,
        pacienteDado.nome,
        pacienteDado.cpf,
        pacienteDado.telefone,
        pacienteDado.dataNascimento
      );

      try {
        this.pacienteService.addPaciente(paciente);
        await this.presentAlert('sucesso', 'Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);

      } catch (error) {
        await this.presentAlert('erro', 'Ocorreu um erro ao realizar o cadastro.');
      }


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
