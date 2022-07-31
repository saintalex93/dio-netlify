import { User } from './../../../models/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      id: 0,
      name: '',
      lastName: '',
      age: '',
      profession: ''
    })
  }

  ngOnInit(): void {
  }

  createUser() {
    this.userForm.get('id')?.patchValue(this.userService.getUserIndex() + 1)
    this.userService.createUser(this.userForm.value).subscribe(result => {
      Swal.fire(
        'Sucesso!',
        `O Usuário foi cadastrado!`,
        'success'
      )
      this.userService.setUserIndex(this.userService.getUserIndex() + 1)
    })
  }

}
