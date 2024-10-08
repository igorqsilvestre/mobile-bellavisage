import { PacienteRepository } from 'src/app/repository/paciente.repository';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-login-alterar-senha',
  templateUrl: './login-alterar-senha.page.html',
  styleUrls: ['./login-alterar-senha.page.scss'],
})
export class LoginAlterarSenhaPage implements OnInit {



  pacienteForm: FormGroup = this.fb.group({});;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private pacienteRepository: PacienteRepository,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group(
      {
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      senha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: ['', [Validators.required]]
      }, { validators: this.verificaSenhasIguais.bind(this) });
  }


  async onSubmit(){
    if (this.pacienteForm.valid) {
        const paciente = this.pacienteForm.value as Paciente;
        try {
            const data = await this.pacienteRepository.getPacienteByEmail(paciente.email);
            if (data) {
                await this.pacienteRepository.updatePacienteSenha(data, paciente.senha)
                await this.presentAlert('sucesso', 'Senha alterada com sucesso!');
                this.route.navigate(['/login']);
            } else {
                await this.presentAlert('erro', 'E-mail não encontrado.');
            }
        } catch (error) {
            await this.presentAlert('erro', 'Ocorreu um erro ao tentar alterar senha.');
        }
    } else {
        this.marcarCamposInvalidosComoTocado(this.pacienteForm);
    }
}

verificaSenhasIguais(formulario: FormGroup){
  const confirmaSenha = formulario.get('confirmarSenha');
  if(confirmaSenha?.dirty || confirmaSenha?.touched){
    const senha = formulario.get('senha')?.value;
    return senha === confirmaSenha.value ? false : { senhasDiferentes: true };
  }

  return false;
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
