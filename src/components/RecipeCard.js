import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RecipeCard = (props) => {
  const classes = useStyles();

  return (
    <Card style={{ height: '420px' }} className={classes.root}>
      <CardHeader
        // avatar={
        //   <Avatar style={{ width: '60px', backgroundColor: '#1b5166', borderRadius: '5px' }} aria-label="recipe" className={classes.avatar}>
        //     {props.label}
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={`Price - ${props.price}`}
      />
      <CardMedia
        className={classes.media}
        image={props.img}
        title={props.img}
      />
      <CardActions style={{ bottom: '250px' }}>
        {props.label && <IconButton aria-label="add to favorites">
          <Chip
            label={props.label}
            color="primary"
            variant="outlined"
          />
        </IconButton>}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon style={{fill: "red" }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon style={{fill: "#47aeed" }}/>
        </IconButton>
        {!window.location.href.includes('/payment') && <Button type="submit" variant="contained" color="primary">
          Buy
        </Button>}
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
