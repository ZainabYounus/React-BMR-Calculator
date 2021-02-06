import React, { Component } from 'react';
import './bmr.css';

class bmr extends Component {
    constructor(){
        super();
        this.state = {
            gender: '',
            weight: '',
            age: '',
            heightFeet: '',
            heightInches: '',
            activity: '',
            bmr: '',
            error: ''
        } 
    }

    handleGenderChange = (event) => {
        this.setState({
            gender : event.target.value
        })
    }

    handleAgeChange = (event) => {
        this.setState({
            age : event.target.value
        })
    }

    handleWeightChange = (event) => {
        this.setState({
            weight : event.target.value
        })
    }

    handleHeightFeetChange = (event) => {
        this.setState({
            heightFeet : event.target.value
        })
    }

    handleHeightInchesChange = (event) => {
        this.setState({
            heightInches : event.target.value
        })
    }

    handleActivityChange = (event) => {
        this.setState({
            activity : event.target.value
        })
    }

    calculateBMR(){
        let age = this.state.age;
        let gender = this.state.gender;
        let heightFeet = this.state.heightFeet;
        let heightInches = this.state.heightInches;
        let weight = this.state.weight;

        if(age == '' || gender == '' || heightFeet == '' || heightInches == '' || weight == ''){
            this.setState({error: 'All fields are required!'})
            return;
        }

/* BMR calculation (imperial): 
 Man BMR = 66 + ( 6.2 × weight in pounds ) + ( 12.7 × height in inches ) – ( 6.76 × age in years )
 Woman BMR = 655.1 + ( 4.35 × weight in pounds ) + ( 4.7 × height in inches ) - ( 4.7 × age in years )
*/
        let bmrCalc = '';
        let height = ((heightFeet * 30.48) + (heightInches * 2.54));

        if(gender == 2){
            //Calculation of Male BMR
            bmrCalc = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
        }else if(gender == 1){
            //Calculation of Female BMR
            bmrCalc = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
        }
        this.setState({bmr: bmrCalc});

        this.setState({error: ''})
        console.log(this.state.weight);
    }

    render() {

        let error;
        if(this.state.error){
            error = <div className = "error">{this.state.error}</div>
        }

        let resultBMR;
        if(this.state.bmr){
            resultBMR = <div className = "result">{this.state.bmr}</div>
        }

        return (
            <div id="bmrcalc">
                <div className="form">
                    <h2>BMR &amp; Daily Calorie Calculator</h2>
                    {error}
                    <div className="inputwrap">
                        <label className="label">Gender</label>
                        <label><input type="radio" className="genderF" chechked = {this.state.gender ==="1"} onChange={this.handleGenderChange} name="gender" value="1" />Female</label>
                        <label><input type="radio" className="genderM" chechked = {this.state.gender ==="2"} onChange={this.handleGenderChange} name="gender" value="2" />Male</label>
                    </div>
                    <div className="inputwrap">
                        <label className="label">Weight in Pounds</label>
                        <input type="number" value = {this.state.weight} onChange={this.handleWeightChange}  name="weight" className="weight" min="0" max="999" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">Height in feet and inches</label>
                        <input type="number" value = {this.state.heightFeet} onChange={this.handleHeightFeetChange}  name="heightFeet" className="heightFeet" min="0" max="8" />
                        <input type="number" value = {this.state.heightInches} onChange={this.handleHeightInchesChange} name="heightInches" className="heightInches" min="0" max="11" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">Age in years</label>
                        <input type="number" value = {this.state.age} onChange={this.handleAgeChange} className="age" name="age" min="0" max="120" />
                    </div>
                    <button type="button" onClick = {() => this.calculateBMR()}>Calculate BMR</button>
                    {resultBMR}
                    <div className="workout">
                        <div className="inputwrap">
                            <label className="label">Workout in a Week</label>
                            <select className="activity" value = {this.state.activity} onChange={this.handleActivityChange} name="activity">
                                <option value="">Select your Activity</option>
                                <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                                <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                                <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                                <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                                <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
                            </select>
                        </div>
                        <button type="button">Calculate Calories</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default bmr;