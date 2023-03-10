import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewClub() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [url, setUrl] = useState('');

  const navigate = useNavigate();

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

  const postSubmitHandler = (e) => {
    e.preventDefault();

    const request_data = { title: title, contents: contents, url: url };

    fetch('/clubs/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(request_data),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          const userId = res.id;
          navigate(`/clubs/${userId}`);
        });
      } else {
        alert('새로운 그룹 생성에 실패했습니다');
      }
    });

    resetInput();
  };

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

      <input type="button" value="등록" onClick={postSubmitHandler} />
    </form>
  );
}

export default NewClub;
