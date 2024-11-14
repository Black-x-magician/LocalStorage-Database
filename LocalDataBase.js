export class LocalDataBase {
  constructor (DbName,DefaultValue) {
    this.DbName = DbName;
    this.DefaultValue = [];
    this.DbValue = [];
    if (!localStorage.getItem(`${this.DbName}`)) {
      localStorage.setItem(`${this.DbName}`,this.DefaultValue);
      
      console.log(`LocalStorage with name ${this.DbName} doesn't exists. So, I've created one with the same name.`);
    }
    else{
       console.log(`LocalStorage with name ${this.DbName} does exists.`);
       let data = localStorage.getItem(`${this.DbName}`);
      let parsedData = JSON.parse(data)
      this.DbValue = parsedData;
      
    }
    
  };
  
  insertData = (data)=>{
    localStorage.setItem(`${this.DbName}`, JSON.stringify([...this.DbValue, {
      id: this.DbValue.length == 0?0:this.DbValue[this.DbValue.length-1].id+1,
      data
    }]));
    
  };
  
  getData = ()=>{ 
    if (!localStorage.getItem(`${this.DbName}`)) {
      console.log("You have no db created.");
      return [];
      
    } else {
       let data = localStorage.getItem(`${this.DbName}`);
      let parsedData = JSON.parse(data)
      this.DbValue = parsedData;
      return this.DbValue;
    }
   
  };
  
  updateData = (id,data)=>{
    
    if (!localStorage.getItem(`${this.DbName}`)) {
      return "You have no db created."
      
    } else {
       this.DbValue[id] = {id:id,data};
       localStorage.setItem(`${this.DbName}`,JSON.stringify(this.DbValue));
    }
  };
  
  
  deleteData = (id)=>{
    if (!localStorage.getItem(`${this.DbName}`)) {
      return "You have no db created."
    
    } else {
      this.DbValue = this.DbValue.filter((d) => {
        return d.id !== id;
      });
      this.callRealTime();
      
    }
    
    
  };
  
  callRealTime = ()=>{
    if (!localStorage.getItem(`${this.DbName}`)) {
      return "You have no db created."
    
    } else {
      localStorage.setItem(`${this.DbName}`,JSON.stringify(this.DbValue));
      let data = localStorage.getItem(`${this.DbName}`);
      let parsedData = JSON.parse(data)
      this.DbValue = parsedData;
      
    }
  }
}

