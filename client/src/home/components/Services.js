import Card from "./Card";
function Services() {
  return (
    <div className="container services">
        <h2 className="main-title text-center">FEATURES</h2>
        <div className="card-cover">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4 mb-2">
                    <Card title="Targeted Reach" img="card1.png" text="Connect with influencers who speak directly to your target audience.  " />
                    </div>
                    <div className="col-md-4 mb-2">
                    <Card title="Measurable Results" img="card2.png" text="Track campaign performance with detailed analytics and insights." />
                    </div>
                    <div className="col-md-4 mb-2">
                    <Card title="Local Impact" img="card3.png" text="Build authentic connections within your local community.               " />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
export default Services;
