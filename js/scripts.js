// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
};
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  };
  return false;
};
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  };
  delete this.contacts[id];
  return true;
};
AddressBook.prototype.updateContact = function(id, contact) {
  if (this.contacts[id] != undefined) {
    this.contacts[id].firstName = contact.firstName;
    this.contacts[id].lastName = contact.lastName;
    this.contacts[id].phoneNumber = contact.phoneNumber;
    this.contacts[id].email = contact.email;
  };
};
// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, workEmail, address, workAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.workEmail = workEmail;
  this.address = address;
  this.workAddress = workAddress;

};
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// ($(this).val().length === 0)



// function Address(street, city, state, zip) {
//   this.street = street;
//   this.city = city;
//   this.state = state;
//   this.zip = zip;
// };
// Address.prototype.fullAddress = function() {
//   return this.street + "\n" + this.city + ", " + this.state + " " + this.zip;
// };

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};
// REFACTOR HTML TO ONLY MAKE ONE DOM QUERY
function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  if (contact.workAddress === "") {
    $("#work-address").hide();
  } else {
    $(".work-address").html(contact.workAddress);
  };
  if (contact.phoneNumber === "") {
    $("#phone-number").hide();
  } else {
    $(".phone-number").html(contact.phoneNumber);
  };
  if (contact.email === "") {
    $("#email").hide();
  } else {
    $(".email").html(contact.email);
  };
  if (contact.workEmail === "") {
    $("#work-email").hide();
  } else {
    $(".work-email").html(contact.workEmail);
  };
  if (contact.address === "") {
    $("#address").hide();
  } else {
    $(".address").html(contact.address);
  };
  if (contact.fullName() === " ") {
    $("#name").hide();
  } else {
    $(".name").html(contact.fullName());
  };
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + +contact.id + ">Delete</button>");
};
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};
$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedWorkEmail = $("input#new-work-email").val();
    const inputtedAddress = $("input#new-address").val();
    const inputtedWorkAddress = $("input#new-work-address").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-work-email").val("");
    $("input#new-address").val("");
    $("input#new-work-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedWorkEmail, inputtedAddress, inputtedWorkAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});