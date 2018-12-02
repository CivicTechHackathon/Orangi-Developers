import React, { Component } from 'react';
import firebase from '../../Config/Firebase'
import ExpansionPanel from '../../Components/Constants/ExpansionPannel'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});

const ranges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51-100',
        label: '51 to 100',
    },
];

class UserDashboard extends Component {
    constructor() {
        super()
        this.state = {
            amount: '',
            users: null,
            allData: []
        }
    }

    componentDidMount = () => {
        const { amount } = this.state
        // console.log(amount)
        let uid = localStorage.getItem('uid')
        firebase.database().ref(`/users/`).on('child_added', snap => {
            // console.log(snap.val())
            var users = snap.val()
            // var childKey = snap.key
            // console.log(childKey)
            for (var key in users) {
                users = users[key]
                users.childKey = key
                // console.log(users)

                this.setState({ users })
            }
        })
        this.fetchUsersData()
    }

    fetchUsersData = () => {
        const { allData } = this.state
        firebase.database().ref(`/Admin/`).on('child_added', snap => {
            var data = snap.val()
            for(var key in data) {
                data = data[key]
                allData.push(data)
                this.setState({allData})
            }
        })
    }

    render() {
        const { users, allData } = this.state
        return (
            <div className="App">
                <h1>User Dashboard</h1>
                {users && <ExpansionPanel allData={allData} />}
            </div>
        );
    }
}

export default UserDashboard;