import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SQLiteService } from '../services/sqlite.service';

import { createSchema, twoUsers, twoUsers2, twoTests } from '../utils/no-encryption-utils';//tables prepared in this file
import { createSchemaContacts, setContacts } from '../utils/encrypted-set-utils';
import { deleteDatabase } from '../utils/db-utils';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-zhome',
  templateUrl: './zhome.page.html',
  styleUrls: ['./zhome.page.scss'],
})
export class ZhomePage implements OnInit {

  detail: boolean = false;
  sqlite: any;
  platform: string;
  handlerPermissions: any;
  initPlugin: boolean = false;

  allusers:Array<object> = [];
  userM = {
    email:"",
    name:""
  };
  db:any = null
  constructor(private _sqlite: SQLiteService,private loadingCtrl: LoadingController) {}

  ngOnInit() {
  }

  async ngAfterViewInit() {
    try {
      await this.runTest();
    } catch (err) {
    }
  }

  async runTest(): Promise<void> {
    // initialize the connection
    this.db = await this._sqlite.createConnection("testNew", false, "no-encryption", 1);

    // check if the databases exist 
    // and delete it for multiple successive tests
    //await deleteDatabase(db);

    // open db testNew
    await this.db.open();
    //alert(this._sqlite.getStorage("init"))
   let ret : any = null;
   // create tables in db
   ret = await this.db.execute(createSchema);
    // create synchronization table 
    ret = await this.db.createSyncTable();
   
    if(this._sqlite.getStorage("init") == null){
      this._sqlite.setStorage("init","1");
      //alert(twoUsers);
      // add two users in db
      ret = await this.db.execute(twoUsers);
    }
    /*
    alert("after towUsers");
    let tu2 = "INSERT INTO users (id,name,email,age) VALUES ('3','aaa','aaa@gmail.com','66')";
    alert(tu2)
    ret = await db.execute(tu2).then(e=>{alert("tu2 ok")}).catch(e=>{alert("tu2"+e)});
    
    tu2 = "INSERT INTO users (id,name,email,age) VALUES ('4','aaa','aaa@gmail.com','66')";
    alert(tu2)
    ret = await db.execute(tu2).then(e=>{alert("tu2 ok")}).catch(e=>{alert("tu2"+e)});

    alert("after towUsers2")*/

    // select all users in db
    ret = await this.db.query("SELECT * FROM users;");
    this.allusers = ret.values.reverse();
    //for(let entry of ret.values)alert(entry["id"]+" : "+entry["name"])
  }

  async ngOnDestroy(){
    await this._sqlite.closeAllConnections();
  }

  reset():void{
    this._sqlite.removeStorage("init");
  }

  async addOneUser(){
    console.log(this.userM);
    const loading = await this.loadingCtrl.create();
    await loading.present();//loading.dismiss();

    let ret:any = await this.db.query("SELECT * FROM users;");
    let n:number = ret.values.length;
    n++;
    let query:string = "INSERT INTO users (name,email) VALUES ('"+this.userM.name+"','"+this.userM.email+"')";
    await this.db.execute(query);
    ret = await this.db.query("SELECT * FROM users;");
    n = ret.values.length;
    this.allusers = ret.values.reverse();
    this.userM = {
      email:"",
      name:""
    };

    loading.dismiss();
  }

  async deleteOneUser(key:number){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    let query:string = "DELETE FROM users WHERE id = '"+this.allusers[key]["id"]+"'";
    await this.db.execute(query);
    this.allusers.splice(key,1);

    loading.dismiss();
  }

}
