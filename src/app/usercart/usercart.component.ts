import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  userCartObj;
  products=[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
   
    this.userService.dataObservable.subscribe(
      res=>{

       
        if(res["message"]==='Cart-empty'){
          alert("User cart is empty")
        }
        else{
          
            this.products=res["products"]
          
        }
      },
      err=>{
        console.log("err in reading cart",err)
        alert("Something went wrong in fetching cart items..")
      }
    )
  }

}