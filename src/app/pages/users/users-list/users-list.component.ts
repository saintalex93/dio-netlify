import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.userService.setUserIndex(this.getUserIndex())
    },
      (err) => {
        Swal.fire(
          'Erro!',
          `Erro ao listar os usuários: ${err.name}`,
          'error'
        )
      })
  }

  getUserIndex():number{
    let user:User | undefined = this.users[this.users.length - 1] ;
    return user ? user.id : 1
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(response => {
      Swal.fire(
        'Sucesso!',
        `O Usuário foi deletado!`,
        'success'
      )
    },
      (err) => {
        Swal.fire(
          'Erro!',
          `Erro ao deletar o usuário: ${err.name}`,
          'error'
        )
      }, () => this.getUsers());
  }



}
