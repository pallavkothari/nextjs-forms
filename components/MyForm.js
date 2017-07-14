import React from 'react';
import axios from 'axios';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            errorLabel: "",
            errorLabelHidden: true,
            list: []
        };
    }


    onChange = (e) => {
        // Because we named the inputs to match their corresponding values in state, it's
        // super easy to update the state

        // console.log(`${e.target.name} = ${e.target.value}`);
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const {token, list, errorLabel} = this.state;

        axios.post('https://httpbin.org/post', {token: token})
            .then((response) => {
                //access the resp here....
                var payload = JSON.stringify(response.data.json, null, 2);
                console.log(`response fetched. ${payload}`);
                this.setState({
                    token: "",
                    errorLabelHidden: true,
                    list: this.state.list.concat([payload])
                });

            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    errorLabelHidden: false,
                    errorLabel: "OOPS that didn't work :(",
                    list: this.state.list.concat([payload])
                });
            });
    }


    render() {

        const {token, list, errorLabel} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label for="token">token:</label>
                    <input type="text" name="token" value={token} onChange={this.onChange}/>
                    <button type="submit">Submit</button>
                </form>

                <div><span hidden>{errorLabel}</span></div>
                <div>
                    <ol>
                        {
                            list.map((item) => (
                                <li>{item}</li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}
