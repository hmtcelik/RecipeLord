import { useEffect } from "react";
import { Container, Row } from "reactstrap";

const Twit = () => {
  var Twit = require('twit'); //twitter api

  var T = new Twit({
    consumer_key:         'xxx',
    consumer_secret:      'xxx',
    access_token:         'xxx',
    access_token_secret:  'xxx',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

  useEffect(()=>{
    T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
      console.log(data)
    })
  },[])
  
  return (  
    <>
      <Container>
        <Row>
          <p>test</p>
        </Row>
      </Container>
    </>
  );
}
 
export default Twit;