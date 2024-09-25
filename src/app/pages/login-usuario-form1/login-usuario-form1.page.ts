import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario-form1',
  templateUrl: './login-usuario-form1.page.html',
  styleUrls: ['./login-usuario-form1.page.scss'],
})
export class LoginUsuarioForm1Page implements OnInit {

  pacienteForm: FormGroup = this.fb.group({});;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.pacienteForm = this.fb.group(
      {
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      senha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmarSenha: ['', Validators.required]
      }, { validators: this.verificaSenhasIguais.bind(this) });
  }

  onSubmit(){
    if(this.pacienteForm.valid){
      const paciente = this.pacienteForm.value;
      this.router.navigate(['/login/novo-usuario-parte2'], { state:{ paciente } })

    }else{
      this.marcarCamposInvalidosComoTocado(this.pacienteForm);
    }
  }

  campoEstaInvalido(campo: string): boolean{
    const control = this.pacienteForm.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  verificaSenhasIguais(formulario: FormGroup){
    const confirmaSenha = formulario.get('confirmarSenha');
    if(confirmaSenha?.dirty || confirmaSenha?.touched){
      const senha = formulario.get('senha')?.value;
      return senha === confirmaSenha.value ? false : { senhasDiferentes: true };
    }

    return false;
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

}
