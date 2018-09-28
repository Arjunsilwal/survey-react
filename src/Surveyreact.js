import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
  apiKey: "AIzaSyCSgIIY0VxF_DOOBAdlvKkaNKmGdDf5pVo",
  authDomain: "survey-react-f7347.firebaseapp.com",
  databaseURL: "https://survey-react-f7347.firebaseio.com",
  projectId: "survey-react-f7347",
  storageBucket: "survey-react-f7347.appspot.com",
  messagingSenderId: "555476236683"
};
firebase.initializeApp(config);

class Surveyreact extends Component {
  constructor(props){
    super(props);
    this.state={
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted: false
    };
    this.nameSubmit= this.nameSubmit.bind(this);
    this.answerSelected= this.answerSelected.bind(this);
    this.questionSubmit= this.questionSubmit.bind(this);
  }
  questionSubmit(){
firebase.database().ref('Surveyreact/'+ this.state.uid).set({
  studentName: this.state.studentName,
  answers: this.state.answers
});
this.setState({isSubmitted: true});
  }

  answerSelected(event){
 var answers = this.state.answers;
 if(event.target.name==='answer1'){
   answers.answer1 = event.target.value;
 } else if(event.target.name==='answer2'){
   answers.answer2 = event.target.value;
 } else if(event.target.name=== 'answer3'){
   answers.answer3 = event.target.value;
 }
 this.setState({answers: answers}, function(){
   console.log(this.state);
 })
  }

  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state);
    });
  }
  render(){
    let studentName;
    let questions;

    if(this.state.studentName==='' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hello student, what is your name?</h1>
        <form onSubmit={this.nameSubmit}>
          <input className='stud' type='text' placeholder='your name' ref='name' />
        </form>
      </div>;
      questions = '';
    } else if(this.state.studentName!== '' && this.state.isSubmitted === false){
      studentName = <h1> welcome to react Survey, {this.state.studentName} </h1>;
        questions = <div>
          <h2>Here are some questions: </h2>
          <form onSubmit={this.questionSubmit}>
            <div className = "card">
              <label>What kind of courses you like the most: </label><br />
              <input type="radio" name="answer1" value="Technnology" onChange={this.answerSelected} />Technology
              <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
              <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
            </div>
            <div className = "card">
              <label>you are a: </label><br />
              <input type="radio" name="answer2" value="student" onChange={this.answerSelected} />student
              <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} />in-job
              <input type="radio" name="answer2" value="looking-for-job" onChange={this.answerSelected} />looking-for-job
            </div>
            <div className = "card">
              <label>Is reactDocs is helpful: </label><br />
              <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} />yes
              <input type="radio" name="answer3" value="no" onChange={this.answerSelected} />no
              <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} />maybe
            </div>
            <input className="feedback-button" type="submit" value="submit" />
          </form>
        </div>
    } else if(this.state.isSubmitted=== true && this.state.studentName !== ''){
      studentName = <h1> Thanks, {this.state.studentName} </h1>
    }



    return(
      <div>
        {studentName}
        --------------------------------------
        {questions}
      </div>
    );
  }
}

export default Surveyreact;
