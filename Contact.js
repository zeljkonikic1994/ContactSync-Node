
function Contact(user,contact_id,name,phoneNumber){
    this.user_id=user._id;
    this.contact_id=contact_id;
    this.name=name;
    this.phoneNumber = phoneNumber;

}

module.exports = Contact;