import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup
  userId: any = ''
  constructor(private fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.userForm = this.fb.group({
      id: 0,
      name: '',
      lastName: '',
      age: '',
      profession: ''
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id')
    })

    if (this.userId !== null) {
      this.userService.getUser(this.userId).subscribe(result => {
        this.userForm.patchValue({
          id: result[0].id,
          name: result[0].name,
          lastName: result[0].lastName,
          age: result[0].age,
          profession: result[0].profession
        })
      })
    }
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.userService.getUserIndex() + 1)
    this.userService.createUser(this.userForm.value).subscribe(result => {
      Swal.fire(
        'Sucesso!',
        `O Usuário foi cadastrado!`,
        'success'
      )
      this.userService.setUserIndex(Number(this.userService.getUserIndex()) + 1)
    }, (err) => {
      Swal.fire(
        'Erro!',
        `Erro ao criar o usuário: ${err.name}`,
        'error'
      )
    }, () => this.router.navigate(['/'])
    )
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(response => {
      Swal.fire(
        'Sucesso!',
        `O Usuário foi atualizado!`,
        'success'
      )
    }, (err) => {
      Swal.fire(
        'Erro!',
        `Erro ao atualizar o usuário: ${err.name}`,
        'error'
      )
    }, () => this.router.navigate(['/']))
  }

  actionUserEvent() {
    if (this.userId !== null) {
      this.updateUser()
    }
    else {
      this.createUser();
    }
  }

}
