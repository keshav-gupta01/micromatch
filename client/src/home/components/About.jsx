import '../home.css';

function About() {
  return (
    <>
      <div style={{marginTop:'15rem',width:'100%',height:'10px'}} className="about-scroll"></div>

      <div className="container about">
        <div className="row">
          <div className="col-md-6 text-center">
            <img alt="about" src={`/img/img1.png`} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2 className="main-title about-h2">ABOUT</h2>
            <p className="main-p">
            MicroMatch is an influencer marketing platform that connects businesses with nano- and micro-influencers, prioritizing multiple small influencers per campaign for higher engagement. It enables geo-targeted influencer selection to create a stronger psychological impact on the target audience.


            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
