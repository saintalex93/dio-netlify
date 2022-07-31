import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(users =>{
      this.users = users;
    })
  }

}
