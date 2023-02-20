import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

function ClubDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const deleteClub = () => {
    fetch(`/clubs/${id}`, {
      method: 'DELETE',
    });
    //   .then((res) => {
    //     res.text();
    //   })
    //   .then((res) => {
    //     if (res === 'ok') {
    //       alert('삭제 완료');
    //       history('/clubs');
    //     } else {
    //       alert('삭제 실패');
    //     }
    //   });
    navigate('/clubs');
  };

  const backToClubs = () => {
    navigate('/clubs');
  };

  const postComment = () => {};

  useEffect(() => {
    fetch(`/clubs/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setDetail(res);
      });
  }, []);
  console.log(detail);

  return (
    <div>
      <p>{detail.title}</p>
      <span>작성자</span>
      <span>{detail.createdDate}</span>
      <p>{detail.contents}</p>
      <div>
        <ReactPlayer
          className="player"
          url={detail.url}
          width="700px"
          height="700px"
          playing={false}
          controls
        />
      </div>

      <Link
        to={`/clubs/update/${id}`}
        state={{
          id: detail.id,
          title: detail.title,
          contents: detail.contents,
          url: detail.url,
        }}
      >
        <button>수정</button>
      </Link>
      <button onClick={deleteClub}>삭제</button>
      <button onClick={backToClubs}>목록</button>

      <div>
        <p>Comments</p>
        <input
          type="text"
          value={comment}
          placeholder="댓글을 입력하세요"
        ></input>

        <button onClick={postComment}>등록</button>
      </div>
    </div>
  );
}

export default ClubDetail;
