import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateClub() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [url, setUrl] = useState('');

  const location = useLocation(); //페이지 이동하면서 값 전달하고 싶을 때 사용
  let navigate = useNavigate(); // 다른 component 로 이동할 때 사용

  const id = location.state.id; // 게시글 수정 이후 돌아갈 게시글의 id
  const old_title = location.state.title;
  const old_contents = location.state.contents;
  const old_url = location.state.url;

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentsHandler = (e) => {
    setContents(e.target.value);
  };

  const urlHandler = (e) => {
    setUrl(e.target.value);
  };

  const resetInput = () => {
    setTitle('');
    setContents('');
    setUrl('');
    // document.getElementById('input_title').value = '';
    // document.getElementById('textarea_content').value = '';
  };

  const postUpdateHandler = (e) => {
    e.preventDefault();
    const request_data = { title: title, contents: contents, url: url };
    fetch(`http://localhost:8080/clubs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(request_data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          const userId = res.id;
          navigate(`/clubs/${userId}`);
        } else {
          alert('그룹 수정에 실패했습니다');
        }
      });

    resetInput();
  };

  // 이전 내용
  useEffect(() => {
    setTitle(old_title);
    setContents(old_contents);
    setUrl(old_url);
  }, []);

  return (
    <form>
      <input
        type="text"
        value={title}
        onChange={titleHandler}
        placeholder="제목을 입력하세요"
        required
      />

      <input
        type="text"
        value={contents}
        onChange={contentsHandler}
        placeholder="내용을 입력하세요"
        required
      />

      <input
        type="text"
        value={url}
        onChange={urlHandler}
        placeholder="유튜브 영상 url을 입력하세요"
        required
      />

      <input type="button" value="수정" onClick={postUpdateHandler} />
    </form>
  );
}

export default UpdateClub;
