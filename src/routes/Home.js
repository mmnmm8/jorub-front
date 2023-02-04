import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';

function Home() {
  const [posts, setPosts] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const navigate = useNavigate();

  const keywordHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearch = () => {
    setFilteredPosts(
      posts.filter((post) => {
        return post.title.toUpperCase().includes(searchInput.toUpperCase());
      })
    );
    setSearching(true);
    setSearchInput('');
  };

  const createClub = () => {
    navigate('/clubs/new');
  };

  useEffect(() => {
    fetch('http://localhost:8080/clubs', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
      });
  }, []);

  console.log(posts);

  return (
    <div>
      <h1>게시판</h1>
      <hr />

      <input
        type="text"
        value={searchInput}
        placeholder="검색어를 입력하세요"
        onChange={keywordHandler}
      />
      <input type="button" value="검색" onClick={onSearch} />

      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {searching
            ? filteredPosts &&
              filteredPosts.map((post) => (
                <Board
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  date={post.createdDate}
                />
              ))
            : posts &&
              posts.map((post) => (
                <Board
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  date={post.createdDate}
                />
              ))}
        </tbody>
      </table>

      <button onClick={createClub}>그룹 생성</button>
    </div>
  );
}

export default Home;
