import { AuthService } from './../../guards/auth.service';
import { AuthGuard } from './../../guards/auth.guard';
import { PacienteRepository } from './../../repository/paciente.repository';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  loginForm: FormGroup = this.fb.group({});;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private pacienteRepository: PacienteRepository,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      });
  }


  async onSubmit(){
    if (this.loginForm.valid) {
        const login = this.loginForm.value as Login;
        try {
            const pacienteExiste = await this.pacienteRepository.verificaCredenciaisLogin(login);
            if (pacienteExiste) {
                const paciente = await this.pacienteRepository.getPacienteByEmail(login.email);
                if(paciente){
                  this.authService.realizarLogin();
                  await this.presentAlert('sucesso', 'Login realizado com sucesso!');
                  this.route.navigate(['/tabs/tab1'], { state:{paciente}} );
                }
            } else {
                await this.presentAlert('erro', 'Usuário ou senha inválida.');
            }
        } catch (error) {
            await this.presentAlert('erro', 'Ocorreu um erro ao tentar fazer o login.');
        }
    } else {
        this.marcarCamposInvalidosComoTocado(this.loginForm);
    }
}


  campoEstaInvalido(campo: string): boolean{
    const control = this.loginForm.get(campo);
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
