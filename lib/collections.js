import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'; //to check the datatypes

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'(text) {
    check(text, String);

    //check if user is logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(), //gives us the id of the current logged in user
      username: Meteor.user().username
    });
  },

  'notes.remove'(note) {
    check(note._id, String);

    if(note.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Notes.remove(note._id);
  }
});
