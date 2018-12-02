import React, { Component } from 'react';
import firebase from '../../Config/Firebase'
import {
    Button,
    TextField,
    FormControl,
    ListItem,
    ListItemText,
    Avatar,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableCell,
    TableHead,
    IconButton,
    Icon,
    Badge
} from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import green from '@material-ui/core/colors/green';
import SentNotification from '../SentNotification'

function TabContainer(props) {
    const { children, dir } = props;

    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
    },
});

class Messages extends Component {
    constructor() {
        super()
        this.state = {
            value: 0,
            allUsersArr: [],
            sendingForm: false,
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    componentWillMount() {
        const { allUsersArr } = this.state
        firebase.database().ref('/users/').on('child_added', (snapShot) => {
            var users = snapShot.val()
            for (var key in users) {
                var allUsers = users[key]
                // console.log(allUsers)
                allUsersArr.push(allUsers)
                this.setState({ allUsersArr })
            }

        })
    }

    renderDashboard() {
        const { allUsersArr } = this.state;
        const { classes, theme } = this.props;
        // const transitionDuration = {
        //     enter: theme.transitions.duration.enteringScreen,
        //     exit: theme.transitions.duration.leavingScreen,
        // };

        const fabs = [
            {
                color: 'primary',
                icon: <AddIcon />,
            },
            // {
            //     color: 'secondary',
            //     icon: <EditIcon />,
            // },
            // {
            //     color: 'inherit',
            //     icon: <UpIcon />,
            // },
        ];
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Users" />
                        <Tab label="Investers" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer><Paper >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Fundings</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUsersArr.map((value, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{value.userName}</TableCell>
                                            <TableCell>{value.taxAmount}</TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </Paper></TabContainer>
                    <TabContainer >Item Two</TabContainer>
                </SwipeableViews>
                <IconButton onClick={() => {this.setState({ sendingForm: true})}}>
                {fabs.map((fab, index) => (
                    <Zoom
                    
                        in={this.state.value === index}
                        // timeout={transitionDuration}
                        // style={{
                        //   transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
                        // }}
                        unmountOnExit
                    >
                        <Fab color={fab.color}>
                            {fab.icon}
                        </Fab>
                    </Zoom>
                ))}</IconButton>
            </div>
        )
    }


    render() {
        const { allUsersArr, sendingForm } = this.state;
        console.log(allUsersArr)
        return (
            <div className="App">
                <h1>Dashboard</h1>
                {!sendingForm && this.renderDashboard()}
                {sendingForm && <SentNotification />}
            </div>
        );
    }
}

export default Messages;