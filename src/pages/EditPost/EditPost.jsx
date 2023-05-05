import style from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFethDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

function EditPost() {
  const { id } = useParams();

  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { upadateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A Imagem precisa ser uma URL válida.");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body || !tags) {
      setFormError("Preencha todos os campos.");
    }
    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    upadateDocument(id, data);

    navigate("/dashbord");
  };

  return (
    <div className={style.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Titulo: </span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense num bom titulo..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem: </span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa o seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={style.preview_title}>Preview da imagem atual:</p>
            <img className={style.image_preview} src={post.image} alt={post.title}/>
            <label>
              <span>Conteudo: </span>
              <textarea
                name="body"
                required
                placeholder="Insira o coteudo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por virgula..."
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Salvar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default EditPost;
