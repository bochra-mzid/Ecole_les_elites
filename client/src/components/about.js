import img1 from "../assets/img/e4.jpg"
export default function About (props){
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={img1} className="img-responsive" alt=""  style={{ marginTop:"5%"}}/>{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2> "LES ELITES" مدرسة</h2>
              <p>{props.data ? props.data.paragraph : "loading..."}</p>
              <h3>  أسباب وجيهة لاختيارنا    </h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};