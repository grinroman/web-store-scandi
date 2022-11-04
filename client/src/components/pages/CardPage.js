import React from 'react';
import Container from '../templates/Container/Container';
import { Navigate } from 'react-router-dom';
import { callRedirectToCard } from '../../actions';
import { connect } from 'react-redux';
class CardPage extends React.PureComponent {
   componentDidMount() {
      console.log('card page mounted!');
   }

   render() {
      const { redirectToPLP } = this.props;
      return (
         <Container>
            {redirectToPLP && <Navigate to="/" replace={false} />}
            <div>kek!</div>
         </Container>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      redirectToPLP: state.redirectToPLP,
   };
};
export default connect(mapStateToProps)(CardPage);
