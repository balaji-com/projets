import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
  providers:[ DataService ]
})
export class ShoppinglistComponent implements OnInit {


shoppingitemlist : Item[] = [];
toggleflag:boolean=true;
selecteditem :Item;
  constructor(private dataservice:DataService) { }

getitems(){
  this.dataservice.getshoppingitems().subscribe(res=>{
    this.shoppingitemlist = res;
    // console.log('data from dataservice' +this.shoppingitemlist[0].itemname);
  })
}

additem(from){
  console.log(from.value);
   let newitem: Item = {
     itemname:from.value.itemname
   }
   this.dataservice.addshoppinglist(newitem).subscribe(res =>{
     console.log(res);
     this.getitems();
   });
}


deleteitem(id){
  this.dataservice.deleteshoppinglist(id).subscribe(res=>{
    if(res.n == 1){
      for(var i=0;i<this.shoppingitemlist.length;i++){
        if(id == this.shoppingitemlist[i]._id){
          this.shoppingitemlist.splice(i,1);
        }
      }
    }
  })
}


showitem(item){
  this.selecteditem = item;
  this.toggleflag = !this.toggleflag;
}


edititem(item){
  let newitem:Item = {
  _id:this.selecteditem._id,
  itemname:item.value.itemname
}
this.dataservice.editshoppinglist(newitem).subscribe(result => {
   console.log('origional itemto be update'+result);
   this.getitems();
});
this.toggleflag = !this.toggleflag;
}
  ngOnInit() {
    this.getitems();
  }



}
