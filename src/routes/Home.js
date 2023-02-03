import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';

function Home() {
  const [posts, setPosts] = useState([]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  const keywordHandler = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onSearch = () => {
    //검색
    const getValue = searchKeyword.toLowerCase();
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
        setPosts(res.clubs);
      });
  }, []);
  console.log(posts);

  return (
    <div>
      <h1>게시판</h1>
      <hr />

      <input
        type="text"
        value={searchKeyword}
        placeholder="검색어를 입력하세요"
        onChange={keywordHandler}
      />
      <input type="button" value="검색" onClick={onSearch} />

      <table>
        <thead>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
        </thead>
        <tbody>
          {posts.map((post) => (
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
