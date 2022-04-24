
import "./Footer.css";

function Footer(): JSX.Element {

    const year = new Date().getFullYear()

    console.log("year - " , year);
    
    

    return (
        <div className="Footer">
			<h5> {year} &copy; Omri Ben Shalom. </h5>
        </div>
    );
}

export default Footer;
