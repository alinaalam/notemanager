import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

// accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

import './main.html';
//
Template.body.helpers({
  // notes: [
  //   { text: 'My Note 1' },
  //   { text: 'My Note 2' },
  //   { text: 'My Note 3' }
  // ]

  notes() {
    return Notes.find({});
  }
});

//attaching events with 'add' template
Template.add.events({
  'submit .add-form': function(event) {
    //stop form from being submitted to some other file
    event.preventDefault();

    //get input value
    const target = event.target;
    const text = target.text.value;

    //create a new note and add it into the collection
    //commenting the code snippet below and calling server side functionality
    Meteor.call('notes.insert', text);
    // Notes.insert({
    //   text, //text: text
    //   createdAt: new Date(),
    //   owner: Meteor.userId(),
    //   username: Meteor.user().username,
    // });

    //clear the form
    target.text.value = "";

    //close the modal
    $("#addModal").modal('close');

    return false;
  }
});

//attaching events with 'note' Template
Template.note.events({
  'click .delete-note': function(event) {
    event.preventDefault();
    //commenting the code snippet below and calling server side functionality
    Meteor.call('notes.remove', this);
    //Notes.remove(this._id);
    return false;
  }
});
