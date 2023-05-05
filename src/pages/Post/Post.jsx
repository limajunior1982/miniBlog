import style from "./Post.module.css";

//hooks

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFethDocument";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={style.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <h2>{post.subTitle}</h2>
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={style.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
