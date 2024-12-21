import './home.css';
import { useNavigate} from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate()
    function redirectcreate(){
        navigate('/create-card');
    }
    return (
        <div id="home-container">
        <div id="home-div">
            <div id='home-main'>
                <div id='home-banner'>
                    <div id='home-banner-main' >
                        <p>Inspire Your Clients <br /> Digitally</p>
                    </div>
                    <div id='home-banner-submain'>
                        <p>E-DigiCard is a Digital Business Card that is smart, elegant & affordable.</p>
                        <button onClick={redirectcreate} aria-label='create-card-button' >Create Your Card</button>
                    </div>
                </div>
                <div id='about-section' >
                    <div id='about-header-text' > <p>A New Era <br /> Digital Business Card </p> </div>
                        
                        <div id='about-text'> <p>e-digicard.com brings you a new age digital visiting card, that is smart elegant and affordable. No now more worries of carrying paper visiting card. Share this digital business card with unlimited persons anywhere anytime on just a single click.</p>
                        </div>
                        <div id='about-btns-home'>
                            <button aria-label='contact-button'> Contact - Us  </button>
                        </div>
                </div>
                <div id='how-it-workd-section'>
                    <div id='how-it-works-header'>
                        <p>How it works</p>
                    </div>
                    <div id='how-it-works-contents'>
                        <div>
                            <p id='header-text-div' >Create Your Card</p>
                            <p id='sub-text-div' > Design your digital visiting card in 2 minutes </p>
                        </div>
                        <div>
                            <p id='header-text-div' >Save to your Device</p>
                            <p id='sub-text-div' > Digital Visiting Card is accessible anytime from anywhere </p>
                        </div>
                        <div>
                            <p id='header-text-div' > Share with friends </p>
                            <p id='sub-text-div' > Share your card through a variety of channels </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}