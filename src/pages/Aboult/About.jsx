import styles from "./About.module.css";
import { Link } from "react-router-dom";
const Aboult = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Esse prrojeto é uma aplicação web que utiliza o React no front-end e o
        Firebase no back-end. Combinando o React e o Firebase, sua aplicação
        pode fornecer uma experiência de usuário envolvente e personalizada, com
        recursos de back-end robustos e escaláveis, permitindo que você se
        concentre em construir um aplicativo incrível sem se preocupar com a
        complexidade de gerenciar sua infraestrutura de back-end.
      </p>
      <Link to="/posts/create">
        <button className="btn">Criar Post</button>
      </Link>
    </div>
  );
};

export default Aboult;
