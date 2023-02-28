import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
}
from 'mdb-react-ui-kit';
import './SignStyle.css';

function App() {
  return (
    <div className='body'>
            <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

<MDBRow>

  <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
      The best offer <br />
      <span style={{color: 'hsl(218, 81%, 75%)'}}>for you</span>
    </h1>

    <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
      TEXTO DE APRESENTACAO DO PRODUTO......
    </p>

  </MDBCol>

  <MDBCol md='6' className='position-relative'>

    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

    <MDBCard className='my-5 bg-glass'>
      <MDBCardBody className='p-5'>

        <MDBRow>
          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
          </MDBCol>

          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'/>
          </MDBCol>
        </MDBRow>

        <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'/>
        <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'/>

        
        <MDBBtn className='w-100 mb-4' size='md'>Sign Up</MDBBtn>

        
      </MDBCardBody>
    </MDBCard>

  </MDBCol>

</MDBRow>

</MDBContainer>

    </div>
  );
}

export default App;