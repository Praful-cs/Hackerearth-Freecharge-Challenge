import React from 'react';
import RecipeCard from './RecipeCard.js';
import {
  Grid,
} from '@material-ui/core/';
import axios from 'axios';

const Spinner = () => {
  return (
    <>
      <div style={{
        marginTop: '30%',
        marginLeft: '50%',
      }} className="spinner-border dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

class Recipes extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      recipies: [],
    }
  }

  componentDidMount() {
    axios.get('http://starlord.hackerearth.com/recipe')
    .then(res => {
      this.setState({ recipies: res.data, loading: false });
    }).catch(err => {
      console.log(err);
    })
  }

  goToPayment = (title, description, img, price, label) => {
    this.props.history.push(`/payment?title=${title}&&description=${description}&&img=${img}&&price=${price}&&label=${label}`);
  }

  render() {    
    return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Recipes</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" rel="noopener noreferrer" href="https://github.com/Praful-cs" target="_blank" >Github</a>
              </li>
            </ul>
          </div>
        </nav>
        <div style={{ padding: '5%' }}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
            {
              this.state.recipies && this.state.recipies.length ?
              this.state.recipies.map((item, id) =>
                <Grid onClick={() => this.goToPayment(item.name, item.description, item.image, item.price, item.label)} style={{ padding: '20px' }} key={id} item xs={12} sm={6} md={3}>
                  <RecipeCard
                    title={item.name}
                    description={item.description}
                    img={item.image}
                    price={item.price}
                    label={item.label}
                  />
                </Grid> 
              ) : null
            }
          </Grid>
        </div>
        <footer className="page-footer bottom font-small bg-dark fixed-bottom">
          <div className="footer-copyright text-center py-3">© 2020 Copyright : 
            <a rel="noopener noreferrer" href="/"> Praful Nikam</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Recipes;