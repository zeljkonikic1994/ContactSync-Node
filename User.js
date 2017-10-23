function User(name,lastname,email,password){
    this.name=name;
    this.lastname=lastname;
    this.email=email;
    this.password=password;
    this.devices=[];
}

module.exports = User;