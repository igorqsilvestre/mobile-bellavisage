import { PacienteRepository } from './../../repository/paciente.repository';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  pacienteForm: FormGroup = this.fb.group({});;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private PacienteRepository: PacienteRepository,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group(
      {
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      });
  }


  async onSubmit(){
    if (this.pacienteForm.valid) {
        const paciente = this.pacienteForm.value as Paciente;
        try {
            const data = await this.PacienteRepository.getPacienteByEmailAndSenha(paciente.email, paciente.senha);
            if (data) {
                await this.presentAlert('sucesso', 'Login realizado com sucesso!');
                this.route.navigate(['/tabs/tab1'], { state:{data}} );
            } else {
                await this.presentAlert('erro', 'Usuário ou senha inválida.');
            }
        } catch (error) {
            await this.presentAlert('erro', 'Ocorreu um erro ao tentar fazer o login.');
        }
    } else {
        this.marcarCamposInvalidosComoTocado(this.pacienteForm);
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

}
