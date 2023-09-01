import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Article = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articles, setArticles] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");

  console.log("token-->", token);
  console.log("tokenType-->", tokenType);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const articleResponse = await axios.get(
      `http://localhost:5050/getArticles/${userId}`
    );
    console.log("articleResponse--->", articleResponse);
    setArticles(articleResponse.data);
  };

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5050/createArtilcle", {
      title: title,
      content: content,
      userId: userId,
    });
    console.log("response:", response);
    setOpen(false);
    getArticles();
  };
  console.log("articles-->", articles);
  return (
    <div className="article">
      <aside>
        <h1
          style={{
            borderBottom: "2px solid white",
            padding: "5px 0",
            margin: "20px 0",
          }}
        >
          Article page
        </h1>
        <div style={{ width: "95vw" }}>
          <button onClick={() => setOpen(true)}>Create Article</button>
          <button onClick={() => navigate(-1)}>Logout</button>
        </div>
      </aside>
      <section>
        {articles.map((item, index) => (
          <div className="each_articles" key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </section>
      {open && (
        <div className="create_article">
          <div className="createArticleMain">
            <form onSubmit={handleSubmitArticle}>
              <section>
                <label htmlFor="title">Title:</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </section>
              <section>
                <label htmlFor="content">Content:</label>
                <textarea
                  id="content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </section>
              <button>Submit</button>
              <div className="close" onClick={() => setOpen(false)}>
                ❌
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
