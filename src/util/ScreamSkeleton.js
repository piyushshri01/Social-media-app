import React, { Fragment } from 'react';
import NoImg from '../images/icon.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

// styles 
import styles from '../util/theme';

const ScreamSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.error} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
            </CardContent>
        </Card>
    ))
    return (
        <Fragment>
            {content}
        </Fragment>
    )
} 

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeleton);