import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoImg from '../images/icon.png';

// MUI stuff
import { Paper } from '@material-ui/core';

// Icons
import { LocationOn } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import { CalendarToday } from '@material-ui/icons';

// styles
import styles from '../util/theme';
const style = {
    ...styles,
    handle: {
        height: 20,
        backgroundColor: styles.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    }
}


const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className={classes.handle}/>
                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <hr/>
                    <LocationOn color="primary"/> <span>Location</span>
                    <hr/>
                    <LinkIcon color="primary"/> https://website.com
                    <hr/>
                    <CalendarToday color="primary"/> Joined date
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(style)(ProfileSkeleton);
