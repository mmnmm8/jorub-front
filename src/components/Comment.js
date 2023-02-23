import { useState } from 'react';

function Comment({ clubId, userId, commentId, userName, updatedAt, contents }) {
  const [updatedComment, setUpdatedComment] = useState('');
  const [updateStatus, setUpdateStatus] = useState(false);

  const updateCommentHandler = (e) => {
    setUpdatedComment(e.target.value);
  };

  const request_data = {
    clubId: clubId,
    userId: userId,
    contents: updatedComment,
  };

  const updateComment = () => {
    //페이지 이동 없이 댓글 수정

    setUpdateStatus(true);

    fetch(`/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(request_data),
    })
      //      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          res.json().then((res) => {
            // const userId = res.id;
            // navigate(`/clubs/${userId}`);
          });
        } else {
          alert('댓글 수정에 실패했습니다');
        }
      });

    // resetInput();
  };

  const deleteComment = () => {
    const deleteClub = () => {
      fetch(`/comments/${commentId}`, {
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
    };
  };

  return (
    <div>
      {updateStatus ? (
        <div>
          <input
            type="text"
            value={updatedComment}
            onChange={updateCommentHandler}
          ></input>
          <button onClick={updateComment}>수정</button>
          {setUpdateStatus(false)}
        </div>
      ) : (
        <div>
          <p>{userName}</p>
          <p>{updatedAt}</p>
          <div>{contents}</div>
          <button onClick={updateComment}>수정</button>
          <button onClick={deleteComment}>삭제</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
