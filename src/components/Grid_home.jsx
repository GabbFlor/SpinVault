import ImgGrid1 from '../assets/grid1.png'
import ImgGrid2 from '../assets/grid2.png'
import ImgGrid3 from '../assets/grid3.png'
import ImgGrid4 from '../assets/grid4.png'
import ImgGrid5 from '../assets/grid5.png'
import ImgGrid6 from '../assets/grid6.png'

const Grid_home = () => {
    return (
        <section className="container-grid">
            <div className="item-grid">
                <img src={ImgGrid1} alt="img1" />
                <a href="#">Clique aqui!</a>
            </div>

            <div className="item-grid">
                <img src={ImgGrid2} alt="img2" />
                <a href="#">Clique aqui!</a>
            </div>

            <div className="item-grid">
                <img src={ImgGrid3} alt="img3" />
                <a href="#">Clique aqui!</a>
            </div>

            <div className="item-grid">
                <img src={ImgGrid4} alt="img4" />
                <a href="#">Clique aqui!</a>
            </div>

            <div className="item-grid">
                <img src={ImgGrid5} alt="img5" />
                <a href="#">Clique aqui!</a>
            </div>

            <div className="item-grid">
                <img src={ImgGrid6} alt="img6" />
                <a href="#">Clique aqui!</a>
            </div>
        </section>
    )
}

export default Grid_home;