import { Card } from "../../../../utils/ui";

const AboutUs = () => {
  return (
    <div>
      <div
        className="container-fluid"
        style={{
          background:
            'linear-gradient(to top, #ffffff, transparent), url("https://images.pexels.com/photos/4150118/pexels-photo-4150118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        }}
      >
        <Card
          style={{
            marginTop: "120px",
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate asperiores, enim aliquam dolor suscipit, delectus
                esse praesentium voluptatem minus odio maiores veniam? Molestiae
                at eveniet quidem sapiente, praesentium quo iusto?
              </p>
            </div>
            <div className="col-12 col-md-6">
                <img src="" alt="imagen nosotros" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
