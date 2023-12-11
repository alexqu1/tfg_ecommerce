import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeWork from '@mui/icons-material/HomeWork';
import Phone from '@mui/icons-material/Phone';
import Email from '@mui/icons-material/Email';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>House<span>State</span></h3>
        <p className="footer-links">
          <a href="#" className="link-1">Inicio</a>
          <a href="#">Ultimos Anuncios</a>
          <a href="#">Contacta </a>
          <a href="#">Politica Privacidad</a>
         
        </p>
    
      </div>

      <div className="footer-center">
        <div>
          <p>
            <IconButton color="inherit" fontSize="small"> <HomeWork/> </IconButton>
          </p>
          <p><span>Calle de Diego de León, 51, 28006 Madrid</span></p>
        </div>
        <div>
          <p>
            <IconButton color="inherit" fontSize="small"> <Phone/> </IconButton>
          </p>
          <p>600 300 555</p>
        </div>
        <div>
          <p>
            <IconButton color="inherit" fontSize="small"> <Email/> </IconButton>
          </p>
          <p><a href="mailto:support@company.com">Miemail@company.com</a></p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <p>NUESTRAS REDES SOCIALES</p>
          <p className='Piconos'>
            <a href="#"> <IconButton color="inherit" fontSize="large"> <Facebook />  </IconButton></a>
            <a href="#"><IconButton color="inherit" fontSize="large"> <Twitter />  </IconButton></a>
            <a href="#"><IconButton color="inherit" fontSize="large"> <LinkedIn />  </IconButton></a>
            <a href="#"><IconButton color="inherit" fontSize="large"> <Instagram />  </IconButton></a>      
          </p>
        </p>
       
      </div>
    </footer>
  );
}
