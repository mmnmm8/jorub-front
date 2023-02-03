import { Link } from 'react-router-dom';

function Board({ id, title, date }) {
  return (
    <tr>
      <td>
        <Link to={`/clubs/${id}`}>{title}</Link>
      </td>
      <td>작성자</td>
      <td>{date}</td>
    </tr>
  );
}

export default Board;
